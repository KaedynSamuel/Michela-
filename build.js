const fs = require('fs');
const path = require('path');
const dir = __dirname;
const src = fs.readFileSync(path.join(dir, 'source.html'), 'utf8');
const lib = fs.readFileSync(path.join(dir, 'three.min.js'), 'utf8');
const out = src.replace('/* __THREEJS_INLINE__ */', lib);
fs.writeFileSync(path.join(dir, 'index.html'), out);
console.log('built', out.length, 'bytes');
