import React, { useState, useEffect } from 'react';
import { highlightText } from '../../utils/highlight';
import { extraerParte } from '../../utils/textUtils';
import { categories } from '../../utils/categoryList';

const LOCAL_STORAGE_KEY = 'filterLists';

const FilePreview = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileCategories, setFileCategories] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/api/filters")
      .then(res => res.json())
      .then(data => {
        setFiltros(data);
        console.log("[FilePreview.js] Filtros cargados desde backend:", data);
      })
      .catch(err => console.error("[FilePreview.js] Error al cargar filtros:", err));
  }, []);

  const [resaltado, setResaltado] = useState("");

  const getFiltrosDesdeStorage = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);      if (!stored) return [];
      return JSON.parse(stored).map(({ label, color, keywords }) => ({ label, color, keywords }));
    } catch (err) {      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/files/metadata');
      const result = await response.json();      setData(result);
      setSelectedFile(null);
    } catch (error) {      alert('No se pudieron obtener los archivos procesados.');
    }
  };

  const toggleCategory = (filename, category) => {    setFileCategories(prev => {
      const prevCats = prev[filename] || [];
      const updated = prevCats.includes(category)
        ? prevCats.filter(cat => cat !== category)
        : [...prevCats, category];
      return { ...prev, [filename]: updated };
    });
  };

  const getFileBlockStyle = (filename) => {
    const assignedCats = fileCategories[filename];
    if (!assignedCats || assignedCats.length === 0) return {};
    const color = categories.find(c => c.name === assignedCats[0])?.color || "#eee";
    return { backgroundColor: color, padding: '5px', marginBottom: '5px', cursor: 'pointer', borderRadius: '6px' };
  };

  const [filtros, setFiltros] = useState([]);
  const currentFile = data.find(f => f.filename === selectedFile);
  useEffect(() => {
  console.log("[Diagnóstico] selectedFile:", selectedFile);
  console.log("[Diagnóstico] filtros:", filtros);
  console.log("[Diagnóstico] data:", data);

    if (currentFile && filtros.length > 0) {      const frag = extraerParte(currentFile.extractedText || "");      const resaltadoFinal = highlightText(frag, filtros);      setResaltado(resaltadoFinal);
    } else {      setResaltado("");
    }
  }, [currentFile, filtros]);

  return (
    <div style={{ display: 'flex', height: '600px' }}>
      <div style={{ width: '25%', overflowY: 'auto', borderRight: '1px solid #ccc', padding: '10px' }}>
        <button onClick={fetchData}>Ver Archivos Procesados</button>
        <button onClick={() => { setData([]); localStorage.clear(); setSelectedFile(null); alert("Lista de archivos y localStorage vaciados."); }} style={{ marginLeft: "10px" }}>
          Vaciar Lista
        </button>
        {data.map((file, index) => (
          <div
            key={index}
            style={getFileBlockStyle(file.filename)}
            onClick={() => {              setSelectedFile(file.filename);
            }}
          >
            {file.filename}
          </div>
        ))}
      </div>

      <div style={{ width: '50%', padding: '10px' }}>
        {selectedFile ? (
          <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100%', borderRadius: '8px', background: '#fafafa' }}>
            <strong>{selectedFile}</strong>
            <div
              style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}
              dangerouslySetInnerHTML={{ __html: resaltado }}
            />
          </div>
        ) : (
          <p style={{ color: '#888' }}>Seleccioná un archivo de la izquierda para ver su contenido</p>
        )}
      </div>

      <div style={{ width: '25%', padding: '10px', borderLeft: '1px solid #ccc' }}>
        <h4>Categorías</h4>
        {selectedFile && categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => toggleCategory(selectedFile, cat.name)}
            style={{
              backgroundColor: fileCategories[selectedFile]?.includes(cat.name) ? cat.color : '#eee',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              marginBottom: '8px',
              width: '100%',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
