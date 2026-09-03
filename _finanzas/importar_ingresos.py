#!/usr/bin/env python3
"""
Importa el Excel de ingresos de un mes al panel Finanzas de Seravena.
Uso:  python3 _finanzas/importar_ingresos.py <archivo.xlsx> <AAAA-MM>
Lee la hoja de detalle (columnas: Nombre, Concepto, Método de pago, Valor, ..., Fecha estimada de ingreso,
..., ¿Cuenta en la base?, Observación), guarda el mes en _finanzas/datos.json y regenera equipo/finanzas-datos.js.
Los gastos (egresos) del mes se agregan aparte en datos.json: "egresos":[{"nombre","valor","tipo":"fijo|variable"}].
"""
import sys, json, re, datetime, pathlib, openpyxl
RAIZ = pathlib.Path(__file__).resolve().parent.parent
MASTER = RAIZ/'_finanzas'/'datos.json'
SALIDA = RAIZ/'equipo'/'finanzas-datos.js'

def cat(c):
    c=c.lower()
    if re.search(r'prote[ií]na|medias|vegann|producto|crema|suplemento',c): return 'Medias y productos'
    if ('abono' in c and 'tratamiento' in c) or re.search(r'abono #\d',c) or 'up sell' in c or c.startswith('tratamiento'):
        if 'lipedema' in c or 'linfedema' in c or 'drenaje' in c or 'masaje' in c: return 'Tratamientos de lipedema'
        if 'obesidad' in c or 'peso' in c: return 'Tratamientos de obesidad'
        if re.search(r'venas|venosa|vascular|endol|escleroterapia|ara[ñn]as|l[áa]ser',c): return 'Tratamientos de venas'
        return 'Otros tratamientos'
    if re.search(r'cita|consulta|valoraci|restante',c): return 'Citas de valoración'
    return 'Otros'

def tipo(c):
    k=cat(c)
    return {'Citas de valoración':'cita','Medias y productos':'producto'}.get(k, 'tratamiento' if k.startswith('Trat') or k=='Otros tratamientos' else 'otro')

def metodo(m):
    m=(m or '').lower()
    if 'efectivo' in m: return 'Efectivo'
    if 'bold' in m or 'dat' in m: return 'Datáfono Bold'
    if 'davivienda' in m: return 'Davivienda'
    if 'nequi' in m: return 'Nequi'
    if 'bancolombia' in m or 'transfer' in m: return 'Transferencia Bancolombia'
    return m.title() or 'Sin dato'

def main(xlsx, mes):
    wb=openpyxl.load_workbook(xlsx, data_only=True); ws=wb.worksheets[0]
    filas=list(ws.iter_rows(values_only=True))
    # encontrar fila de encabezados
    hi=next(i for i,r in enumerate(filas) if r and r[0]=='Nombre')
    h=[str(x).strip() if x else '' for x in filas[hi]]
    ix=lambda pat: next(i for i,x in enumerate(h) if re.search(pat,x,re.I))
    iN,iC,iM,iV,iF,iOk=ix('^nombre'),ix('^concepto'),ix('todo de pago'),ix('^valor'),ix('fecha estimada'),ix('cuenta')
    try: iO=ix('observaci')
    except StopIteration: iO=None
    y,m=map(int,mes.split('-'))
    movs=[]
    for r in filas[hi+1:]:
        if not r or not r[iN]: continue
        f=r[iF]
        if not isinstance(f,datetime.datetime) or (f.year,f.month)!=(y,m): continue
        if str(r[iOk]).strip().lower()!='sí': continue
        obs=(r[iO] or '') if iO is not None else ''
        mv={'n':str(r[iN]).strip(),'c':str(r[iC]).strip(),'v':int(r[iV] or 0),'m':metodo(r[iM]),'f':f.strftime('%Y-%m-%d'),'t':tipo(str(r[iC])),'cat':cat(str(r[iC]))}
        if re.search(r'posible duplicado|revisar',obs,re.I): mv['dudoso']=re.sub(r'\s+',' ',obs)[:140]
        if re.search(r'pendiente|se le deb|debe |deben|devolver',obs,re.I): mv['saldo']=re.sub(r'\s+',' ',obs)[:140]
        if 'cortes' in mv['c'].lower(): mv['cortesia']=True
        movs.append(mv)
    data=json.loads(MASTER.read_text()) if MASTER.exists() else {'demo':False,'meses':{}}
    mesd=data['meses'].get(mes,{})
    mesd['movimientos']=movs
    mesd.setdefault('egresos',None); mesd.setdefault('insights',[])
    mesd['fuente']=pathlib.Path(xlsx).name
    data['meses'][mes]=mesd
    MASTER.write_text(json.dumps(data,ensure_ascii=False,indent=1))
    generar(data)
    print(f'{mes}: {len(movs)} movimientos, total {sum(x["v"] for x in movs):,}'.replace(',','.'))

def generar(data):
    SALIDA.write_text('/* Generado por _finanzas/importar_ingresos.py — NO editar a mano. Contiene nombres de pacientes: no publicar. */\nwindow.FINANZAS = '+json.dumps(data,ensure_ascii=False)+';\n')
    import subprocess
    node = pathlib.Path.home()/'.local'/'node'/'bin'/'node'
    r = subprocess.run([str(node), str(RAIZ/'_finanzas'/'cifrar.js')], capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())

if __name__=='__main__':
    if len(sys.argv)==2 and sys.argv[1]=='--regenerar': generar(json.loads(MASTER.read_text()))
    else: main(sys.argv[1], sys.argv[2])
