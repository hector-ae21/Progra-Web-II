import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to the application</h1>
      <div id="text"></div>
      <button onClick={() => navigate('/signup')} style={buttonStyle}>Registrarse</button>
      <button onClick={() => navigate('/signin')} style={buttonStyle}>Iniciar Sesión</button>
      <button onClick={() => navigate('/public')} style={buttonStyle}>Entrar sin Registrarse</button>
    </div>
  );
};

export default Home;
