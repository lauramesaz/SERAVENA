#!/usr/bin/env node
/* Cifra _finanzas/datos.json → equipo/finanzas-datos.enc.json (AES-256-GCM, clave derivada con PBKDF2).
   La clave se lee de _finanzas/.clave (archivo ignorado por git) o del argumento --clave "…".
   Uso: node _finanzas/cifrar.js            (usa .clave)
        node _finanzas/cifrar.js --clave "mi clave nueva"   (y la guarda en .clave) */
const fs=require('fs'), path=require('path'), crypto=require('crypto');
const raiz=path.resolve(__dirname,'..');
const fClave=path.join(__dirname,'.clave');
let clave=null; const i=process.argv.indexOf('--clave');
if(i>-1){ clave=process.argv[i+1]; fs.writeFileSync(fClave,clave,{mode:0o600}); }
else if(fs.existsSync(fClave)) clave=fs.readFileSync(fClave,'utf8').trim();
if(!clave){ console.error('Falta la clave: crea _finanzas/.clave o pasa --clave'); process.exit(1); }
const datos=fs.readFileSync(path.join(raiz,'_finanzas','datos.json'),'utf8');
JSON.parse(datos);
const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12), iter=600000;
const key=crypto.pbkdf2Sync(clave,salt,iter,32,'sha256');
const c=crypto.createCipheriv('aes-256-gcm',key,iv);
const enc=Buffer.concat([c.update(Buffer.from(datos,'utf8')),c.final(),c.getAuthTag()]);
const out={v:1,alg:'AES-256-GCM',kdf:'PBKDF2-SHA256',iter,salt:salt.toString('base64'),iv:iv.toString('base64'),data:enc.toString('base64')};
fs.writeFileSync(path.join(raiz,'equipo','finanzas-datos.enc.json'),JSON.stringify(out));
console.log('cifrado OK →', 'equipo/finanzas-datos.enc.json', (enc.length/1024).toFixed(1)+' KB');
