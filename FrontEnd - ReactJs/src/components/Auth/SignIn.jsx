import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const data = { username, password };

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      if (!responseData.accessToken) {
        alert("El usuario no existe");
      } else {
        localStorage.setItem('token', responseData.accessToken);
        localStorage.setItem('roles', JSON.stringify(responseData.roles));
        navigate('/main');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error durante el inicio de sesión.');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSignIn} style={formStyle}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          style={inputStyle}
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          style={inputStyle}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input type="submit" value="Iniciar Sesión" style={buttonStyle} />
      </form>
    </div>
  );
};

export default SignIn;
