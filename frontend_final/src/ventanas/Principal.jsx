import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Principal.css';

const Principal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || "Usuario";

  const handleLogout = () => {
    navigate('/'); // Redirige al login
  };

  return (
    <>
      <h1 className="principal-title">Bienvenido, {user} 👋</h1>
      <div className="principal-buttons">
        <button 
          className="principal-button button-2"
          onClick={() => navigate('/graficas')}
        >
          Productividad y Bienestar
        </button>
        <button 
          className="principal-button button-3"
          onClick={() => navigate('/habitaciones')}
        >
          Estado de habitaciones
        </button>

        {/* Botón de Cerrar sesión */}
        <button 
          className="principal-button button-logout"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </>
  );
};

export default Principal;
