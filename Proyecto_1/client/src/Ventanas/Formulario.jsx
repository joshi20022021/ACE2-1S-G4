import React, { useState,useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import '../App.css';

const Formulario = () => {
  const navigate = useNavigate();

    const [pacientes, setPacientes] = useState([]);
    
    useEffect(() => {
      // Hacer la petición a la API
      const fetchPacientes = async () => {
        try {
          const response = await fetch("http://localhost:8080/GetPacientes");
          const data = await response.json();
          setPacientes(data); // Guardamos los nombres en el estado
        } catch (error) {
          console.error("Error al obtener nombres de pacientes:", error);
        }
      };
  
      fetchPacientes();
    }, []);

  let [formDatos, setFormDatos] = useState({
    paciente: "", // Nuevo campo para el paciente seleccionado
    ecgMaximos: "",
    ecgMinimos: "",
    ecgPromedio: "",
    oximetroMaximos: "",
    oximetroMinimos: "",
    oximetroPromedio: "",
    sintomas: "",
    antecedentes: "",
    tratamiento: "",
    alergias: "",
    Observaciones:"",
    recomendaciones: "",
    condiciones: [], // Se almacena como un array
  });

  // Lista de pacientes (puedes obtenerla de una API o base de datos)


  // Manejar cambios en inputs y selects
  const Cambio = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
    });
  };

  // Manejar cambios en checkboxes
  const CheckCambio = (e) => {
    const { value, checked } = e.target;
    setFormDatos((prevState) => ({
      ...prevState,
      condiciones: checked
        ? [...prevState.condiciones, value]
        : prevState.condiciones.filter((item) => item !== value),
    }));
  };

  const Enviar_Datos = async () => {
    console.log("Datos del formulario:", formDatos); // Debug en consola
    try {
      // Bloqueamos acceso al formulario
      const response = await fetch("http://192.168.137.1:8080/Bloqueo_Acceso");
      if (!response.ok) throw new Error("Error en la solicitud");

      const Estado_Acceso = await response.json();
      console.log(Estado_Acceso);

      // Guardar pacientes
      const response1 = await fetch("http://192.168.137.1:8080/guardarPaciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDatos) // Convertir el objeto a JSON para enviarlo
      });

      if (response1.ok) {
        alert("Datos guardados exitosamente, Acerque su tarjeta del paciente.");
      } else {
        alert("Error al guardar los datos.");
      }

      if (!Estado_Acceso) {
        navigate("/principal");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Definición de animaciones
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative"
    >
      <h2
        className="text-center mb-5"
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          color: "#FFFFFF",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        F O R M U L A R I O
      </h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        style={{ width: "90%", maxWidth: "1200px" }}
        className="p-4 rounded shadow"
      >
        <Form>
          <Row>
            {/* Columna 1: Combo box para seleccionar paciente y campos para ECG y Oximetro */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Pacientes</Form.Label>
                <Form.Select required className="bg-dark text-light" name="paciente" value={formDatos.paciente} onChange={Cambio}>
                  <option value="">Seleccione un paciente...</option>
                  {pacientes.map((nombre, index) => (
                    <option key={index} value={nombre}>{nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Campos para ECG */}
              <Form.Group className="mb-3">
                <Form.Label className="text-light">ECG</Form.Label>
                <Row className="mb-2">
                  <Col>
                    <Form.Label className="text-light">Máximos</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="text-light">Mínimos</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="text-light">Promedio</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="ecgMaximos"
                      value={formDatos.ecgMaximos}
                      onChange={Cambio}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="ecgMinimos"
                      value={formDatos.ecgMinimos}
                      onChange={Cambio}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="ecgPromedio"
                      value={formDatos.ecgPromedio}
                      onChange={Cambio}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* Campos para Oximetro */}
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Oximetro</Form.Label>
                <Row className="mb-2">
                  <Col>
                    <Form.Label className="text-light">Máximos</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="text-light">Mínimos</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="text-light">Promedio</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="oximetroMaximos"
                      value={formDatos.oximetroMaximos}
                      onChange={Cambio}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="oximetroMinimos"
                      value={formDatos.oximetroMinimos}
                      onChange={Cambio}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      className="bg-dark text-light"
                      name="oximetroPromedio"
                      value={formDatos.oximetroPromedio}
                      onChange={Cambio}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            {/* Columna 2: Campos de mayor información (textareas) */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Síntomas Reportados</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="sintomas" value={formDatos.sintomas} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Antecedentes Médicos</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="antecedentes" value={formDatos.antecedentes} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Plan de Tratamiento Inicial</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="tratamiento" value={formDatos.tratamiento} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Alergias</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="alergias" value={formDatos.alergias} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Observaciones</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="condiciones" value={formDatos.Observaciones} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Recomendaciones</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="condiciones" value={formDatos.recomendaciones} onChange={Cambio} />
              </Form.Group>1
            </Col>

            {/* Columna 3: Checkboxes para condiciones preexistentes */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group>
                <Form.Label className="text-light">Condiciones Preexistentes</Form.Label>
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
                  "Trastornos Psiquiátricos ",
                  "Trastornos Digestivos ",
                ].map((condition, index) => (
                  <Form.Check
                    name="condiciones"
                    key={index}
                    type="checkbox"
                    id={`condition-${index}`}
                    label={condition}
                    className="mb-2 text-light"
                    style={{ color: "#FFFFFF" }}
                    value={condition}
                    onChange={CheckCambio}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>

          {/* Contenedor para los botones */}
          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg" onClick={() => Enviar_Datos()}>
              Confirmar Diagnóstico
            </Button>
            <Button variant="danger" size="lg" onClick={() => navigate("/principal")}>
              Regresar
            </Button>
          </div>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Formulario;