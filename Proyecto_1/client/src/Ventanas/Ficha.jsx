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

  // Ejemplo de consumo
  const cargarHistorial = async (idPaciente) => {
    try {
      const response = await fetch(`http://192.168.137.123:8080/GetHistorialPaciente?idPaciente=${idPaciente}`, {
        method: "POST"
      });
      const data = await response.json();
      
      // Ajustar tu estado en React, por ejemplo:
      setFormDatos({
        datosGenerales: {
          nombres: data.nombres || "",
          edad: data.edad || "",
          sexo: data.sexo || "",
          tipoSangre: data.tipoSangre || "",
          expediente: data.expediente || "",
          fechaIngreso: data.fechaIngreso || "",
          foto: data.foto || null,
          Estado: data.estado || ""
        },
        diagnosticos: data.diagnosticos || []
      });
    } catch (error) {
      console.error("Error al obtener historial:", error);
    }
  };

  // listas para los diagnosticos, antecedentes y recomendaciones
  const [formDatos, setFormDatos] = useState({
    datosGenerales: {
      nombres: "",
      edad: "",
      expediente: "",
      fechaIngreso: "",
      fechafinal:"",
      sexo: "",
      tipoSangre: "",
      foto: "",
      Estado:""
    },
    diagnosticos: []
  });

  const ListaPacientes = async () => {
    try {
      const response = await fetch("http://192.168.137.123:8080/GetPacientes", {
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
    cargarHistorial(indicePaciente);
  };

  
  const margin = 15;
  let yPos = margin;
  const lineHeight = 7;
  const pageHeight = 280;

  const titleStyle = { fontSize: 16, textColor: [6, 19, 31], fontStyle: 'bold' };
  const sectionStyle = { fontSize: 12, textColor: [6, 19, 31], fontStyle: 'bold' };
  const normalStyle = { fontSize: 10, textColor: [0, 0, 0], fontStyle: 'normal' };
  const diagnosticoStyle = { fontSize: 12, textColor: [0, 0, 0], fontStyle: 'bold' };



  const generateReporte = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
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
      `Edad: ${formDatos.datosGenerales.edad || "-"}`,
      `Sexo: ${formDatos.datosGenerales.sexo || "-"}`,
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

    setStyle(sectionStyle);
    doc.text("HISTORIAL MÉDICO", margin, yPos);
    yPos += lineHeight;
    setStyle(normalStyle);

    formDatos.diagnosticos.forEach((diagnostico, index) => {
      setStyle(diagnosticoStyle);
      doc.text(`DIAGNÓSTICO ${index + 1}: ${diagnostico.diagnostico}`, margin, yPos);
      yPos += lineHeight;

      setStyle(normalStyle);
      const diagnosticoData = [
        `• Condiciones: ${diagnostico.condiciones}`,
        `• Alergias: ${diagnostico.alergias}`,
        `• Estado: ${diagnostico.estado}`,
        `• Síntomas: ${diagnostico.sintomas}`,
        `• Tratamiento: ${diagnostico.tratamiento}`,
        `• Antecedentes: ${diagnostico.antecedentes}`,
        `• Observaciones: ${diagnostico.observaciones}`,
        `• Recomendaciones: ${diagnostico.recomendaciones}`,
        `• Fechas: ${diagnostico.fecha} - ${diagnostico.fechafinal}`
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
    yPos = margin;
  };

  const generateAlta = async() => {

    // Fecha final de alta
    const ahora = new Date();
    const offsetMs = ahora.getTimezoneOffset() * 60000;
    const local = new Date(ahora.getTime() - offsetMs);

    const fechaGuatemala = local.toISOString().slice(0, 19).replace('T', ' ');
    formDatos.datosGenerales.fechafinal = fechaGuatemala;
 
    console.log(fechaGuatemala);
    // Petición para dar de alta
    await fetch(`http://192.168.137.123:8080/DarDeAlta?idPaciente=${indicePaciente}&fechafinal=${fechaGuatemala}`, {
      method: "POST"
    });

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const setStyle = (style) => {
      doc.setFontSize(style.fontSize);
      doc.setTextColor(...style.textColor);
      doc.setFont("helvetica", style.fontStyle);
    };

    setStyle(titleStyle);
    doc.text("CONSTANCIA DE ALTA MÉDICA DEL PACIENTE", 105, yPos, { align: "center" });
    yPos += lineHeight * 2;
  
    // Información general
    setStyle(sectionStyle);
    doc.text("INFORMACIÓN GENERAL", margin, yPos);
    yPos += lineHeight;

    setStyle(normalStyle);
    const generalData = [
      `Nombre: ${formDatos.datosGenerales.nombres || "-"}`,
      `Edad: ${formDatos.datosGenerales.edad || "-"}`,
      `Sexo: ${formDatos.datosGenerales.sexo || "-"}`,
      `Tipo de sangre: ${formDatos.datosGenerales.tipoSangre || "-"}`,
      `Expediente: ${formDatos.datosGenerales.expediente || "-"}`,
      `Fecha de ingreso: ${formDatos.datosGenerales.fechaIngreso || "-"}`,
      `Fecha de salida: ${formDatos.datosGenerales.fechafinal || "-"}`
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

    doc.save(`alta_paciente_${formDatos.datosGenerales.nombres.replace(/\s+/g, '_')}.pdf`);
    yPos = margin;
  };

  const generateAltaDiagnóstico = async(indiceDiagnóstico) => {

    const response = await fetch("http://192.168.137.123:8080/IdDiagnosticosPaciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        idPaciente: indicePaciente
      })
    });
    const diagnosticos = await response.json();
    console.log("-->"+diagnosticos[indiceDiagnóstico]+"<--");

    await fetch(`http://192.168.137.123:8080/DarDeAltaDiagnostico?idPaciente=${indicePaciente}&idDiagnostico=${diagnosticos[indiceDiagnóstico]}`, {
      method: "POST"
    });

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const setStyle = (style) => {
      doc.setFontSize(style.fontSize);
      doc.setTextColor(...style.textColor);
      doc.setFont("helvetica", style.fontStyle);
    };

    setStyle(titleStyle);
    doc.text("CONSTANCIA DE ALTA DE DIAGNÓSTICO DEL PACIENTE", margin, yPos);
    yPos += lineHeight;
    doc.text(formDatos.datosGenerales.nombres, margin, yPos);
    yPos += lineHeight;
    setStyle(normalStyle);

      setStyle(diagnosticoStyle);
      doc.text(`DIAGNÓSTICO ${indiceDiagnóstico + 1}: ${formDatos.diagnosticos[indiceDiagnóstico].diagnostico}`, margin, yPos);
      yPos += lineHeight;

      setStyle(normalStyle);
      const diagnosticoData = [
        `• Condiciones: ${formDatos.diagnosticos[indiceDiagnóstico].condiciones}`,
        `• Alergias: ${formDatos.diagnosticos[indiceDiagnóstico].alergias}`,
        `• Síntomas: ${formDatos.diagnosticos[indiceDiagnóstico].sintomas}`,
        `• Tratamiento: ${formDatos.diagnosticos[indiceDiagnóstico].tratamiento}`,
        `• Antecedentes: ${formDatos.diagnosticos[indiceDiagnóstico].antecedentes}`,
        `• Observaciones: ${formDatos.diagnosticos[indiceDiagnóstico].observaciones}`,
        `• Recomendaciones: ${formDatos.diagnosticos[indiceDiagnóstico].recomendaciones}`,
        `• Fechas: ${formDatos.diagnosticos[indiceDiagnóstico].fecha} - ${formDatos.diagnosticos[indiceDiagnóstico].fechafinal}`
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
      setStyle(diagnosticoStyle);
      doc.text(`Información de las gráficas`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Oximetria datos`, margin, yPos);
      yPos += lineHeight;
      setStyle(normalStyle);
      doc.text(` Minimo: ${formDatos.diagnosticos[indiceDiagnóstico].minimoO} Maximo: ${formDatos.diagnosticos[indiceDiagnóstico].maximoO} Promedio: ${formDatos.diagnosticos[indiceDiagnóstico].promedioO}`, margin, yPos);
      yPos += lineHeight;
      setStyle(diagnosticoStyle);
      doc.text(`ECG datos`, margin, yPos);
      yPos += lineHeight;
      setStyle(normalStyle);
      doc.text(` Minimo: ${formDatos.diagnosticos[indiceDiagnóstico].minimoE} Maximo: ${formDatos.diagnosticos[indiceDiagnóstico].maximoE} Promedio: ${formDatos.diagnosticos[indiceDiagnóstico].promedioE}`, margin, yPos);
   

    doc.save(`alta_paciente_${formDatos.datosGenerales.nombres.replace(/\s+/g, '_')}.pdf`);
    yPos = margin;
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

                <div className="grid-row">
                  <div className="grid-cell">
                    <label>Estado</label>
                    <div>{formDatos.datosGenerales.Estado || "-"}</div>
                  </div>
                </div>
              </div>
              
              {/* Diagnósticos */}
              {formDatos.diagnosticos.map((diagnostico, index) => (
                
                <div key={index} className="grid-item diagnostico-item">
                  <h5>DIAGNÓSTICO {index + 1}: {diagnostico.diagnostico}</h5>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Condiciones preexistentes</label>
                      <div>{diagnostico.condiciones}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Alergias</label>
                      <div>{diagnostico.alergias}</div>
                    </div>
                  </div>
                  
                  <div className="grid-row">
                    <div className="grid-cell">
                      <label>Síntomas</label>
                      <div>{diagnostico.sintomas}</div>
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
                      <div>{diagnostico.fecha}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Fecha final</label>
                      <div>{diagnostico.fechafinal}</div>
                    </div>
                    
                    <div className="grid-cell">
                      <label>Antecedentes</label>
                      <div>{diagnostico.antecedentes}</div>
                    </div>
                    <div className="grid-cell">
                      <label>Estado</label>
                      <div>{diagnostico.estado}</div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-danger mt-3 w-100" 
                    onClick={() => generateAltaDiagnóstico(index)}
                    style={{ borderRadius: '28px' }}>
                    Dar de Alta
                  </button>
                </div>

                
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="w-25">
          <div className="fotografia">
            <h3>Fotografía</h3>
            <div className="foto-placeholder">
            {formDatos.datosGenerales.foto ? (
              <img
                src={`data:image/jpeg;base64,${formDatos.datosGenerales.foto}`}
                alt="Fotografía del paciente"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
              />
              ) : (
              <span>Sin imagen</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div className="buttons d-flex justify-content-center mt-4" variants={buttonVariants}>
        <div className="d-flex gap-3">
          <button className="btn btn-danger" onClick={generateAlta}>
            Dar de Alta
          </button>
          <button className="btn btn-secondary" onClick={generateReporte}>
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