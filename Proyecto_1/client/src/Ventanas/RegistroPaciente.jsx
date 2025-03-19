import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import '../App.css';

const RegistroPaciente = () => {
  const [formDatos, setFormDatos] = useState({
    nombres: "",
    edad: "",
    expediente: "",
    fechaIngreso: "",
    sexo: "",
    tipoSangre: ""
  });

  const Cambio = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
    });
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

      <motion.div initial="hidden" animate="visible" variants={formVariants} style={{ width: "90%", maxWidth: "600px" }} className="p-4 rounded shadow">
        <Form>
          <Row>
            <Col sm={12} className="mb-3">
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
          </Row>

          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg">Guardar Datos</Button>
            <Button variant="danger" size="lg">Regresar</Button>
          </div>
        </Form>
      </motion.div>
    </Container>
  );
};

export default RegistroPaciente;