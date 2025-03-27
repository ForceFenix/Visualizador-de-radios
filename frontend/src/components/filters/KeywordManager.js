import React, { useEffect, useState } from 'react';

const KeywordManager = () => {
  const [filters, setFilters] = useState([]);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#F6C1C1');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    fetch("http://localhost:4000/api/filters")
      .then(res => res.json())
      .then(data => {
        setFilters(data);
        console.log("[KeywordManager.js] Filtros cargados desde backend:", data);
      });
  }, []);

  const handleAdd = () => {
    const nuevoFiltro = {
      id: label.toLowerCase(),
      label,
      color,
      keywords: keywords.split(',').map(k => k.trim().toUpperCase())
    };

    fetch("http://localhost:4000/api/filters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoFiltro)
    })
      .then(res => res.json())
      .then(data => {
        setFilters(data);
        setLabel('');
        setColor('#F6C1C1');
        setKeywords('');
      })
      .catch(err => console.error("[KeywordManager.js] Error al agregar filtro:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/filters/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => setFilters(data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Filtros</h2>
      <div>
        <input placeholder="Nombre" value={label} onChange={e => setLabel(e.target.value)} />
        <input placeholder="Color" type="color" value={color} onChange={e => setColor(e.target.value)} />
        <input placeholder="Palabras (coma separadas)" value={keywords} onChange={e => setKeywords(e.target.value)} />
        <button onClick={handleAdd}>Agregar</button>
      </div>
      <ul>
        {filters.map(f => (
          <li key={f.id} style={{ backgroundColor: f.color, padding: '4px', margin: '4px 0' }}>
            <strong>{f.label}</strong>: {f.keywords.join(', ')}
            <button onClick={() => handleDelete(f.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordManager;