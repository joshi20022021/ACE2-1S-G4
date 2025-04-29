// Principal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Principal.css';

const Principal = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="principal-title">Office Workspace</h1>
      <div className="principal-buttons">
        <button className="principal-button button-1">Productividad y bienestar</button>
        <button 
          className="principal-button button-2"
          onClick={() => navigate('/graficas')}
        >
          Metricas en Tiempo Real
        </button>
        <button 
          className="principal-button button-3"
          onClick={() => navigate('/habitaciones')}
        >
          Estado de habitaciones
        </button>
      </div>
    </>
  );
};

export default Principal;
