import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./ventanas/Principal";
import Graficas from "./ventanas/Graficas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/graficas" element={<Graficas />} />
      </Routes>
    </Router>
  );
}

export default App;