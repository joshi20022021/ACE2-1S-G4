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

  const [data1, setData1] = useState({
    labels: Array.from({ length: 10}, (_, i) => i),
    datasets: [
      {
        label: "ECG / Frecuencia Cardiaca (BPM)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "#FF4D4D", 
        backgroundColor: "rgba(255, 77, 77, 0.2)",
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: "#FF4D4D", 
        tension: 0.01,
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: Array.from({ length: 10}, (_, i) => i),
    datasets: [
      {
        label: "Calidad del aire",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "#4D79FF",
        backgroundColor: "rgba(61, 63, 69, 0.2)",
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: "#4D79FF",
        tension: 0.01,
      },
    ],
  });



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
        min: 0,
        max: 1200,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: { legend: { position: "top" } },
  };


  const options2 = {
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
        min: 0,
        max: 700,
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

  useEffect(() => {
    setFadeIn(true);

    const intervalId = setInterval(() => {
      fetch("http://localhost:8080/get-datos-sensores")
        .then((res) => res.json())
        .then((data) => {
          // data tiene la forma: { oxigeno: number, ecg: number }
          // Actualizamos data1 (ECG/Frecuencia cardiaca)
          setData1((prev) => {
            const newLabels = [...prev.labels];
            const newEcgData = [...prev.datasets[0].data];

            // El siguiente label será el último + 1
            const nextLabel = newLabels[newLabels.length - 1] + 1;

            // Agregamos nuevo valor
            newLabels.push(nextLabel);
            newEcgData.push(data.ecg);

            // Control para no crecer indefinidamente, por ej. límite 30 puntos
            if (newLabels.length > 30) {
              newLabels.shift();
              newEcgData.shift();
            }

            return {
              ...prev,
              labels: newLabels,
              datasets: [
                {
                  ...prev.datasets[0],
                  data: newEcgData,
                },
              ],
            };
          });

          // Actualizamos data2 (Oxígeno)
          setData2((prev) => {
            const newLabels = [...prev.labels];
            const newOxData = [...prev.datasets[0].data];

            const nextLabel = newLabels[newLabels.length - 1] + 1;

            // Agregamos nuevo valor
            newLabels.push(nextLabel);
            newOxData.push(data.oxigeno);

            // Limitar el tamaño del array
            if (newLabels.length > 30) {
              newLabels.shift();
              newOxData.shift();
            }

            return {
              ...prev,
              labels: newLabels,
              datasets: [
                {
                  ...prev.datasets[0],
                  data: newOxData,
                },
              ],
            };
          });
        })
        .catch((error) => {
          console.error("Error al obtener signos vitales:", error);
        });
    }, 500);

    // Cuando el componente se desmonte, limpiar el intervalo
    return () => clearInterval(intervalId);
  }, []);



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
            <h3 className="text-center">Calidad del Aire</h3>
            <div className="chart-container">
              <Line data={data2} options={options2} />
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