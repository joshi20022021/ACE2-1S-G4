import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Ventanas/Login'; 
import Principal from './Ventanas/Principal'; 
import Ficha from './Ventanas/Ficha';
import SignosVitales from './Ventanas/SignosVitales';
import Formulario from './Ventanas/Formulario';




const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
      <Route path="/ficha" element={<Ficha />} />
      <Route path="/Signos" element={<SignosVitales />} />
      <Route path="/Formulario" element={<Formulario />} />
    </Routes>
  </Router>
);

export default AppRouter;
