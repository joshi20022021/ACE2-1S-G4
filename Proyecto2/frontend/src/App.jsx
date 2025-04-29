import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./ventanas/Principal";
import Graficas from "./ventanas/Graficas";
import Habitaciones from "./ventanas/Habitaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/graficas" element={<Graficas />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
      </Routes>
    </Router>
  );
}

export default App;