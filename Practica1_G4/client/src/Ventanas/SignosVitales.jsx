import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion"; // Importar motion desde framer-motion
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
    aspectRatio: 1.5, // Controla la relación de aspecto
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

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
  };

  return (
    <motion.div
      className="container mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-center text-light display-4 mb-5"
        variants={cardVariants}
      >
        S I G N O S - V I T A L E S
      </motion.h2>

      <div className="row justify-content-center gx-5 gy-4">
        <motion.div
          className="col-12 col-md-8 col-lg-6"
          variants={cardVariants}
        >
          <div className="chart-card">
            <h3 className="text-center">Frecuencia Cardiaca</h3>
            <div className="chart-container">
              <Line data={data1} options={options} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-12 col-md-8 col-lg-6"
          variants={cardVariants}
        >
          <div className="chart-card">
            <h3 className="text-center">Presión Arterial</h3>
            <div className="chart-container">
              <Line data={data2} options={options} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-4"
        variants={buttonVariants}
      >
        <button
          className="btn btn-primary"
          onClick={() => navigate("/principal")}
        >
          Regresar al Menú Principal
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SignosVitales;