import React, { useState } from 'react';

// Definición de estilos
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Cambia a columna para alinear el título arriba
    alignItems: 'center', // Centra horizontalmente
    padding: '20px',
    height: '100vh', // Ocupa toda la altura de la pantalla
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '32px', // Tamaño más grande para el título
    marginBottom: '40px', // Espacio debajo del título
    width: '100%', // Ocupa todo el ancho
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px', // Ancho máximo para el contenido
  },
  formContainer: {
    flex: 1,
    marginRight: '20px',
    maxWidth: '600px', // Limita el ancho del formulario
  },
  photoSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px', // Ancho máximo para la sección de la foto
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Centra verticalmente el contenido
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: '300px', // Altura fija para el contenedor de la foto
    width: '100%', // Ocupa todo el ancho de la sección
    marginBottom: '20px', // Espacio debajo del cuadro
    overflow: 'hidden', // Evita que la imagen se salga del contenedor
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
  photoInput: {
    display: 'none', // Oculta el input de archivo
  },
  photoLabel: {
    padding: '10px 20px',
    backgroundColor: 'rgba(72, 8, 8, 0.94)',
    color: '#fff',
    borderRadius: '28px',
    cursor: 'pointer',
    textAlign: 'center',
    width: '100%', // Ocupa todo el ancho
  },
  photoPreview: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    objectFit: 'cover', // Ajusta la imagen para cubrir el contenedor
    borderRadius: '8px',
  },
};

const ActualizarLDatos = () => {
  // Estado para cada campo de texto
  const [campo1, setCampo1] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [sexo, setSexo] = useState('');
  const [campo3, setCampo3] = useState('');
  const [foto, setFoto] = useState(null); // Estado para la foto

  // Opciones para el combo box de tipo de sangre
  const tiposSangre = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Opciones para el combo box de sexo
  const opcionesSexo = ['Masculino', 'Femenino', 'Otro'];

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', { campo1, tipoSangre, sexo, campo3, foto });
  };

  // Función para manejar la selección de la foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file)); // Guarda la URL de la foto para previsualización
    }
  };

  return (
    <div style={styles.container}>
      {/* Título centrado y en una sola línea */}
      <h1 style={styles.title}>A C T U A L I Z A R - D A T O S</h1>

      {/* Contenedor para el formulario y la foto */}
      <div style={styles.content}>
        {/* Formulario */}
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="campo1" style={styles.label}>Nombre Completo:</label>
              <input
                type="text"
                id="campo1"
                value={campo1}
                onChange={(e) => setCampo1(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="tipoSangre" style={styles.label}>Tipo de Sangre:</label>
              <select
                id="tipoSangre"
                value={tipoSangre}
                onChange={(e) => setTipoSangre(e.target.value)}
                style={styles.input}
              >
                <option value="">Seleccione un tipo de sangre</option>
                {tiposSangre.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="sexo" style={styles.label}>Sexo:</label>
              <select
                id="sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                style={styles.input}
              >
                <option value="">Seleccione su sexo</option>
                {opcionesSexo.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="campo3" style={styles.label}>Edad:</label>
              <input
                type="text"
                id="campo3"
                value={campo3}
                onChange={(e) => setCampo3(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Actualizar</button>
          </form>
        </div>

        {/* Sección para la foto */}
        <div style={styles.photoSection}>
          {/* Contenedor para la foto */}
          <div style={styles.photoContainer}>
            {foto ? (
              <img src={foto} alt="Vista previa" style={styles.photoPreview} />
            ) : (
              <p style={{ color: '#fff', textAlign: 'center' }}>Arrastra o selecciona una foto</p>
            )}
          </div>

          {/* Botón para seleccionar foto (fuera del cuadro) */}
          <input
            type="file"
            id="foto"
            accept="image/*"
            style={styles.photoInput}
            onChange={handleFotoChange}
          />
          <label htmlFor="foto" style={styles.photoLabel}>
            Seleccionar Foto
          </label>
        </div>
      </div>
    </div>
  );
};

export default ActualizarLDatos;