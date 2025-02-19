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

  useEffect(() => {
    // Activar la animación después de que el componente se monte
    setIsVisible(true);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Título de la ficha
    doc.autoTable({
      startY: 10,
      head: [
        [
          {
            content: "FICHA DE IDENTIFICACIÓN DEL PACIENTE",
            colSpan: 6,
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
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 5,
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
      },
      body: [
        [ "NOMBRE(S)", "DÍA", "MES", "AÑO"],
        ["Carta Apena", "Alvizures", "Edgar Josias", "02", "", "2010"],
        [{ content: "EDAD", colSpan: 6, styles: { fontStyle: "bold", halign: "center" } }],
        [{ content: "30", colSpan: 6, styles: { halign: "center" } }],
        [{ content: "EXPEDIENTE MÉDICO", colSpan: 6, styles: { fontStyle: "bold", halign: "center" } }],
        [{ content: "12345", colSpan: 6, styles: { halign: "center" } }],
        [{ content: "DIAGNÓSTICO PRINCIPAL", colSpan: 6, styles: { fontStyle: "bold", halign: "center" } }],
        [{ content: "Fiebre severa", colSpan: 6, styles: { halign: "center" } }],
        [
          { content: "TIPO DE SANGRE", colSpan: 3, styles: { fontStyle: "bold", halign: "center" } },
          { content: "ALERGIAS", colSpan: 3, styles: { fontStyle: "bold", halign: "center" } },
        ],
        [
          { content: "O+", colSpan: 3, styles: { halign: "center" } },
          { content: "Polvo", colSpan: 3, styles: { halign: "center" } },
        ],
        [{ content: "SÍNTOMAS REPORTADOS", colSpan: 6, styles: { fontStyle: "bold", halign: "center" } }],
        [{ content: "Dolor generalizado", colSpan: 6, styles: { halign: "center" } }],
        [
          { content: "ANTECEDENTES MÉDICOS", colSpan: 3, styles: { fontStyle: "bold", halign: "center" } },
          { content: "CONDICIONES PREEXISTENTES", colSpan: 3, styles: { fontStyle: "bold", halign: "center" } },
        ],
        [
          { content: "Tiene VIH", colSpan: 3, styles: { halign: "center" } },
          { content: "Dolor de cabeza", colSpan: 3, styles: { halign: "center" } },
        ],
        [{ content: "PLAN DE TRATAMIENTO INICIAL", colSpan: 6, styles: { fontStyle: "bold", halign: "center" } }],
        [{ content: "Medicamentos y observación", colSpan: 6, styles: { halign: "center" } }],
      ],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2, valign: "middle" },
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
            <td colSpan="6">Edgar Josias</td>
          </tr>
          <tr>
            <th>FECHA DE INGRESO</th>
            <th className="center">DÍA</th>
            <th className="center">MES</th>
            <th className="center">AÑO</th>
            <th colSpan="2" className="center">
              SEXO
            </th>
          </tr>
          <tr>
            <td>s</td>
            <td className="center">02</td>
            <td className="center">10</td>
            <td className="center">2010</td>
            <td colSpan="2" className="center">
              HUECO
            </td>
          </tr>
          <tr>
            <th colSpan="6">EDAD</th>
          </tr>
          <tr>
            <td colSpan="6">30</td>
          </tr>
          <tr>
            <th colSpan="6">EXPEDIENTE MÉDICO</th>
          </tr>
          <tr>
            <td colSpan="6">12345</td>
          </tr>
          <tr>
            <th colSpan="6">DIAGNÓSTICO PRINCIPAL</th>
          </tr>
          <tr>
            <td colSpan="6">Fiebre severa</td>
          </tr>
          <tr>
            <th colSpan="3">TIPO DE SANGRE</th>
            <th colSpan="3">ALERGIAS</th>
          </tr>
          <tr>
            <td colSpan="3">O+</td>
            <td colSpan="3">Polvo</td>
          </tr>
          <tr>
            <th colSpan="6">SÍNTOMAS REPORTADOS</th>
          </tr>
          <tr>
            <td colSpan="6">duele todo</td>
          </tr>
          <tr>
            <th colSpan="3">ANTECEDENTES MÉDICOS</th>
            <th colSpan="3">CONDICIONES PREEXISTENTES</th>
          </tr>
          <tr>
            <td colSpan="3">Tiene VIH</td>
            <td colSpan="3">Dolor de cabeza</td>
          </tr>
          <tr>
            <th colSpan="6">PLAN DE TRATAMIENTO INICIAL</th>
          </tr>
          <tr>
            <td colSpan="6">todo</td>
          </tr>
        </tbody>
      </motion.table>

      {/* Botones con animaciones */}
      <motion.div className="buttons d-flex justify-content-between mt-4" variants={buttonVariants}>
        <div className="d-flex gap-3">
          <button className="btn btn-danger">Dar de Alta</button>
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
