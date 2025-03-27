import React from 'react';

const OrganizePanel = () => {
  const handleOrganize = () => {
    fetch("http://localhost:4000/api/files/organize", {
      method: "POST"
    }).then(() => {
      alert("Archivos organizados en carpetas por categoría.");
    }).catch(() => {
      alert("Error al organizar archivos.");
    });
  };

  return (
    <button onClick={handleOrganize} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '6px' }}>
      Organizar Archivos
    </button>
  );
};

export default OrganizePanel;