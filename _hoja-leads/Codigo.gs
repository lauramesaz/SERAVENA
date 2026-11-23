/**
 * Hoja "Leads · formularios Seravena".
 * Cada vez que alguien llena un test de la web (hoy: /rodilla) aparece una fila aquí
 * y le llega un correo al dueño de esta hoja.
 *
 * Se instala una sola vez: script.new → pegar → ejecutar "preparar" → Implementar como Aplicación web
 * (Ejecutar como: Yo · Acceso: Cualquier usuario) → la URL /exec va en rodilla.html (data-hoja).
 */

const PESTANA = 'Leads';
const AVISAR_POR_CORREO = false; // Laura NO quiere correos: los leads se ven en la hoja

const COLUMNAS = [
  ['fecha', 'Fecha'], ['puntaje', 'Puntaje'], ['servicio', 'Servicio'], ['nombre', 'Nombre'], ['whatsapp', 'WhatsApp'],
  ['zona', '¿Dónde le duele?'], ['tiempo', '¿Desde cuándo?'], ['cirugia', '¿Le dijeron cirugía?'], ['cuando', '¿Cuándo quiere la valoración?'],
  ['estado', 'Estado (lo llena el equipo)'],
  ['utm_campaign', 'Campaña'], ['utm_content', 'Anuncio'], ['utm_term', 'Conjunto'], ['utm_source', 'Fuente'],
  ['pagina', 'Página'], ['id', 'ID'],
];
const COLORES = { A: '#d9ead3', B: '#fff2cc', C: '#efefef' };
const ETIQUETAS = { A: '🟢 A · quiere cita esta semana', B: '🟡 B · este mes', C: '⚪ C · solo información' };

function libro_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('HOJA_ID');
  if (id) return SpreadsheetApp.openById(id);
  let libro = null;
  try { libro = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (!libro) libro = SpreadsheetApp.create('Leads · formularios Seravena');
  props.setProperty('HOJA_ID', libro.getId());
  return libro;
}

function hoja_() {
  const libro = libro_();
  let h = libro.getSheetByName(PESTANA);
  if (!h) {
    const vacia = libro.getSheets().length === 1 && libro.getSheets()[0].getLastRow() === 0 ? libro.getSheets()[0] : null;
    h = vacia ? vacia.setName(PESTANA) : libro.insertSheet(PESTANA);
  }
  return h;
}

function preparar() {
  const h = hoja_();
  h.getRange(1, 1, 1, COLUMNAS.length).setValues([COLUMNAS.map((c) => c[1])])
    .setFontWeight('bold').setBackground('#4B412D').setFontColor('#ffffff');
  h.setFrozenRows(1);
  h.setColumnWidths(1, COLUMNAS.length, 170);
  const est = COLUMNAS.findIndex((c) => c[0] === 'estado') + 1;
  h.getRange(2, est, 2000, 1).setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(['Le escribimos', 'No contesta', 'Agendó', 'Pagó la valoración', 'No le interesa'], true).build());
  Logger.log('Hoja lista: ' + libro_().getUrl());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.nombre || !d.whatsapp) return ContentService.createTextOutput('falta');
    const h = hoja_();
    if (h.getLastRow() === 0) preparar();
    const colId = COLUMNAS.length;
    if (d.id && h.getLastRow() > 1) {
      const ids = h.getRange(2, colId, h.getLastRow() - 1, 1).getValues().flat();
      if (ids.includes(d.id)) return ContentService.createTextOutput('repetido');
    }
    const num = String(d.whatsapp).replace(/\D/g, '');
    const fila = COLUMNAS.map(([k]) => {
      let v = d[k] || '';
      if (k === 'puntaje') v = ETIQUETAS[v] || v;
      if (k === 'whatsapp') v = '=HYPERLINK("https://wa.me/' + num + '";"+' + num + '")';
      return String(v).slice(0, 300);
    });
    h.appendRow(fila);
    h.getRange(h.getLastRow(), 1, 1, COLUMNAS.length).setBackground(COLORES[d.puntaje] || null);
    if (AVISAR_POR_CORREO && String(d.id || '').indexOf('prueba-') !== 0) {
      const yo = Session.getEffectiveUser().getEmail();
      MailApp.sendEmail(yo, (d.puntaje === 'A' ? '🟢 ' : '') + 'Nuevo lead de ' + (d.servicio || 'la web') + ': ' + d.nombre,
        d.nombre + ' llenó el test de ' + (d.servicio || '') + '.\n\n' +
        '¿Dónde le duele?: ' + (d.zona || '-') + '\n¿Desde cuándo?: ' + (d.tiempo || '-') +
        '\n¿Le dijeron cirugía?: ' + (d.cirugia || '-') + '\n¿Cuándo quiere la valoración?: ' + (d.cuando || '-') +
        '\n\nEscribirle: https://wa.me/' + num + '\nHoja completa: ' + libro_().getUrl());
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Borra las filas de prueba (ID que empieza por "prueba-").
function borrarPruebas() {
  const h = hoja_();
  const n = h.getLastRow();
  if (n < 2) return;
  const ids = h.getRange(2, COLUMNAS.length, n - 1, 1).getValues().flat();
  for (let i = ids.length - 1; i >= 0; i--) if (String(ids[i]).indexOf('prueba-') === 0) h.deleteRow(i + 2);
}
