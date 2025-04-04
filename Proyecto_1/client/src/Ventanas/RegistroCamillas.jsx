import React, { useState , useEffect} from 'react';
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
  select: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: '#333', // **Fondo oscuro solo para select**
    color: '#fff', // **Texto blanco**
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

const RegistroCamillas = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  const [pacientes, setPacientes] = useState([]);
  
  let [indicePaciente, setindicePaciente] = useState();
  
  useEffect(() => {
    // Hacer la petición a la API
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://192.168.137.123:8080/GetPacientes");
        const data = await response.json();
        setPacientes(data); // Guardamos los nombres en el estado
      } catch (error) {
        console.error("Error al obtener nombres de pacientes:", error);
      }
    };
  
    fetchPacientes();
  }, []);

  const [camillas, setCamillas] = useState([
    { id: 1, numero: 'Camilla 1' },
    { id: 2, numero: 'Camilla 2' },
    { id: 3, numero: 'Camilla 3' },
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
  const [camillaSeleccionada, setCamillaSeleccionada] = useState('');

  const handlePacienteChange = (event) => {
    const nuevoIndice = event.target.selectedIndex;
    setindicePaciente(nuevoIndice);
    setPacienteSeleccionado(event.target.value);
  };
  

  const handleCamillaChange = (event) => {

    setCamillaSeleccionada(event.target.value);
  };

  const handleConfirmarRegistro = async() => {
    /*if (pacienteSeleccionado && camillaSeleccionada) {
      alert(`Paciente: ${pacienteSeleccionado} asignado a ${camillaSeleccionada}`);
    } else {
      alert('Por favor, selecciona un paciente y una camilla.');
    }*/

      console.log("Paciente: "+indicePaciente);
    if (indicePaciente && camillaSeleccionada) {
      // Extraer el número del ID de camilla (ej. "Camilla 2" → 2)
      const idCamilla = camillaSeleccionada.split(' ')[1];
  
      try {
        const response = await fetch("http://192.168.137.123:8080/AsignarCamilla", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            idPaciente: indicePaciente,
            idCamilla: idCamilla
          }),
        });
  
        const resultado = await response.text();
  
        if (response.ok) {
          alert(`${resultado}`);
        } else {
          alert(`Error: ${resultado}`);
        }
  
      } catch (error) {
        console.error("Error al asignar camilla:", error);
        alert("Error al conectar con el servidor");
      }
    } else {
      alert('⚠ Por favor, selecciona un paciente y una camilla.');
    }
  };

  const handleButtonClick = (route) => {
    navigate(`/${route}`);
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.backButton} onClick={() => handleButtonClick('Principal')}>
        Regresar
      </button>

      <div style={styles.container}>
        <h1 style={styles.title}>Registro de Camillas</h1>

        <div style={styles.content}>
          <div style={styles.formContainer}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="pacientes">
                Pacientes Registrados:
              </label>
              <select id="pacientes" value={pacienteSeleccionado} onChange={handlePacienteChange} style={styles.select}>
                <option value="">Seleccione un paciente</option>
                {pacientes.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="camillas">
                Camillas Disponibles:
              </label>
              <select id="camillas" value={camillaSeleccionada} onChange={handleCamillaChange} style={styles.select}>
                <option value="">Seleccione una camilla</option>
                {camillas.map((camilla) => (
                  <option key={camilla.id} value={camilla.numero}>
                    {camilla.numero}
                  </option>
                ))}
              </select>
            </div>

            <button style={styles.button} onClick={handleConfirmarRegistro}>
              Confirmar Registro
            </button>
            <button style={styles.button} onClick={() => handleButtonClick('RegistroPaciente')}>
  Registrar Paciente
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCamillas;