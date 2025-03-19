import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Ventanas/Login'; 
import Principal from './Ventanas/Principal'; 
import Ficha from './Ventanas/Ficha';
import SignosVitales from './Ventanas/SignosVitales';
import Formulario from './Ventanas/Formulario';
import ApartadoU from './Ventanas/ApartadoU';
import RegistroPaciente from './Ventanas/RegistroPaciente';
import ActualizarDatos from './Ventanas/ActualizarDatos';
import HistorialMedico from './Ventanas/HistorialMedico';
import './App.css';



const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ActualizarDatos" element={<ActualizarDatos />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/ficha" element={<Ficha />} />
      <Route path="/Signos" element={<SignosVitales />} />
      <Route path="/ApartadoU" element={<ApartadoU />} />
      <Route path="/RegistroPaciente" element={<RegistroPaciente />} />
      <Route path="/Formulario" element={<Formulario />} />
      <Route path="/HistorialMedico" element={<HistorialMedico />} />
    </Routes>
  </Router>
);

export default AppRouter;
