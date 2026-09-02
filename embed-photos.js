const fs = require('fs');
const path = require('path');
const dir = __dirname;

const photos = [
  'images/resized/IMG_1154-1.jpg',
  'images/resized/IMG_1156.jpg',
  'images/resized/IMG_1155-1.jpg'
];

let html = fs.readFileSync(path.join(dir, 'source.html'), 'utf8');
const placeholder = '<div class="polaroid">\u{1F4F7}</div>';

photos.forEach(function (rel) {
  const bytes = fs.readFileSync(path.join(dir, rel));
  const b64 = bytes.toString('base64');
  const dataUri = 'data:image/jpeg;base64,' + b64;
  const replacement = '<div class="polaroid"><img src="' + dataUri + '" alt="A photo of us"></div>';
  const idx = html.indexOf(placeholder);
  if (idx === -1) throw new Error('No more placeholder polaroid divs found for ' + rel);
  html = html.slice(0, idx) + replacement + html.slice(idx + placeholder.length);
});

fs.writeFileSync(path.join(dir, 'source.html'), html);
console.log('embedded', photos.length, 'photos');
