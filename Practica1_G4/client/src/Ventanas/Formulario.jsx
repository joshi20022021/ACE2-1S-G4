import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importar motion desde framer-motion
import '../App.css';

const Formulario = () => {
  const navigate = useNavigate();

  // Animaciones
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light position-relative"
    >
      <h2
        className="text-center mb-5"
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        FORMULARIO
      </h2>

      {/* Animación para el formulario */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        style={{ width: "90%", maxWidth: "1200px" }}
        className="p-4 bg-white rounded shadow"
      >
        <Form>
          <Row>
            {/* Columna 1: Campos de texto y selects */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Diagnóstico Principal</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control type="number" min="0" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expediente Médico</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha de Ingreso</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sexo</Form.Label>
                <Form.Select required>
                  <option value="">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Sangre</Form.Label>
                <Form.Select required>
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

            {/* Columna 2: Campos que requieren mayor información (textareas) */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Síntomas Reportados</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Antecedentes Médicos</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Plan de Tratamiento Inicial</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alergias</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>
            </Col>

            {/* Columna 3: Checkboxes de condiciones preexistentes */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group>
                <Form.Label>Condiciones Preexistentes</Form.Label>
                {[
                  "Diabetes",
                  "Hipertensión",
                  "Asma",
                  "Hipotiroidismo",
                  "Hipertiroidismo",
                  "Enfermedad Cardiovascular",
                  "Insuficiencia Renal",
                  "Epilepsia",
                  "Artritis",
                  "Enfermedad Pulmonar Obstructiva Crónica",
                  "Enfermedades Autoinmunes",
                  "Obesidad",
                  "Accidente Cerebrovascular",
                  "Trastornos Psiquiátricos (Depresión, Ansiedad)",
                  "Trastornos Digestivos (Gastritis, Ulceras)",
                ].map((condition, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={`condition-${index}`}
                    label={condition}
                    className="mb-2"
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>

          {/* Contenedor para los botones */}
          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            <Button type="submit" variant="primary" size="lg">
              Confirmar Diagnóstico
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/principal")}
            >
              Regresar
            </Button>
          </div>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Formulario;