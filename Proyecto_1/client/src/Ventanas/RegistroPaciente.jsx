import React, { useState, useRef } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RegistroPaciente = () => {
  const navigate = useNavigate();
  const [formDatos, setFormDatos] = useState({
    nombres: "",
    edad: "",
    expediente: "",
    fechaIngreso: "",
    sexo: "",
    tipoSangre: ""
  });

  const [foto, setFoto] = useState(null); // Estado para la foto
  const [cameraActive, setCameraActive] = useState(false); // Estado para activar/desactivar la cámara
  const videoRef = useRef(null); // Referencia para el elemento de video
  const canvasRef = useRef(null); // Referencia para el elemento de canvas

  const Cambio = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file)); // Guarda la URL de la foto para previsualización
    }
  };

  const activateCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert("No se pudo acceder a la cámara. Asegúrate de permitir el acceso.");
    }
  };

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
    } else {
      console.error("Error: videoRef o canvasRef no están asignados correctamente.");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      <h2 className="text-center mb-5" style={{ fontSize: "50px", fontWeight: "bold", color: "#FFFFFF", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
        RegistroPaciente DE DATOS PERSONALES
      </h2>

      <motion.div initial="hidden" animate="visible" variants={formVariants} style={{ width: "90%", maxWidth: "1000px" }} className="p-4 rounded shadow">
        <Form>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Nombres</Form.Label>
                <Form.Control type="text" required className="bg-dark text-light" name="nombres" value={formDatos.nombres} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Edad</Form.Label>
                <Form.Control type="number" min="0" required className="bg-dark text-light" name="edad" value={formDatos.edad} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Expediente Médico</Form.Label>
                <Form.Control type="text" required className="bg-dark text-light" name="expediente" value={formDatos.expediente} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Fecha de Ingreso</Form.Label>
                <Form.Control type="date" required className="bg-dark text-light" name="fechaIngreso" value={formDatos.fechaIngreso} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Sexo</Form.Label>
                <Form.Select required className="bg-dark text-light" name="sexo" value={formDatos.sexo} onChange={Cambio}>
                  <option value="">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Tipo de Sangre</Form.Label>
                <Form.Select required className="bg-dark text-light" name="tipoSangre" value={formDatos.tipoSangre} onChange={Cambio}>
                  <option value="">Seleccione...</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-3">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Contenedor de la vista previa de la foto o cámara */}
                <div style={{ border: '2px dashed #ccc', borderRadius: '8px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.1)', height: '300px', width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
                  {cameraActive ? (
                    <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                  ) : foto ? (
                    <img src={foto} alt="Vista previa" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <p style={{ color: '#fff', textAlign: 'center' }}>Arrastra o selecciona una foto</p>
                  )}
                </div>

                {/* Botón para capturar la foto (fuera del recuadro) */}
                {cameraActive && (
                  <Button onClick={capturePhoto} style={{ marginBottom: '10px', backgroundColor: '#cc0000', border: 'none' }}>
                    Capturar Foto
                  </Button>
                )}

                {/* Input para subir una foto */}
                <input
                  type="file"
                  id="foto"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFotoChange}
                />
                <label htmlFor="foto" style={{ padding: '10px 20px', backgroundColor: 'rgba(72, 8, 8, 0.94)', color: '#fff', borderRadius: '28px', cursor: 'pointer', textAlign: 'center', width: '100%', marginBottom: '10px' }}>
                  Subir Foto
                </label>

                {/* Botón para activar la cámara */}
                <Button onClick={activateCamera} style={{ padding: '13px 10px', fontSize: '18px', cursor: 'pointer', border: 'none', borderRadius: '28px', backgroundColor: 'rgba(72, 8, 8, 0.94)', color: '#fff', boxShadow: '0 4px 8px rgb(234, 209, 209)', transition: 'all 0.3s ease', width: '230px', marginBottom: '10px' }}>
                  Tomar Foto con la Cámara
                </Button>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg">Guardar Datos</Button>
            <Button variant="danger" size="lg" onClick={() => navigate('/principal')}>Regresar</Button>
          </div>
        </Form>
      </motion.div>

      {/* Canvas oculto para capturar la foto */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Container>
  );
};

export default RegistroPaciente;