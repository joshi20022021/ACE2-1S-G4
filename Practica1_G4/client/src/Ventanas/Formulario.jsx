import React,{useState} from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import '../App.css';

const Formulario = () => {
  const navigate = useNavigate();

  let [formDatos, setFormDatos] = useState({
    nombres: "",
    diagnostico: "",
    edad: "",
    expediente: "",
    fechaIngreso: "",
    sexo: "",
    tipoSangre: "",
    sintomas: "",
    antecedentes: "",
    tratamiento: "",
    alergias: "",
    condiciones: [], // Se almacena como un array
  });

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
        console.log(Estado_Acceso)

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

        if (!Estado_Acceso){
          navigate("/principal");
        }


      } catch (error) {
        
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
        FORMULARIO
      </h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        style={{ width: "90%", maxWidth: "1200px" }}
        className="p-4  rounded shadow"
      >
        <Form>
          <Row>
            {/* Columna 1: Campos de texto y selects */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Nombres</Form.Label>
                <Form.Control type="text" required className="bg-dark text-light" name="nombres"  value={formDatos.nombres} onChange={Cambio} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Diagnóstico Principal</Form.Label>
                <Form.Control type="text" required className="bg-dark text-light" name="diagnostico" value={formDatos.diagnostico} onChange={Cambio}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Edad</Form.Label>
                <Form.Control type="number" min="0" required className="bg-dark text-light" name="edad" value={formDatos.edad} onChange={Cambio}/>
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

            {/* Columna 2: Campos de mayor información (textareas) */}
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Síntomas Reportados</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="sintomas"  value={formDatos.sintomas} onChange={Cambio}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Antecedentes Médicos</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="antecedentes" value={formDatos.antecedentes} onChange={Cambio}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Plan de Tratamiento Inicial</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="tratamiento" value={formDatos.tratamiento} onChange={Cambio}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Alergias</Form.Label>
                <Form.Control as="textarea" rows={3} required className="bg-dark text-light" name="alergias" value={formDatos.alergias} onChange={Cambio}/>
              </Form.Group>
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
                  "Trastornos Psiquiátricos (Depresión, Ansiedad)",
                  "Trastornos Digestivos (Gastritis, Ulceras)",
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
            <Button  variant="primary" size="lg" onClick={() => Enviar_Datos()}>
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
