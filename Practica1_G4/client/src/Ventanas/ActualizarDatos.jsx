import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

// Definición de estilos
const styles = {
  wrapper: {
    position: 'relative', // Para posicionar el botón de regreso
    minHeight: '100vh', // Asegura que el wrapper ocupe toda la altura de la pantalla
  },
  backButton: {
    position: 'fixed', // Posición fija para colocarlo en la esquina
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
    textDecoration: 'none', // Para quitar el subrayado del enlace
    zIndex: 1000, // Asegura que el botón esté por encima de otros elementos
  },
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
    marginBottom: '10px', // Espacio entre botones
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
    marginBottom: '10px', // Espacio entre botones
  },
  photoPreview: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    objectFit: 'cover', // Ajusta la imagen para cubrir el contenedor
    borderRadius: '8px',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
  },
  captureButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '28px',
    backgroundColor: '#cc0000',
    color: '#fff',
    boxShadow: '0 4px 8px rgb(255, 200, 200)',
    transition: 'all 0.3s ease',
    marginTop: '10px', // Espacio arriba del botón
  },
};

const ActualizarLDatos = () => {
  // Estado para cada campo de texto
  const [campo1, setCampo1] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [sexo, setSexo] = useState('');
  const [campo3, setCampo3] = useState('');
  const [foto, setFoto] = useState(null); // Estado para la foto
  const [cameraActive, setCameraActive] = useState(false); // Estado para activar/desactivar la cámara
  const videoRef = useRef(null); // Referencia para el elemento de video
  const canvasRef = useRef(null); // Referencia para el elemento de canvas

  // Opciones para el combo box de tipo de sangre
  const tiposSangre = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Opciones para el combo box de sexo
  const opcionesSexo = ['Masculino', 'Femenino', 'Otro'];

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', { campo1, tipoSangre, sexo, campo3, foto });
  };

  // Función para manejar la selección de la foto desde el dispositivo
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file)); // Guarda la URL de la foto para previsualización
    }
  };

  // Función para activar la cámara
  const activateCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  // Función para capturar la foto desde la cámara
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Ajusta el canvas al tamaño del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibuja la imagen del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convierte la imagen del canvas a una URL y la guarda en el estado
      const photoURL = canvas.toDataURL('image/png');
      setFoto(photoURL);

      // Desactiva la cámara
      setCameraActive(false);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Botón de regreso */}
      <Link to="/ApartadoU" style={styles.backButton}>
        Regresar
      </Link>

      {/* Contenedor principal */}
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
              {cameraActive ? (
                <>
                  <video ref={videoRef} autoPlay style={styles.cameraPreview} />
                  <button onClick={capturePhoto} style={styles.captureButton}>
                    Capturar Foto
                  </button>
                </>
              ) : foto ? (
                <img src={foto} alt="Vista previa" style={styles.photoPreview} />
              ) : (
                <p style={{ color: '#fff', textAlign: 'center' }}>Arrastra o selecciona una foto</p>
              )}
            </div>

            {/* Botón para seleccionar foto desde el dispositivo */}
            <input
              type="file"
              id="foto"
              accept="image/*"
              style={styles.photoInput}
              onChange={handleFotoChange}
            />
            <label htmlFor="foto" style={styles.photoLabel}>
              Subir Foto
            </label>

            {/* Botón para activar la cámara */}
            <button onClick={activateCamera} style={styles.button}>
              Tomar Foto con la Cámara
            </button>
          </div>
        </div>
      </div>

      {/* Canvas oculto para capturar la foto */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ActualizarLDatos;