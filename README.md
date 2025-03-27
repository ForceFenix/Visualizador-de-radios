# 🗂️ Clasificador de PDFs por Categoría

Este proyecto permite cargar, previsualizar y categorizar archivos PDF de manera visual. Una vez categorizados, los archivos pueden organizarse en carpetas o exportarse.

---

## 📁 Estructura del Proyecto

project-root/ │ ├── frontend/ # Aplicación React │ └── src/components/ # Componentes como FilePreview, FileUploader, etc. │ ├── backend/ # Servidor Node.js │ ├── data/ # Almacén de filtros en JSON │ └── app.js # Lógica del servidor Express │ ├── .env # Ruta base del proyecto (no subir a GitHub) ├── .gitignore # Ignora archivos sensibles y temporales └── README.md # Este archivo

yaml
Mostrar siempre los detalles

Copiar

---

## ⚙️ Configuración

### 1. Archivo `.env`
Crea un archivo `.env` en la raíz con esta variable:

PROJECT_ROOT=/ruta/a/tu/project-root

shell
Mostrar siempre los detalles

Copiar

> ⚠️ No subas el `.env` a GitHub.

### 2. Backend
```bash
cd backend
npm install
node app.js
3. Frontend
bash
Mostrar siempre los detalles

Copiar
cd frontend
npm install
npm start
✅ Buenas Prácticas Aplicadas
No se usan rutas absolutas en código fuente

.env maneja la ubicación del proyecto local

Los filtros se cargan desde un archivo JSON en el backend

Los filtros y archivos no se almacenan en localStorage

Se pueden crear scripts Python para organizar carpetas localmente

🔒 Seguridad
.env y otros datos sensibles están listados en .gitignore

Los logs de consola se limpian al finalizar cada script Python