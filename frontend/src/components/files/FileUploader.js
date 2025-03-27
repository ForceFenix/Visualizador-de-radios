import React, { useState } from 'react';
import { uploadPDFs } from '../../services/api';

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("No seleccionaste archivos.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('pdfs', selectedFiles[i]);
    }

    try {
      await uploadPDFs(formData);
      alert("Archivos subidos correctamente.");
    } catch (error) {
      alert("Hubo un error al subir los archivos.");
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Subir Archivos PDF</h2>
      <input type="file" multiple accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Subir</button>
    </div>
  );
};

export default FileUploader;