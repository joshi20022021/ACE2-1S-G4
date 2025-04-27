import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Graficas.css';

ChartJS.register(...registerables);

const Graficas = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  };

  
  const createLineGradient = (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;
    
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0)');
    gradient.addColorStop(0.5, 'rgba(54, 162, 235, 0.2)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.4)');
    return gradient;
  };

  // Datos para la gráfica de linea
  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
    datasets: [
      {
        label: 'Calidad de Aire (PM2.5)',
        data: [12, 19, 3, 5, 2, 8, 15, 10],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          return createLineGradient(chart);
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 4,
      },
    ],
  };

  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nivel de PM2.5 (µg/m³)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses'
        }
      }
    }
  };

  // Porcentajes para cada grafíca circular
  const lightIntensityPercent = 95;
  const waterPumpPercent = 70;

  
  const createPieGradient = (ctx, colorStops) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    colorStops.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    return gradient;
  };

  const createSinglePercentageData = (percent, colorStops) => ({
    labels: ['Completado', 'Restante'],
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return [
            createPieGradient(ctx, colorStops),
            'rgba(200, 200, 200, 0.2)'
          ];
        },
        borderColor: [
          colorStops[1].color, 
          'rgba(200, 200, 200, 0.5)'
        ],
        borderWidth: 1,
      },
    ],
  });

 
  const lightIntensityGradient = [
    { offset: 0, color: 'rgba(218, 24, 24, 0.8)' },
    { offset: 1, color: 'rgba(255, 180, 50, 0.8)' }
  ];

  const waterPumpGradient = [
    { offset: 0, color: 'rgba(17, 36, 141, 0.67)' },
    { offset: 1, color: 'rgb(43, 255, 248)' }
  ];

  const percentageChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    },
    rotation: -90,
    circumference: 180,
    cutout: '70%',
  };

  return (
    <div className="graficas-container">
      <div className="graficas-header">
        <h1 className="graficas-title">G R A F I C A S</h1>
        <button 
          onClick={handleReturn}
          className="graficas-return-button"
        >
          Regresar
        </button>
      </div>
      
      {}
      <div className="graficas-chart-container">
        <h2 className="graficas-subtitle">Calidad de Aire (PM2.5)</h2>
        <div className="graficas-chart-wrapper">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
      
      {}
      <div className="graficas-pie-container">
        <div className="graficas-pie-chart">
          <h2 className="graficas-pie-title">
            Intensidad Luminosa: {lightIntensityPercent}%
          </h2>
          <div className="graficas-chart-wrapper">
            <Pie 
              data={createSinglePercentageData(lightIntensityPercent, lightIntensityGradient)} 
              options={percentageChartOptions} 
            />
          </div>
        </div>
        
        <div className="graficas-pie-chart">
          <h2 className="graficas-pie-title">
            Estado Bomba: {waterPumpPercent}%
          </h2>
          <div className="graficas-chart-wrapper">
            <Pie 
              data={createSinglePercentageData(waterPumpPercent, waterPumpGradient)} 
              options={percentageChartOptions} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficas;