import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SignosVitales = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const data1 = {
    labels: Array.from({ length: 10 }, (_, i) => i),
    datasets: [
      {
        label: "Frecuencia Cardiaca (BPM)",
        data: [75, 110, 50, 70, 85, 100, 90, 80, 65, 75, 110, 50, 60, 70, 105, 80, 95, 65, 85, 70, 105, 110, 55],
        borderColor: "#FF4D4D",
        backgroundColor: "rgba(255, 77, 77, 0.2)",
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: "#FF4D4D",
        tension: 0.01,
      },
    ],
  };

  const data2 = {
    labels: Array.from({ length: 10 }, (_, i) => i),
    datasets: [
      {
        label: "Presión Arterial (mmHg)",
        data: [75, 110, 50, 70, 85, 100, 90, 80, 65, 75, 110, 50, 60, 70, 105, 80, 95, 65, 85, 70, 105, 110, 55],
        borderColor: "#4D79FF",
        backgroundColor: "rgba(61, 63, 69, 0.2)",
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: "#4D79FF",
        tension: 0.01,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        min: -10,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: { legend: { position: "top" } },
  };

  return (
    <div className={`container mt-5 ${fadeIn ? "fade-in" : "opacity-0"}`}>
      <h2 className="text-center text-light display-4 mb-5">S I G N O S - V I T A L E S</h2>
      <div className="row justify-content-center gx-5 gy-4">
        <div className="col-md-8 col-lg-6 bg-white p-4 rounded shadow mx-3">
          <h3 className="text-center text-dark">Frecuencia Cardiaca</h3>
          <div className="chart-container" style={{ height: "500px", width: "100%" }}>
            <Line data={data1} options={options} />
          </div>
        </div>

        <div className="col-md-8 col-lg-6 bg-white p-4 rounded shadow mx-3">
          <h3 className="text-center text-dark">Presión Arterial</h3>
          <div className="chart-container" style={{ height: "500px", width: "100%" }}>
            <Line data={data2} options={options} />
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/principal")}>Regresar al Menú Principal</button>
      </div>
    </div>
  );
};

export default SignosVitales;
