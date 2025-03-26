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

  const [formDatos, setFormDatos] = useState({
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
    condiciones: [],
  });


  const handlePacienteChange = async (event) => {
    const nuevoIndice = event.target.selectedIndex;
    setIndicePaciente(nuevoIndice);
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
      ListaPacientes(); // Refrescar la lista de pacientes después de borrar
    } catch (error) {
      console.error("Error al borrar el paciente:", error);
    }
  };

  const generatePDF = () => {
    const [year, month, day] = formDatos.fechaIngreso
      ? formDatos.fechaIngreso.split("-")
      : ["-", "-", "-"];

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    doc.autoTable({
      startY: 10,
      head: [
        [
          {
            content: "FICHA DE IDENTIFICACIÓN DEL PACIENTE",
            colSpan: 4,
            styles: {
              halign: "center",
              fillColor: [6, 19, 31],
              textColor: 255,
              fontStyle: "bold",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    const tableBody = [
      ["NOMBRE(S)", "DÍA", "MES", "AÑO"],
      [formDatos.nombres || "-", day || "-", month || "-", year || "-"],
      [{ content: "EDAD", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }],
      [{ content: formDatos.edad || "-", colSpan: 4, styles: { halign: "center" } }],
      [{ content: "EXPEDIENTE MÉDICO", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }],
      [{ content: formDatos.expediente || "-", colSpan: 4, styles: { halign: "center" } }],
      [{ content: "DIAGNÓSTICO PRINCIPAL", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }],
      [{ content: formDatos.diagnostico || "-", colSpan: 4, styles: { halign: "center" } }],
      [
        { content: "TIPO DE SANGRE", colSpan: 2, styles: { fontStyle: "bold", halign: "center" } },
        { content: "ALERGIAS", colSpan: 2, styles: { fontStyle: "bold", halign: "center" } },
      ],
      [
        { content: formDatos.tipoSangre || "-", colSpan: 2, styles: { halign: "center" } },
        { content: formDatos.alergias || "-", colSpan: 2, styles: { halign: "center" } },
      ],
      [{ content: "SÍNTOMAS REPORTADOS", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }],
      [{ content: formDatos.sintomas || "-", colSpan: 4, styles: { halign: "center" } }],
      [
        { content: "ANTECEDENTES MÉDICOS", colSpan: 2, styles: { fontStyle: "bold", halign: "center" } },
        { content: "CONDICIONES PREEXISTENTES", colSpan: 2, styles: { fontStyle: "bold", halign: "center" } },
      ],
      [
        { content: formDatos.antecedentes || "-", colSpan: 2, styles: { halign: "center" } },
        {
          content: formDatos.condiciones && formDatos.condiciones.length > 0 ? formDatos.condiciones.join(", ") : "-",
          colSpan: 2,
          styles: { halign: "center" },
        },
      ],
      [{ content: "PLAN DE TRATAMIENTO INICIAL", colSpan: 4, styles: { fontStyle: "bold", halign: "center" } }],
      [{ content: formDatos.tratamiento || "-", colSpan: 4, styles: { halign: "center" } }],
    ];

    doc.autoTable({
      startY: 25,
      body: tableBody,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3, valign: "middle" },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
      },
      headStyles: { fillColor: [6, 19, 31], textColor: 255 },
    });

    doc.save("ficha_paciente.pdf");
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
        </div>
        <div className="w-75">
          <motion.table variants={tableVariants}>
            <tbody>
              <tr>
                <td className="title" colSpan="6">
                  FICHA DE IDENTIFICACIÓN DEL PACIENTE
                </td>
              </tr>
              <tr>
                <th colSpan="6">NOMBRE(S)</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.nombres || " "}</td>
              </tr>
              <tr>
                <th>FECHA DE INGRESO</th>
                <th colSpan="6" className="center">
                  SEXO
                </th>
              </tr>
              <tr>
                <td>{formDatos.fechaIngreso || " "}</td>
                <td colSpan="6" className="center">
                  {formDatos.sexo || " "}
                </td>
              </tr>
              <tr>
                <th colSpan="6">EDAD</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.edad || " "}</td>
              </tr>
              <tr>
                <th colSpan="6">EXPEDIENTE MÉDICO</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.expediente || " "}</td>
              </tr>
              <tr>
                <th colSpan="6">DIAGNÓSTICO PRINCIPAL</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.diagnostico || " "}</td>
              </tr>
              <tr>
                <th colSpan="3">TIPO DE SANGRE</th>
                <th colSpan="3">ALERGIAS</th>
              </tr>
              <tr>
                <td colSpan="3">{formDatos.tipoSangre || " "}</td>
                <td colSpan="3">{formDatos.alergias || " "}</td>
              </tr>
              <tr>
                <th colSpan="6">SÍNTOMAS REPORTADOS</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.sintomas || " "}</td>
              </tr>
              <tr>
                <th colSpan="3">ANTECEDENTES MÉDICOS</th>
                <th colSpan="3">CONDICIONES PREEXISTENTES</th>
              </tr>
              <tr>
                <td colSpan="3">{formDatos.antecedentes || " "}</td>
                <td colSpan="3">
                  {formDatos.condiciones && formDatos.condiciones.length > 0
                    ? formDatos.condiciones.map((condicion, index) => (
                        <div key={index}>{condicion}</div>
                      ))
                    : " "}
                </td>
              </tr>
              <tr>
                <th colSpan="6">PLAN DE TRATAMIENTO INICIAL</th>
              </tr>
              <tr>
                <td colSpan="6">{formDatos.tratamiento || " "}</td>
              </tr>
            </tbody>
          </motion.table>
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
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 auto 20px;
          font-size: 14px;
          border: 1px solid #ccc;
          background-color: #1c1c1c;
        }
        th,
        td {
          border: 1px solid #ccc;
          padding: 6px 10px;
          vertical-align: middle;
          background-color: #2e2e2e;
          color: #fff;
        }
        th {
          background-color: #000;
          font-weight: bold;
          text-align: left;
        }
        .title {
          font-size: 18px;
          text-transform: uppercase;
          text-align: center;
          font-weight: bold;
          color: #fff;
          background-color: rgb(6, 19, 31);
          padding: 10px 0;
          border: none !important;
        }
        .center {
          text-align: center;
        }
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 28px;
          transition: all 0.3s ease;
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
        .btn:hover {
          opacity: 0.9;
        }
        .fotografia {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          background-color: #2e2e2e;
          color: #fff;
        }
        .foto-placeholder {
          width: 100%;
          height: 200px;
          background-color: #1c1c1c;
          border: 1px dashed #ccc;
          margin-top: 10px;
        }
      `}</style>
    </motion.div>
  );
};

export default Ficha;