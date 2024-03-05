import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const roles = ['user', 'moderator', 'admin'];

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = { email, username, password, roles: selectedRoles };
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (response.status === 200) {
        alert('Registro exitoso: ' + responseData.message);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Registro</h1>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input
          style={{ padding: '10px', margin: '5px' }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          style={{ padding: '10px', margin: '5px' }}
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          style={{ padding: '10px', margin: '5px' }}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div onClick={() => setShowDropdown(!showDropdown)} style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
          Selecciona tus roles
          {showDropdown && (
            <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ddd', padding: '10px' }}>
              {roles.map(role => (
                <div key={role}>
                  <input
                    type="checkbox"
                    id={role}
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <label htmlFor={role}>{role}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUp;
