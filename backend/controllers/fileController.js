const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const { savePDFMetadata } = require('../services/fileService');

const uploadPDFs = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No se subieron archivos.' });
  }

  try {
    const resultados = [];

    for (const file of files) {
      const buffer = fs.readFileSync(file.path);
      const data = await pdf(buffer);

      const metadata = {
        filename: file.originalname,
        size: file.size,
        extractedText: data.text
      };

      resultados.push(metadata);
    }

    savePDFMetadata(resultados);
    res.status(200).json({ message: 'Archivos procesados correctamente.', resultados });
  } catch (error) {
    console.error('Error al procesar archivos:', error);
    res.status(500).json({ message: 'Error interno al procesar los archivos.', error: error.message });
  }
};

const getPDFMetadata = (req, res) => {
  const ruta = path.join(__dirname, '..', 'data', 'pdf_metadata.json');

  try {
    const data = fs.readFileSync(ruta, 'utf-8');
    const json = JSON.parse(data);
    res.status(200).json(json);
  } catch (error) {
    console.error('Error al leer metadatos:', error);
    res.status(500).json({ message: 'No se pudieron obtener los metadatos.' });
  }
};

module.exports = { uploadPDFs, getPDFMetadata };