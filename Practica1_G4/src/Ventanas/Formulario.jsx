import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Formulario = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light position-relative"
    >
      {/* Botón para regresar a Principal.jsx */}
      <Button
        variant="danger"
        className="position-absolute top-0 start-0 m-3"
        onClick={() => navigate("/principal")}
      >
        Regresar
      </Button>

      <h2
        className="text-center mb-5"
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        F O R M U L A R I O
      </h2>

      <Form
        style={{ width: "90%", maxWidth: "1200px" }}
        className="p-4 bg-white rounded shadow"
      >
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

        <div className="text-center mt-4">
          <Button type="submit" variant="primary" size="lg">
            Confirmar Diagnóstico
          </Button>
        </div>
      </Form>
    </Container>
  );
};


const styles = {
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    marginBottom: "50px",
    color: "#333",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    width: "90%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    height: "100px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "50px",
    backgroundColor: "#482828",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
  },
  checkbox: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
};

export default Formulario;