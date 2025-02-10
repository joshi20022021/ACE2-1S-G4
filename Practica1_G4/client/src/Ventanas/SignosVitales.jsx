import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SignosVitales = () => {
  const data1 = {
    labels: Array.from({ length: 10 }, (_, i) => i),
    datasets: [
      {
        label: "Frecuencia Cardiaca (BPM)",
        data: [75, 110, 50, 70, 85, 100, 90, 80, 65, 75, 110, 50, 60, 70, 105, 80, 95, 65, 85, 70, 105, 110, 55
        ],
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
        data: [75, 110, 50, 70, 85, 100, 90, 80, 65, 75, 110, 50, 60, 70, 105, 80, 95, 65, 85, 70, 105, 110, 55
        ],
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
          stepSize: 1  
        }
      },
      y: { 
        min: -10, 
        max: 150, 
        ticks: { 
          stepSize: 10 
        } 
      },
    },
    plugins: { legend: { position: "top" } },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>S I G N O S - V I T A L E S</h2>
      <div style={styles.graphRow}>
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Frecuencia Cardiaca</h3>
          <div className="h-[500px] w-full">
            <Line data={data1} options={options} />
          </div>
        </div>

        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Presión Arterial</h3>
          <div className="h-[500px] w-full">
            <Line data={data2} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  
  title: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#fff',
    textShadow: '2px 2px 5px rgba(255, 255, 255, 0.95)',
  },
  graphRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px',
    width: 1280,
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '45%', 
    maxWidth: '600px',
    margin: '0 auto',
  },
  chartTitle: {
    fontSize: '30px',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default SignosVitales;
