import React, { useState, useEffect } from 'react';

const PublicPage = () => {
  const [message, setMessage] = useState('Cargando contenido público...');

  useEffect(() => {
    const endpoint = '/api/test/all';

    fetch('http://localhost:8080' + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('Ha ocurrido un error al cargar el contenido público.');
    });
  }, []);

  // Estilos
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#007bff', // Un color vibrante para la página pública
  };

  const messageStyle = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '600px',
    marginTop: '20px',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Bienvenido a la Página Pública</h1>
      <p style={messageStyle}>{message}</p>
    </div>
  );
};

export default PublicPage;
