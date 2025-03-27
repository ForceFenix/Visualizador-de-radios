import React, { useState } from 'react';
import FileUploader from './components/files/FileUploader';
import FilePreview from './components/files/FilePreview';
import KeywordManager from './components/filters/KeywordManager';
import OrganizePanel from './components/organizer/OrganizePanel';

function App() {
  const [tab, setTab] = useState('archivos');

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setTab('archivos')} style={{ marginRight: '10px' }}>📂 Ver Archivos</button>
        <button onClick={() => setTab('filtros')}>⚙️ Filtros</button>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <OrganizePanel />
        </div>
      </div>

      {tab === 'archivos' && (
        <>
          <FileUploader />
          <FilePreview />
        </>
      )}

      {tab === 'filtros' && (
        <KeywordManager />
      )}
    </div>
  );
}

export default App;