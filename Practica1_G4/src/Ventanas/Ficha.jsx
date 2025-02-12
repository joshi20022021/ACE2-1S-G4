import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ficha = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Activar la animación después de que el componente se monte
    setIsVisible(true);
  }, []);

  return (
    <div className={`container ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <table>
        <tbody>
          <tr>
            <td className="title" colSpan="6">
              FICHA DE IDENTIFICACIÓN DEL PACIENTE
            </td>
          </tr>

          <tr>
            <th>APELLIDO PATERNO</th>
            <th>APELLIDO MATERNO</th>
            <th colSpan="4">NOMBRE(S)</th>
          </tr>
          <tr>
            <td>carta agena</td>
            <td>Alvizures</td>
            <td colSpan="4">Edgar josias</td>
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
            <td></td>
            <td className="center">02</td>
            <td className="center"></td>
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
            <td colSpan="6">le dolia el qlo cuando entro</td>
          </tr>

          <tr>
            <th colSpan="3">ANTECEDENTES MÉDICOS</th>
            <th colSpan="3">CONDICIONES PREEXISTENTES</th>
          </tr>
          <tr>
            <td colSpan="3">tiene sida</td>
            <td colSpan="3">dolor de qlo</td>
          </tr>

          <tr>
            <th colSpan="6">PLAN DE TRATAMIENTO INICIAL</th>
          </tr>
          <tr>
            <td colSpan="6">meterle el dedo hasta que llore</td>
          </tr>
        </tbody>
      </table>

      {/* Botones con mejor estilo y alineación */}
      <div className="buttons d-flex justify-content-between mt-4">
        <div className="d-flex gap-3">
          <button className="btn btn-danger">Dar de Alta</button>
          <button className="btn btn-secondary">Reporte PDF</button>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/principal')}>
          Regresar a Principal
        </button>
      </div>

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
        }
        th,
        td {
          border: 1px solid #ccc;
          padding: 6px 10px;
          vertical-align: middle;
          background-color: rgba(0, 0, 0, 0.57);
        }
        th {
          background-color: rgb(0, 0, 0);
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
        .fade-in {
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .fade-in.visible {
          opacity: 1;
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
      `}</style>
    </div>
  );
};

export default Ficha;