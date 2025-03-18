import React from 'react';

const ApartadoU = () => {
  const handleClick = (botonNum) => {
    alert(`Has clickeado el Botón ${botonNum}`);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-light mb-5 display-4 animate__animated animate__fadeIn">B I E N V E N I D O</h1>
      <div className="d-flex justify-content-center gap-5 mb-4 flex-wrap animate__animated animate__fadeIn">
        <button style={styles.button} onClick={() => handleClick(1)}>
          A C T U A L I Z A R  
          D A T O S
        </button>
        <button style={styles.button} onClick={() => handleClick(3)}>
          H I S T O R I A L -    
          M E D I C O
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: '13px 1px',
    fontSize: '28px',
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
    marginTop: '30px',
    padding: '12px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '28px',
    backgroundColor: '#cc0000',
    color: '#fff',
    boxShadow: '0 4px 8px rgb(255, 200, 200)',
    transition: 'all 0.3s ease',
  }
};

export default ApartadoU;