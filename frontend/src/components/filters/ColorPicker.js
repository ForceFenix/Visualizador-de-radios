import React from 'react';

const ColorPicker = ({ color, onChange }) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      title="Seleccionar color pastel"
    />
  );
};

export default ColorPicker;