import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'zobadillas' && password === '123456') {
      navigate('/principal');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>L O G I N</h1>
      <div style={styles.formContainer}>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Iniciar Sesión</button>
        </form>
         </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#fff',
    textShadow: '2px 2px 5px rgba(255, 255, 255, 0.95)',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '500',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '18px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(235, 221, 221, 0.94)',
    transition: 'border 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '150px',
    backgroundColor: '#480808',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(235, 221, 221, 0.94)',
    transition: 'all 0.3s ease',
  },
  linkLabel: {
    display: 'block',
    marginTop: '20px',
    fontSize: '16px',
    color: '#00f',
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'center',
  }
};

export default Login;