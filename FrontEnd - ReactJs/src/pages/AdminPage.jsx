import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // Redirige al inicio de sesión si no hay token
      return;
    }

    const fetchAdminContent = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/test/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error:', error);
        // Opcionalmente, maneja el error de manera más efectiva aquí
      }
    };

    fetchAdminContent();
  }, [navigate]);

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
    color: '#007bff',
  };

  const messageStyle = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '600px',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Página de Administrador</h1>
      <p style={messageStyle}>{message}</p>
    </div>
  );
};

export default AdminPage;
