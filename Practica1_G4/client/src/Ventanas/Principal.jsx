import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Principal = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    // Hacer la petición a la API
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/GetPacientes");
        const data = await response.json();
        setPacientes(data); // Guardamos los nombres en el estado
      } catch (error) {
        console.error("❌ Error al obtener nombres de pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleButtonClick = async (route) => {
    console.log(`Botón ${route} clickeado`);
    switch (route) {
      case "Formulario":
        try {
          const response = await fetch("http://localhost:8080/Acceso_Form"); // URL correcta de tu endpoint
          if (!response.ok) throw new Error("Error en la solicitud");
    
          const Estado_Acceso = await response.json();
          
          //console.log(Estado_Acceso);
  
          if(Estado_Acceso){
            navigate(`/${route}`);
          }else{
            alert("Coloca la llave de acceso")
          }
  
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }  
        break;
      default:
        navigate(`/${route}`);
        break;
    }
  };
  

  const handleSelectChange = (event) => {
    let nombrePaciente = event.target.value;
    setSelectedOption(event.target.value);

    try {
       fetch("http://localhost:8080/api/seleccionar-paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombrePaciente }),
      });
  
      console.log("Paciente seleccionado enviado al servidor:", nombrePaciente);
    } catch (error) {
      console.error("❌ Error al seleccionar paciente:", error);
    }

  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1000); // Tiempo reducido para el logout
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {loading ? (
        <div className="position-fixed top-0 start-0 w-100 vh-100 bg-dark d-flex flex-column align-items-center justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light mt-3">Cerrando sesión...</p>
        </div>
      ) : (
        <>
          <h1 className="text-light mb-5 display-4 animate__animated animate__fadeIn">M E D I - T R A C K</h1>
          <div className="d-flex justify-content-center gap-5 mb-4 flex-wrap animate__animated animate__fadeIn">
            <button style={styles.button} onClick={() => handleButtonClick('ficha')}>
              Ficha
            </button>
            <button style={styles.button} onClick={() => handleButtonClick('Signos')}>
              Signos Vitales
            </button>
            <button style={styles.button} onClick={() => handleButtonClick('Formulario')}>
              Formulario de Registro
            </button>
          </div>
          
          <div className="mb-4 animate__animated animate__fadeIn">
            <label className="form-label text-light">Pacientes Registrados</label>
            <select className="form-select" value={selectedOption} onChange={handleSelectChange}>
              <option value="">-- Pacientes --</option>
              {pacientes.map((nombre, index) => (
                <option key={index} value={nombre}>{nombre}</option>
              ))}
            </select>
          </div>

          <button style={styles.logoutButton} className="animate__animated animate__fadeIn" onClick={handleLogout}>Cerrar Sesión</button>
        </>
      )}
    </div>
  );
};

const styles = {
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

export default Principal;