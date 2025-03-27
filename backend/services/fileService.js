const fs = require('fs');
const path = require('path');

const savePDFMetadata = (data) => {
  const ruta = path.join(__dirname, '..', 'data', 'pdf_metadata.json');
  const json = JSON.stringify(data, null, 2);
  fs.mkdirSync(path.dirname(ruta), { recursive: true });
  fs.writeFileSync(ruta, json, 'utf-8');
};

module.exports = { savePDFMetadata };