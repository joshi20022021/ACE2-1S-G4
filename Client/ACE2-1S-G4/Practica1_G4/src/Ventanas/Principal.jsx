import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Principal = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = (route) => {
    console.log(`Botón ${route} clickeado`);
    navigate(`/${route}`);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>M E D I - T R A C K</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleButtonClick('ficha')}>
          Ficha
        </button>
        <button style={styles.button} onClick={() => handleButtonClick('Signos')}>
          Signos Vitales
        </button>
        <button style={styles.button} onClick={() => handleButtonClick('Formulario ')}>
          Formulario de Registro
        </button>
      </div>
      
      <div style={styles.selectContainer}>
        <label style={styles.label}>Pacientes Registrados</label>
        <select style={styles.select} value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Pacientes --</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#fff',
    textShadow: '2px 2px 5px rgba(255, 255, 255, 0.95)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '150px',
    marginBottom: '20px',
  },
  button: {
    padding: '13px 10px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '28px',
    backgroundColor: 'rgba(72, 8, 8, 0.94)',
    color: '#fff',
    boxShadow: '0 4px 8px rgb(234, 209, 209)',
    transition: 'all 0.3s ease',
    width: '230px',
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  label: {
    fontSize: '18px',
    color: '#fff',
    marginBottom: '5px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    width: '250px',
  },
};

export default Principal;
