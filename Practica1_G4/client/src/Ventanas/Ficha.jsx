import '../App.css'; 


const Ficha = () => {
  return (
    <div className="container">
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
            <th colSpan="6">
              EDAD 
            </th>
          </tr>
          <tr>
            <td colSpan="6">30</td>
          </tr>

          
          <tr>
            <th colSpan="6">
              EXPEDIENTE MEDICO 
            </th>
          </tr>
          <tr>
            <td colSpan="6">12345</td>
          </tr>

          
          <tr>
            <th colSpan="6">DIAGNOSTICO PRINCIPAL</th>
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
            <th colSpan="6">
              SINTOMAS REPORTADOS 
            </th>
          </tr>
          <tr>
            <td colSpan="6">
              le dolia el qlo cuando entro
            </td>
          </tr>

          
          <tr>
            <th colSpan="3">ANTECEDENTES MEDICOS</th>
            <th colSpan="3">
              CONDICIONES PREEXISTENTES 
            </th>
          </tr>
          <tr>
            <td colSpan="3">tiene sida</td>
            <td colSpan="3">dolor de qlo</td>
          </tr>

          
          <tr>
            <th colSpan="6">
              PLAN DE TRATAMIENTO INICIAL
            </th>
          </tr>
          <tr>
            <td colSpan="6">meterle el dedo hasta que llore</td>
          </tr>
        </tbody>
      </table>

      {}
      <div className="buttons">
        <button className="btn">Dar de Alta</button>
        <button className="btn">Reporte PDF</button>
      </div>

      {}
      <style jsx>{`
        .
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
          background-color:rgba(0, 0, 0, 0.57);
         
        }
        th {
          background-color:rgb(0, 0, 0);
          font-weight: bold;
          text-align: left;
        }
        .title {
          font-size: 18px;
          text-transform: uppercase;
          text-align: center;
          font-weight: bold;
          color: #fff;
          background-color:rgb(6, 19, 31);
          padding: 10px 0;
          border: none !important;
        }
        .center {
          text-align: center;
        }
        .buttons {
          text-align: right;
          margin-top: 20px;
        }
        .btn: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '150px',
    backgroundColor: '0 4px 8px rgba(72, 8, 8, 0.94)',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.94)',
    transition: 'all 0.3s ease',
  }
        .btn:hover {
          background-color:rgb(32, 7, 7);
        }
      `}</style>
    </div>
  );
};

export default Ficha;
