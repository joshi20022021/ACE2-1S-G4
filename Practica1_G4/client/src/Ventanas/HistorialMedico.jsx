import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistorialMedico = () => {
  const navigate = useNavigate();

  const handleClick = (botonNum) => {
    if (botonNum === 1) {
      navigate('/ApartadoU'); // Redirigir a la ruta de ActualizarDatos
    } 
    else if (botonNum === 2) {
      navigate('/HistorialMedico'); // Redirigir a la ruta de HistorialMedico
    } 
    else {
      alert(`Has clickeado el Botón ${botonNum}`);
    }
  };

  

  return (
    <div style={styles.container}>
      {/* Etiqueta "H I S T O R I A L - M E D I C O" */}
      <div style={styles.labelContainer}>
        <h1>H I S T O R I A L - M E D I C O</h1>
      </div>

      {/* Botón en la parte superior izquierda */}
      <button 
        style={styles.logoutButton} 
        onClick={() => handleClick(1)} // Ejemplo de uso de handleClick
      >
        Regresar
      </button>

      {/* Contenedor para el combo box y el botón al lado */}
      <div style={styles.comboBoxContainer}>
        <select style={styles.comboBox}>
          <option value="opcion1">historial1</option>
          <option value="opcion2">historial2</option>
          <option value="opcion3">historial3</option>
        </select>
        <button 
          style={styles.button} 
          onClick={() => handleClick(2)} // Ejemplo de uso de handleClick
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh',
      paddingTop: '20px',
    },
    comboBoxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    comboBox: {
      padding: '10px',
      fontSize: '16px',
      marginRight: '100px',
      borderRadius: '28px',
      border: '1px solid #ccc',
      width: '300px', // Ancho del combo box
    },
    labelContainer: {
      marginBottom: '20px',
      color: 'white', // Cambia el color del texto a blanco
    },
    button: {
      padding: '13px 1px',
      fontSize: '23px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '28px',
      backgroundColor: 'rgba(72, 8, 8, 0.94)',
      color: '#fff',
      boxShadow: '0 4px 8px rgb(234, 209, 209)',
      transition: 'all 0.3s ease',
      width: '230px',
    },
    logoutButton: {
      position: 'absolute',
      top: '10px',
      left: '100px',
      padding: '13px 1px',
      fontSize: '20px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '28px',
      backgroundColor: 'rgba(72, 8, 8, 0.94)',
      color: '#fff',
      boxShadow: '0 4px 8px rgb(234, 209, 209)',
      transition: 'all 0.3s ease',
      width: '230px',
    }
  };

export default HistorialMedico;