import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const styles = {
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
  },
  backButton: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '28px',
    backgroundColor: 'rgba(72, 8, 8, 0.94)',
    color: '#fff',
    boxShadow: '0 4px 8px rgb(234, 209, 209)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
  formContainer: {
    flex: 1,
    marginRight: '20px',
    maxWidth: '600px',
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
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#fff',
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    color: '#fff',
    fontSize: '16px',
    marginBottom: '8px',
    display: 'block',
  },
  formGroup: {
    marginBottom: '20px',
  },
};

const RegistroPacientes = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  // Estado para almacenar los pacientes registrados
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María Gómez' },
    { id: 3, nombre: 'Carlos López' },
  ]);

  // Estado para almacenar las camillas disponibles
  const [camillas, setCamillas] = useState([
    { id: 1, numero: 'Camilla 1' },
    { id: 2, numero: 'Camilla 2' },
    { id: 3, numero: 'Camilla 3' },
  ]);

  // Estado para almacenar el paciente seleccionado
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');

  // Estado para almacenar la camilla seleccionada
  const [camillaSeleccionada, setCamillaSeleccionada] = useState('');

  // Función para manejar el cambio en el combo box de pacientes
  const handlePacienteChange = (event) => {
    setPacienteSeleccionado(event.target.value);
  };

  // Función para manejar el cambio en el combo box de camillas
  const handleCamillaChange = (event) => {
    setCamillaSeleccionada(event.target.value);
  };

  // Función para manejar el clic en el botón "Confirmar registro"
  const handleConfirmarRegistro = () => {
    if (pacienteSeleccionado && camillaSeleccionada) {
      alert(`Paciente: ${pacienteSeleccionado} asignado a ${camillaSeleccionada}`);
    } else {
      alert('Por favor, selecciona un paciente y una camilla.');
    }
  };

  // Función para manejar el clic en el botón "Registrar paciente"
  const handleRegistrarPaciente = () => {
    const nuevoPaciente = prompt('Ingrese el nombre del nuevo paciente:');
    if (nuevoPaciente) {
      const nuevoId = pacientes.length + 1;
      setPacientes([...pacientes, { id: nuevoId, nombre: nuevoPaciente }]);
      alert(`Paciente ${nuevoPaciente} registrado con éxito.`);
    }
  };

  // Función para redirigir a la ruta especificada
  const handleButtonClick = (route) => {
    console.log(`Redirigiendo a ${route}`);
    navigate(`/${route}`); // Usa navigate para redirigir
  };

  return (
    <div style={styles.wrapper}>
      {/* Botón de regreso */}
      <button
        style={styles.backButton}
        onClick={() => handleButtonClick('Principal')} // Redirige a "Principal"
      >
        Regresar
      </button>

      <div style={styles.container}>
        <h1 style={styles.title}>Registro de Pacientes</h1>

        <div style={styles.content}>
          {/* Formulario */}
          <div style={styles.formContainer}>
            {/* Combo box para Pacientes Registrados */}
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="pacientes">
                Pacientes Registrados:
              </label>
              <select
                id="pacientes"
                value={pacienteSeleccionado}
                onChange={handlePacienteChange}
                style={styles.input}
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.nombre}>
                    {paciente.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Combo box para Camillas Disponibles */}
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="camillas">
                Camillas Disponibles:
              </label>
              <select
                id="camillas"
                value={camillaSeleccionada}
                onChange={handleCamillaChange}
                style={styles.input}
              >
                <option value="">Seleccione una camilla</option>
                {camillas.map((camilla) => (
                  <option key={camilla.id} value={camilla.numero}>
                    {camilla.numero}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón para Confirmar Registro */}
            <button style={styles.button} onClick={handleConfirmarRegistro}>
              Confirmar Registro
            </button>

            {/* Botón para Registrar Paciente */}
            <button
              style={styles.button}
              onClick={() => handleButtonClick('RegistroPaciente')} // Redirige a "RegistroPaciente"
            >
              Registrar Paciente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPacientes;