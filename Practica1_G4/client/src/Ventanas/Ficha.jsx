import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion } from 'framer-motion'; // Importar motion desde framer-motion

const Ficha = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [indicePaciente, setIndicePaciente] = useState(0);
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
  
  const handleClick = async () => {

        try {
          const response = await fetch("http://192.168.137.1:8080/SeleccionarPaciente", {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Error al obtener los datos");
          }
          // Suponiendo que el backend retorna un objeto JSON 
          // cuyas llaves coinciden con las propiedades de formDatos.
          const data = await response.json();
          console.log("Datos obtenidos:", data);
    
          // Actualizamos el estado con los datos recibidos
          setFormDatos(data);
        } catch (error) {
          console.error("Error:", error);
        }

        try {
          const response = await fetch("http://192.168.137.1:8080/SeleccionarIndice"); // Ajusta la URL según corresponda
          const data = await response.json();
          setIndicePaciente(data);
        } catch (error) {
          console.error("Error al obtener el índice:", error);
        }



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
    } catch (error) {
      console.error("Error al borrar el paciente:", error);
    }
  };

  useEffect(() => {
    // Activar la animación después de que el componente se monte
    setIsVisible(true);
  }, []);

  const generatePDF = () => {
    // Extraemos año, mes y día del campo fechaIngreso
    const [year, month, day] = formDatos.fechaIngreso
      ? formDatos.fechaIngreso.split("-")
      : ["-", "-", "-"];
  
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
    // Título de la ficha
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
  
    // Estructura de la tabla en base a la plantilla original
    const tableBody = [
      // Fila de encabezado para nombre y fecha
      ["NOMBRE(S)", "DÍA", "MES", "AÑO"],
      [
        formDatos.nombres || "-",
        day || "-",
        month || "-",
        year || "-",
      ],
      // Fila de EDAD
      [
        {
          content: "EDAD",
          colSpan: 4,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.edad || "-",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
      // Fila de EXPEDIENTE MÉDICO
      [
        {
          content: "EXPEDIENTE MÉDICO",
          colSpan: 4,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.expediente || "-",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
      // Fila de DIAGNÓSTICO PRINCIPAL
      [
        {
          content: "DIAGNÓSTICO PRINCIPAL",
          colSpan: 4,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.diagnostico || "-",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
      // Fila de TIPO DE SANGRE y ALERGIAS
      [
        {
          content: "TIPO DE SANGRE",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "center" },
        },
        {
          content: "ALERGIAS",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.tipoSangre || "-",
          colSpan: 2,
          styles: { halign: "center" },
        },
        {
          content: formDatos.alergias || "-",
          colSpan: 2,
          styles: { halign: "center" },
        },
      ],
      // Fila de SÍNTOMAS REPORTADOS
      [
        {
          content: "SÍNTOMAS REPORTADOS",
          colSpan: 4,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.sintomas || "-",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
      // Fila de ANTECEDENTES MÉDICOS y CONDICIONES PREEXISTENTES
      [
        {
          content: "ANTECEDENTES MÉDICOS",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "center" },
        },
        {
          content: "CONDICIONES PREEXISTENTES",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.antecedentes || "-",
          colSpan: 2,
          styles: { halign: "center" },
        },
        {
          content:
            formDatos.condiciones && formDatos.condiciones.length > 0
              ? formDatos.condiciones.join(", ")
              : "-",
          colSpan: 2,
          styles: { halign: "center" },
        },
      ],
      // Fila de PLAN DE TRATAMIENTO INICIAL
      [
        {
          content: "PLAN DE TRATAMIENTO INICIAL",
          colSpan: 4,
          styles: { fontStyle: "bold", halign: "center" },
        },
      ],
      [
        {
          content: formDatos.tratamiento || "-",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
    ];
  
    // Ajustamos la tabla con un ancho uniforme para 4 columnas
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
  

  // Animaciones para el contenedor, tabla y botones
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
            <td colSpan="6">{formDatos.nombres || "Nada"}</td>
          </tr>
          <tr>
            <th>FECHA DE INGRESO</th>
            <th colSpan="6" className="center">SEXO</th>
          </tr>
          <tr>
            <td>{formDatos.fechaIngreso || "Nada"}</td>
            <td colSpan="6" className="center">{formDatos.sexo || "Nada"}
            </td>
          </tr>
          <tr>
            <th colSpan="6">EDAD</th>
          </tr>
          <tr>
            <td colSpan="6">{formDatos.edad || "Nada"}</td>
          </tr>
          <tr>
            <th colSpan="6">EXPEDIENTE MÉDICO</th>
          </tr>
          <tr>
            <td colSpan="6">{formDatos.expediente || "Nada"}</td>
          </tr>
          <tr>
            <th colSpan="6">DIAGNÓSTICO PRINCIPAL</th>
          </tr>
          <tr>
            <td colSpan="6">{formDatos.diagnostico || "Nada"}</td>
          </tr>
          <tr>
            <th colSpan="3">TIPO DE SANGRE</th>
            <th colSpan="3">ALERGIAS</th>
          </tr>
          <tr>
            <td colSpan="3">{formDatos.tipoSangre || "Nada"}</td>
            <td colSpan="3">{formDatos.alergias || "Nada"}</td>
          </tr>
          <tr>
            <th colSpan="6">SÍNTOMAS REPORTADOS</th>
          </tr>
          <tr>
            <td colSpan="6">{formDatos.sintomas || "Nada"}</td>
          </tr>
          <tr>
            <th colSpan="3">ANTECEDENTES MÉDICOS</th>
            <th colSpan="3">CONDICIONES PREEXISTENTES</th>
          </tr>
          <tr>
            <td colSpan="3">{formDatos.antecedentes || "Nada"}</td>
            <td colSpan="3">
            {formDatos.condiciones && formDatos.condiciones.length > 0
              ? formDatos.condiciones.map((condicion, index) => (
                  <div key={index}>{condicion}</div>
                ))
              : "Nada"}
          </td>
          </tr>
          <tr>
            <th colSpan="6">PLAN DE TRATAMIENTO INICIAL</th>
          </tr>
          <tr>
            <td colSpan="6">{formDatos.tratamiento || "Nada"}</td>
          </tr>
        </tbody>
      </motion.table>

      {/* Botones con animaciones */}
      <motion.div className="buttons d-flex justify-content-between mt-4" variants={buttonVariants}>
        <div className="d-flex gap-3">
          <button className="btn btn-danger" onClick={borrarPaciente}>Dar de Alta</button>
          <button className="btn btn-save" onClick={handleClick}>Mostrar Datos</button>
          <button className="btn btn-secondary" onClick={generatePDF}>
            Reporte PDF
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/principal')}>
          Regresar a Principal
        </button>
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
          /* Ajustamos un fondo oscuro con suficiente contraste */
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
        .btn-save {
          background-color:rgb(12, 242, 0);
          border: none;
        }
        .btn-secondary {
          background-color: #6c757d;
          border: none;
          margin-right: 20px;
        }
        .btn-primary {
          background-color: #0d6efd;
          border: none;
        }
        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </motion.div>
  );
};

export default Ficha;
