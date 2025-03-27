import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion } from 'framer-motion';

const Ficha = () => {
  const navigate = useNavigate();
  const [indicePaciente, setIndicePaciente] = useState(0);
  const [pacientes, setPacientes] = useState([]);
  
  // Listas de todas las opciones
  const condicionesPreexistentes = [
    "Cáncer", "VIH/SIDA", "Diabetes", "Hipertensión", "Asma",
    "Enfermedad cardíaca", "Artritis", "EPOC", "Obesidad", "Enfermedad renal"
  ];

  const opcionesAlergias = [
    "Penicilina", "Aspirina", "Sulfamidas", "Yodo", "Latex",
    "Polen", "Ácaros", "Mariscos", "Frutos secos", "Huevos"
  ];

  const opcionesEstado = [
    "Estable", "Grave", "Crítico", "En observación", 
    "Recuperación", "Alta médica"
  ];

  const opcionesDiagnostico = [
    "Neumonía", "Infección urinaria", "Hipertensión arterial", 
    "Diabetes mellitus", "Asma bronquial", "Gastritis", 
    "Artritis reumatoide", "Depresión mayor", "COVID-19", 
    "Fractura de cadera"
  ];

  const opcionesSintomas = [
    "Fiebre", "Tos persistente", "Dificultad respiratoria", 
    "Dolor torácico", "Mareos", "Náuseas/vómitos", 
    "Diarrea", "Cefalea intensa", "Pérdida de peso", 
    "Fatiga crónica"
  ];

  const opcionesTratamiento = [
    "Antibióticos", "Antiinflamatorios", "Analgésicos", 
    "Quimioterapia", "Fisioterapia", "Cirugía programada", 
    "Terapia hormonal", "Psicoterapia", "Dieta especial", 
    "Reposo absoluto"
  ];

  const opcionesObservaciones = [
    "Mejoría notable", "Sin cambios", "Empeoramiento", 
    "Reacción al tratamiento", "Requiere seguimiento", 
    "Alta inminente", "Cambio de medicación", 
    "Derivación a especialista", "Exámenes pendientes", 
    "Riesgo de recaída"
  ];

  const opcionesAntecedentes = [
    "Cirugías previas", "Hospitalizaciones anteriores", 
    "Enfermedades crónicas", "Alergias conocidas", 
    "Antecedentes familiares relevantes", "Traumatismos importantes", 
    "Tratamientos prolongados", "Adicciones", 
    "Embarazos/partos", "Vacunación incompleta"
  ];

  const opcionesRecomendaciones = [
    "Control en 1 semana", "Exámenes de laboratorio", 
    "Imágenes diagnósticas", "Consulta con especialista", 
    "Cambio de hábitos", "Terapia de rehabilitación", 
    "Acompañamiento psicológico", "Hospitalización domiciliaria", 
    "Urgencias si empeora", "Alta sin recomendaciones"
  ];

  const fechasIniciales = [
    "2023-01-01", "2023-02-15", "2023-03-10", 
    "2023-04-05", "2023-05-20", "2023-06-15",
    "2023-07-10", "2023-08-25", "2023-09-30",
    "2023-10-15"
  ];

  const fechasFinales = [
    "2023-04-05", "2023-05-20", "2023-24-15",
    "2023-07-10", "2023-08-25", "2023-09-30",
    "2023-10-15", "2023-11-20", "2023-12-01",
    "2024-01-15"
  ];

  // listas para los diagnosticos, antecedentes y recomendaciones
  const [formDatos, setFormDatos] = useState({
    datosGenerales: {
      nombres: "",
      edad: "",
      expediente: "",
      fechaIngreso: "",
      sexo: "",
      tipoSangre: ""
    },
    diagnosticos: [],
    antecedentes: []
  });

  const ListaPacientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/GetPacientes", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect(() => {
    ListaPacientes();
  }, []);

  const handlePacienteChange = async (event) => {
    const nuevoIndice = event.target.selectedIndex;
    setIndicePaciente(nuevoIndice);
  };

  const cargarListas = () => {
    const diagnosticosTransformados = opcionesDiagnostico.map((diagnostico, index) => ({
      nombreDiagnostico: diagnostico,
      condicionesPreexistentes: [condicionesPreexistentes[index % condicionesPreexistentes.length]],
      alergias: [opcionesAlergias[index % opcionesAlergias.length]],
      estado: opcionesEstado[index % opcionesEstado.length],
      sintomas: [opcionesSintomas[index % opcionesSintomas.length]],
      tratamiento: opcionesTratamiento[index % opcionesTratamiento.length],
      observaciones: opcionesObservaciones[index % opcionesObservaciones.length],
      recomendaciones: opcionesRecomendaciones[index % opcionesRecomendaciones.length],
      fecha_inicial: fechasIniciales[index % fechasIniciales.length],
      fecha_Final: fechasFinales[index % fechasFinales.length]
    }));

    setFormDatos({
      datosGenerales: {
        nombres: pacientes[indicePaciente] || "",
        
      },
      diagnosticos: diagnosticosTransformados,
      antecedentes: opcionesAntecedentes
    });
  };

  const borrarPaciente = async () => {
    if (indicePaciente == null) {
      console.error("Error: índicePaciente es null o undefined");
      return;
    }

    try {
      const response = await fetch(`http://192.168.137.1:8080/BorrarDatosPaciente?IndicePaciente=${indicePaciente}`, {
        method: "POST",
      });

      const data = await response.text();
      console.log("Respuesta del backend:", data);
      ListaPacientes();
    } catch (error) {
      console.error("Error al borrar el paciente:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
    const margin = 15;
    let yPos = margin;
    const lineHeight = 7;
    const pageHeight = 280;
  
    const titleStyle = { fontSize: 16, textColor: [6, 19, 31], fontStyle: 'bold' };
    const sectionStyle = { fontSize: 12, textColor: [6, 19, 31], fontStyle: 'bold' };
    const normalStyle = { fontSize: 10, textColor: [0, 0, 0], fontStyle: 'normal' };
    const diagnosticoStyle = { fontSize: 12, textColor: [0, 0, 0], fontStyle: 'bold' };
  
    const setStyle = (style) => {
      doc.setFontSize(style.fontSize);
      doc.setTextColor(...style.textColor);
      doc.setFont("helvetica", style.fontStyle);
    };
  
    setStyle(titleStyle);
    doc.text("FICHA DE IDENTIFICACIÓN DEL PACIENTE", 105, yPos, { align: "center" });
    yPos += lineHeight * 2;
  
    // Información general
    setStyle(sectionStyle);
    doc.text("INFORMACIÓN GENERAL", margin, yPos);
    yPos += lineHeight;

    setStyle(normalStyle);
    const generalData = [
      `Nombre: ${formDatos.datosGenerales.nombres || "-"}`,
      `Edad: ${formDatos.datosGenerales.edad || "-"} | Sexo: ${formDatos.datosGenerales.sexo || "-"}`,
      `Tipo de sangre: ${formDatos.datosGenerales.tipoSangre || "-"}`,
      `Expediente: ${formDatos.datosGenerales.expediente || "-"}`,
      `Fecha de ingreso: ${formDatos.datosGenerales.fechaIngreso || "-"}`
    ];

    generalData.forEach(text => {
      if (yPos > pageHeight - (lineHeight * 2)) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(text, margin, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;

    // Antecedentes
    setStyle(sectionStyle);
    doc.text("ANTECEDENTES", margin, yPos);
    yPos += lineHeight;

    setStyle(normalStyle);
    const antecedentesText = formDatos.antecedentes.join(", ");
    doc.text(antecedentesText, margin, yPos, { maxWidth: 180 });
    yPos += lineHeight * (antecedentesText.length > 100 ? 3 : 1);
    yPos += lineHeight;

    formDatos.diagnosticos.forEach((diagnostico, index) => {
      setStyle(diagnosticoStyle);
      doc.text(`DIAGNÓSTICO ${index + 1}: ${diagnostico.nombreDiagnostico}`, margin, yPos);
      yPos += lineHeight;

      setStyle(normalStyle);
      const diagnosticoData = [
        `• Condiciones: ${diagnostico.condicionesPreexistentes.join(", ")}`,
        `• Alergias: ${diagnostico.alergias.join(", ")}`,
        `• Estado: ${diagnostico.estado}`,
        `• Síntomas: ${diagnostico.sintomas.join(", ")}`,
        `• Tratamiento: ${diagnostico.tratamiento}`,
        `• Observaciones: ${diagnostico.observaciones}`,
        `• Recomendaciones: ${diagnostico.recomendaciones}`,
        `• Fechas: ${diagnostico.fecha_inicial} - ${diagnostico.fecha_Final}`
      ];

      diagnosticoData.forEach(item => {
        if (yPos > pageHeight - lineHeight) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(item, margin + 5, yPos);
        yPos += lineHeight;
      });

      yPos += lineHeight;
    });

    doc.save(`ficha_paciente_${formDatos.datosGenerales.nombres.replace(/\s+/g, '_')}.pdf`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
  };

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="d-flex gap-4">
        <div className="w-25">
          <label htmlFor="pacientes" className="form-label" style={{ fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>
            Pacientes
          </label>
          <select
            id="pacientes"
            className="form-select"
            onChange={handlePacienteChange}
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map((nombre, index) => (
              <option key={index} value={nombre}>{nombre}</option>
            ))}
          </select>
          
          <button 
            className="btn btn-info mt-3 w-100" 
            onClick={cargarListas}
            style={{ borderRadius: '28px' }}
          >
            Cargar Datos
          </button>
        </div>
        
        <div className="w-75">
          <motion.div variants={tableVariants} className="dynamic-grid">
            <div className="grid-header">
              <h3>FICHA DE IDENTIFICACIÓN DEL PACIENTE</h3>
            </div>
            
            <div className="grid-container">
              {/* Información básica */}
              <div className="grid-item">
                <h5>INFORMACIÓN GENERAL</h5>
                <div className="grid-row">
                  <div className="grid-cell">
                    <label>Nombre(s)</label>
                    <div>{formDatos.datosGenerales.nombres || "-"}</div>
                  </div>
                  <div className="grid-cell">
                    <label>Edad</label>
                    <div>{formDatos.datosGenerales.edad || "-"}</div>
                  </div>
                  <div className="grid-cell">
                    <label>Sexo</label>
                    <div>{formDatos.datosGenerales.sexo || "-"}</div>
                  </div>
                  <div className="grid-cell">
                    <label>Tipo de Sangre</label>
                    <div>{formDatos.datosGenerales.tipoSangre || "-"}</div>
                  </div>
                </div>
                
                <div className="grid-row">
                  <div className="grid-cell">
                    <label>Expediente Médico</label>
                    <div>{formDatos.datosGenerales.expediente || "-"}</div>
                  </div>
                  <div className="grid-cell">
                    <label>Fecha Ingreso</label>
                    <div>{formDatos.datosGenerales.fechaIngreso || "-"}</div>
                  </div>
                </div>
              </div>
              
              {/* Antecedentes */}
              <div className="grid-item">
                <h5>ANTECEDENTES</h5>
                <div className="grid-data">
                  {formDatos.antecedentes.map((antecedente, i) => (
                    <span key={`antecedente-${i}`} className="data-item">{antecedente}</span>
                  ))}
                </div>
              </div>
              
              {/* Diagnósticos */}
              {formDatos.diagnosticos.map((diagnostico, index) => (
                <div key={index} className="grid-item diagnostico-item">
                  <h5>DIAGNÓSTICO {index + 1}: {diagnostico.nombreDiagnostico}</h5>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Condiciones preexistentes</label>
                      <div>{diagnostico.condicionesPreexistentes.join(", ")}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Alergias</label>
                      <div>{diagnostico.alergias.join(", ")}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Estado</label>
                      <div>{diagnostico.estado}</div>
                    </div>
                  </div>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Síntomas</label>
                      <div>{diagnostico.sintomas.join(", ")}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Tratamiento</label>
                      <div>{diagnostico.tratamiento}</div>
                    </div>
                  </div>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Observaciones</label>
                      <div>{diagnostico.observaciones}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Recomendaciones</label>
                      <div>{diagnostico.recomendaciones}</div>
                    </div>
                  </div>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Fecha inicial</label>
                      <div>{diagnostico.fecha_inicial}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Fecha final</label>
                      <div>{diagnostico.fecha_Final}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="w-25">
          <div className="fotografia">
            <h3>Fotografía</h3>
            <div className="foto-placeholder"></div>
          </div>
        </div>
      </div>

      <motion.div className="buttons d-flex justify-content-center mt-4" variants={buttonVariants}>
        <div className="d-flex gap-3">
          <button className="btn btn-danger" onClick={borrarPaciente}>
            Dar de Alta
          </button>
          <button className="btn btn-secondary" onClick={generatePDF}>
            Reporte PDF
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/principal')}>
            Regresar a Principal
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        /* Tus estilos existentes se mantienen igual */
        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .dynamic-grid {
          background-color: #2e2e2e;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .grid-header {
          background-color: rgb(6, 19, 31);
          color: white;
          padding: 15px;
          text-align: center;
          font-weight: bold;
          font-size: 18px;
        }
        
        .grid-header h3 {
          margin: 0;
          text-transform: uppercase;
        }
        
        .grid-container {
          padding: 15px;
        }
        
        .grid-item {
          margin-bottom: 20px;
          background-color: #3a3a3a;
          border-radius: 6px;
          padding: 15px;
        }
        
        .diagnostico-item {
          border-left: 4px solid #0dcaf0;
        }
        
        .grid-item h5 {
          color: #fff;
          margin-top: 0;
          margin-bottom: 15px;
          border-bottom: 1px solid #555;
          padding-bottom: 8px;
        }
        
        .diagnostico-item h5 {
          color: #0dcaf0;
        }
        
        .grid-item h6 {
          color: #0df0b7;
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .grid-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
          gap: 10px;
        }
        
        .grid-cell {
          flex: 1;
          min-width: 200px;
          padding: 8px;
          background-color: #2e2e2e;
          border-radius: 4px;
        }
        
        .grid-cell label {
          display: block;
          color: #aaa;
          font-size: 12px;
          margin-bottom: 5px;
        }
        
        .grid-cell div {
          color: white;
          font-size: 14px;
          word-break: break-word;
        }
        
        .grid-data {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .data-item {
          background-color: #4a4a4a;
          color: white;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 13px;
          white-space: nowrap;
        }
        
        .fotografia {
          border: 1px solid #444;
          padding: 15px;
          text-align: center;
          background-color: #2e2e2e;
          color: #ddd;
          border-radius: 8px;
          height: fit-content;
        }
        
        .foto-placeholder {
          width: 100%;
          height: 250px;
          background-color: #3a3a3a;
          border: 2px dashed #555;
          margin-top: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #777;
        }
        
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 28px;
          transition: all 0.3s ease;
          min-width: 150px;
        }
        
        .btn-danger {
          background-color: #dc3545;
          border: none;
        }
        
        .btn-secondary {
          background-color: #6c757d;
          border: none;
        }
        
        .btn-primary {
          background-color: #0d6efd;
          border: none;
        }
        
        .btn-info {
          background-color: #0dcaf0;
          border: none;
        }
        
        .btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
      `}</style>
    </motion.div>
  );
};

export default Ficha;