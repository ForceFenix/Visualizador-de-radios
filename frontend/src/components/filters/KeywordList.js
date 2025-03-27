import React, { useState } from 'react';
import KeywordItem from './KeywordItem';
import ColorPicker from './ColorPicker';

const KeywordList = ({ list, onUpdate, onDelete }) => {
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const updated = { ...list, keywords: [...list.keywords, newKeyword.trim().toUpperCase()] };
    onUpdate(updated);
    setNewKeyword('');
  };

  const removeKeyword = (keyword) => {
    const updated = { ...list, keywords: list.keywords.filter(k => k !== keyword) };
    onUpdate(updated);
  };

  const updateColor = (color) => {
    const updated = { ...list, color };
    onUpdate(updated);
  };

  return (
    <div style={{ border: `2px solid ${list.color}`, padding: '10px', marginBottom: '10px' }}>
      <h3>{list.label}</h3>
      <ColorPicker color={list.color} onChange={updateColor} />
      <div>
        {list.keywords.map((k, i) => (
          <KeywordItem key={i} keyword={k} onDelete={() => removeKeyword(k)} />
        ))}
      </div>
      <input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        placeholder="Nueva palabra clave"
      />
      <button onClick={addKeyword}>Agregar</button>
      <button onClick={onDelete} style={{ marginLeft: '10px', color: 'red' }}>Eliminar Lista</button>
    </div>
  );
};

export default KeywordList;