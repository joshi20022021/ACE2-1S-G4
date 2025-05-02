import React, { useState } from 'react';
import './Habitaciones.css';
import { useNavigate } from 'react-router-dom';

const Habitaciones = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState({
    0: "DISPONIBLE",
    1: "DISPONIBLE",
    2: "DISPONIBLE"
  });

  const habitaciones = [
    { nombre: "C O C I N A" },
    { nombre: "S A L A" },
    { nombre: "O F I C I N A" }
  ];

  const cambiarEstado = (index) => {
    setEstados(prev => {
      const nuevosEstados = {...prev};
      nuevosEstados[index] = prev[index] === "DISPONIBLE" ? "OCUPADA" : "DISPONIBLE";
      return nuevosEstados;
    });
  };

  const handleVolver = () => {
    navigate(-1); // Esto llevará al usuario a la página anterior
  };

  return (
    <div className="habitaciones-wrapper">
      <button 
        className="volver-button"
        onClick={handleVolver}
      >
        R E G R E S A R
      </button>
      
      <h1 className="principal-title">E S T A D O - D E - H A B I T A C I O N E S</h1>
      
      <div className="habitaciones-grid">
        {habitaciones.map((habitacion, index) => (
          <div key={index} className="habitacion-card">
            <h2 className="habitacion-title">{habitacion.nombre}</h2>
            <button 
              className={`principal-button habitacion-button ${estados[index] === "OCUPADA" ? "ocupada" : "disponible"}`}
              onClick={() => cambiarEstado(index)}
            >
              {estados[index]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habitaciones;