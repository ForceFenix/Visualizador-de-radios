const fs = require('fs');
const path = require('path');

const categoriasPath = path.join(__dirname, '..', 'data', 'archivo_categorias.json');
const pdfsDir = path.join(__dirname, '..', 'uploads');

const copiarArchivo = (origen, destino) => {
  fs.copyFileSync(origen, destino);
};

const moverArchivo = (origen, destino) => {
  fs.renameSync(origen, destino);
};

exports.organizeFiles = (req, res) => {
  const { outputPath } = req.body;

  if (!fs.existsSync(outputPath)) {
    return res.status(400).json({ message: 'Ruta de salida no válida.' });
  }

  if (!fs.existsSync(categoriasPath)) {
    return res.status(400).json({ message: 'No se encontró el archivo de categorías.' });
  }

  const categoriasData = JSON.parse(fs.readFileSync(categoriasPath));
  const archivos = Object.entries(categoriasData);

  archivos.forEach(([nombreArchivo, categorias]) => {
    const rutaOriginal = path.join(pdfsDir, nombreArchivo);

    if (!fs.existsSync(rutaOriginal)) {
      console.warn(`[organizeFiles] No se encontró el archivo: ${nombreArchivo}`);
      return;
    }

    categorias.forEach((categoria, index) => {
      const carpetaCategoria = path.join(outputPath, categoria);
      if (!fs.existsSync(carpetaCategoria)) fs.mkdirSync(carpetaCategoria, { recursive: true });

      const destino = path.join(carpetaCategoria, nombreArchivo);

      if (index === categorias.length - 1) {
        moverArchivo(rutaOriginal, destino); // mover a la última
      } else {
        copiarArchivo(rutaOriginal, destino); // copiar a las demás
      }
    });
  });

  res.json({ message: 'Archivos organizados correctamente por categoría.' });
};