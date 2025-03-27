import React, { useState } from 'react';

const NewListForm = ({ onAdd }) => {
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#A8D5BA');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    onAdd({ id: label.toLowerCase().replace(/\s+/g, '-'), label: label.trim(), color, keywords: [] });
    setLabel('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la lista"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Crear Lista</button>
    </form>
  );
};

export default NewListForm;