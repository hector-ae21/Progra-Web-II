import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModeratorPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!token || !roles.includes('MODERATOR')) {
      navigate('/signin');
      return;
    }

    const fetchModeratorContent = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/test/mod', {
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
      }
    };

    fetchModeratorContent();
  }, [navigate]);

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#4a00e0',
  };

  const messageStyle = {
    backgroundColor: '#e0e0e0',
    border: '1px solid #bbbbbb',
    padding: '15px',
    borderRadius: '8px',
    maxWidth: '600px',
    wordWrap: 'break-word',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Página del Moderador</h1>
      <p style={messageStyle}>{message}</p>
    </div>
  );
};

export default ModeratorPage;
