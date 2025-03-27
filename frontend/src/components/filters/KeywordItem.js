import React from 'react';

const KeywordItem = ({ keyword, onDelete }) => {
  return (
    <span style={{ marginRight: '8px', padding: '4px', border: '1px solid #ccc' }}>
      {keyword}
      <button onClick={onDelete} style={{ marginLeft: '5px' }}>x</button>
    </span>
  );
};

export default KeywordItem;