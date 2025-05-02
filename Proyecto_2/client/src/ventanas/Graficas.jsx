import React from 'react';
import Sketch from 'react-p5';
import { useNavigate } from 'react-router-dom';
import './Graficas.css';

const Graficas = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/Principal');
  };

  // ==================== VARIABLES ====================
  const CalidadDeAire = 10;
  const IntensidadLuminosa = 90;
  const TierraHumeda  = 100;

  // ==================== COMPONENTES ====================

  const CalidadDeAireVisualizacion = () => {
    let particulas = [];
  
    const setup = (p5, canvasParentRef) => {
      const canvas = p5.createCanvas(800, 400).parent(canvasParentRef);
      canvas.style('border-radius', '10px');
      
      // Crear partículas
      for (let i = 0; i < 50; i++) {
        particulas.push({
          x: p5.random(p5.width),
          y: p5.random(p5.height),
          size: p5.random(5, 15),
          speed: p5.random(0.5, 2)
        });
      }
    };
  
    const draw = (p5) => {
      p5.background(240);
      
     
      p5.fill(0);
      p5.textSize(20);
      p5.text("Calidad de Aire (PM2.5)", 20, 30);
      p5.textSize(16);
      p5.text(`Valor actual: ${CalidadDeAire} µg/m³`, 20, 60);
      
    
      const barWidth = p5.width - 100;
      const barHeight = 40;
      const barX = 50;
      const barY = 100;
      
      
      p5.fill(220);
      p5.rect(barX, barY, barWidth, barHeight, 5);
      
      
      const qualityWidth = p5.map(Math.min(CalidadDeAire, 100), 0, 100, 0, barWidth);
      const barColor = p5.map(CalidadDeAire, 0, 100, p5.color(0, 255, 0), p5.color(255, 0, 0));
      p5.fill(barColor);
      p5.rect(barX, barY, qualityWidth, barHeight, 5);
      
      
      p5.textSize(12);
      p5.fill(0);
      p5.text("0", barX - 10, barY + barHeight + 15);
      p5.text("50", barX + barWidth/2 - 10, barY + barHeight + 15);
      p5.text("100+", barX + barWidth - 25, barY + barHeight + 15);
      
      // Etiqueta de calidad
      p5.textSize(18);
      if (CalidadDeAire <= 12) {
        p5.fill(0, 150, 0);
        p5.text("Calidad: Buena", barX + barWidth/2 - 50, barY - 20);
      } else if (CalidadDeAire <= 35) {
        p5.fill(150, 150, 0);
        p5.text("Calidad: Moderada", barX + barWidth/2 - 60, barY - 20);
      } else if (CalidadDeAire <= 55) {
        p5.fill(255, 150, 0);
        p5.text("Calidad: Dañina para grupos sensibles", barX + barWidth/2 - 140, barY - 20);
      } else if (CalidadDeAire <= 150) {
        p5.fill(255, 0, 0);
        p5.text("Calidad: Dañina para la salud", barX + barWidth/2 - 110, barY - 20);
      } else {
        p5.fill(150, 0, 0);
        p5.text("Calidad: Muy dañina", barX + barWidth/2 - 70, barY - 20);
      }
  
      // Partículas flotantes (efecto decorativo)
      particulas.forEach(part => {
        const alpha = p5.map(CalidadDeAire, 0, 100, 50, 200);
        
        p5.fill(100, 100, 100, alpha);
        p5.noStroke();
        p5.ellipse(part.x, part.y, part.size);
        
        part.y -= part.speed;
        if (part.y < 0) part.y = p5.height;
      });
    };
  
    return <Sketch setup={setup} draw={draw} />;
  };

  const ArbolMonitoreo = ({ percent }) => {
    let moistureLevel = 0;
    const targetLevel = p5 => p5.map(percent, 0, 100, p5.height - 20, 20);
  
    const setup = (p5, canvasParentRef) => {
      const canvas = p5.createCanvas(300, 400).parent(canvasParentRef);
      canvas.style('border-radius', '10px');
      moistureLevel = targetLevel(p5);
    };
  
    const draw = (p5) => {
      p5.background(245);
      
      // Tierra
      const groundY = 300;
      p5.fill(139, 69, 19); 
      p5.rect(0, groundY, p5.width, p5.height - groundY);
      
      // Humedad 
      moistureLevel = p5.lerp(moistureLevel, targetLevel(p5), 0.1);
      const moistureHeight = p5.map(percent, 0, 100, 0, 50);
      
      // Color respecto a la humedad
      if (percent < 30) {
        p5.fill(160, 82, 45); // Tierra muy seca
      } else if (percent < 60) {
        p5.fill(107, 142, 35); // Tierra ligeramente húmeda
      } else {
        p5.fill(70, 130, 180, 150); // Tierra húmeda 
      }
      
      p5.noStroke();
      p5.rect(0, groundY + (p5.height - groundY - moistureHeight), p5.width, moistureHeight);
      
      // maceta y bonsai
      const potX = p5.width / 2;
      const potY = groundY - 20;
      
      // Maceta
      p5.fill(180, 100, 50);
      p5.rect(potX - 40, potY - 30, 80, 30, 5); // Parte superior
      p5.rect(potX - 30, potY, 60, 20, 0, 0, 5, 5); // Parte inferior
      
      // Dibujar bonsái (cambia según humedad)
      if (percent < 30) {
        // Bonsái seco
        p5.fill(100, 70, 30);
        // Tronco
        p5.beginShape();
        p5.vertex(potX - 5, potY - 30);
        p5.vertex(potX - 10, potY - 80);
        p5.vertex(potX + 5, potY - 100);
        p5.vertex(potX + 15, potY - 70);
        p5.vertex(potX + 5, potY - 30);
        p5.endShape(p5.CLOSE);
        
        // Ramas secas
        p5.stroke(100, 70, 30);
        p5.strokeWeight(2);
        p5.line(potX - 10, potY - 80, potX - 25, potY - 90);
        p5.line(potX + 5, potY - 100, potX + 20, potY - 110);
        p5.line(potX + 15, potY - 70, potX + 30, potY - 75);
        
        // Hojas secas (pocas)
        p5.fill(150, 120, 50);
        p5.noStroke();
        p5.ellipse(potX - 25, potY - 90, 10, 5);
        p5.ellipse(potX + 20, potY - 110, 8, 4);
        p5.ellipse(potX + 30, potY - 75, 12, 6);
        
      } else if (percent < 70) {
        // Bonsái normal
        p5.fill(120, 80, 40);
        // Tronco
        p5.beginShape();
        p5.vertex(potX - 5, potY - 30);
        p5.vertex(potX - 10, potY - 100);
        p5.vertex(potX + 5, potY - 120);
        p5.vertex(potX + 15, potY - 90);
        p5.vertex(potX + 5, potY - 30);
        p5.endShape(p5.CLOSE);
        
        // Ramas
        p5.stroke(120, 80, 40);
        p5.strokeWeight(3);
        p5.line(potX - 10, potY - 100, potX - 30, potY - 110);
        p5.line(potX + 5, potY - 120, potX + 25, potY - 130);
        p5.line(potX + 15, potY - 90, potX + 35, potY - 95);
        
        // Hojas
        p5.fill(50, 120, 50);
        p5.noStroke();
        p5.ellipse(potX - 30, potY - 110, 25, 15);
        p5.ellipse(potX + 25, potY - 130, 20, 12);
        p5.ellipse(potX + 35, potY - 95, 30, 18);
        p5.ellipse(potX - 5, potY - 110, 20, 12);
        p5.ellipse(potX + 10, potY - 125, 15, 10);
        
      } else {
        // Bonsái exuberante
        p5.fill(80, 50, 20);
        // Tronco
        p5.beginShape();
        p5.vertex(potX - 5, potY - 30);
        p5.vertex(potX - 15, potY - 120);
        p5.vertex(potX + 10, potY - 140);
        p5.vertex(potX + 20, potY - 110);
        p5.vertex(potX + 5, potY - 30);
        p5.endShape(p5.CLOSE);
        
        // Ramas
        p5.stroke(80, 50, 20);
        p5.strokeWeight(4);
        p5.line(potX - 15, potY - 120, potX - 40, potY - 130);
        p5.line(potX + 10, potY - 140, potX + 35, potY - 150);
        p5.line(potX + 20, potY - 110, potX + 45, potY - 115);
        p5.line(potX - 5, potY - 120, potX - 10, potY - 140);
        
        // Hojas 
        p5.fill(30, 150, 30);
        p5.noStroke();
        p5.ellipse(potX - 40, potY - 130, 35, 20);
        p5.ellipse(potX + 35, potY - 150, 30, 18);
        p5.ellipse(potX + 45, potY - 115, 40, 25);
        p5.ellipse(potX - 10, potY - 140, 25, 15);
        p5.ellipse(potX + 5, potY - 135, 30, 18);
        p5.ellipse(potX + 15, potY - 125, 25, 15);
        
        
        p5.fill(255, 200, 200);
        p5.ellipse(potX - 35, potY - 135, 5, 5);
        p5.ellipse(potX + 40, potY - 155, 5, 5);
        p5.ellipse(potX + 50, potY - 120, 5, 5);
      }
      
      
      if (percent > 60) {
        for (let i = 0; i < 3; i++) {
          p5.fill(100, 200, 255, 150);
          p5.noStroke();
          p5.ellipse(
            50 + i * 100, 
            groundY - 20 - p5.sin(p5.frameCount * 0.1 + i) * 10, 
            8, 
            12
          );
        }
      }
      
      
      p5.fill(0);
      p5.textSize(24);
      p5.text(`${percent}%`, p5.width / 2 - 20, 40);
      
    
      p5.textSize(16);
      if (percent < 30) {
        p5.fill(255, 0, 0);
        p5.text("¡Necesito agua!", p5.width / 2 - 50, 70);
      } else if (percent > 70) {
        p5.fill(0, 150, 0);
        p5.text("¡Estoy feliz!", p5.width / 2 - 40, 70);
      } else {
        p5.fill(200, 150, 0);
        p5.text("Estoy bien", p5.width / 2 - 30, 70);
      }
    };
  
    return <Sketch setup={setup} draw={draw} />;
  };

  const MonitoreoIntensidadLuminosa = ({ percent }) => {
    let currentBrightness = 0;
    let particles = [];
    let lastUpdate = 0;
  
    class Particle {
      constructor(p5) {
        this.p5 = p5;
        this.reset();
        this.z = p5.random(0, 5);
      }
      
      reset() {
        this.pos = this.p5.createVector(
          this.p5.width/2 + this.p5.random(-20, 20),
          this.p5.height/2 + this.p5.random(-20, 20)
        );
        this.vel = p5.Vector.random2D().mult(this.p5.random(0.2, 1.5));
        this.life = this.p5.random(50, 150);
        this.maxLife = this.life;
        this.size = this.p5.random(2, 8);
        this.hue = this.p5.random(40, 60);
      }
      
      update() {
        this.pos.add(this.vel);
        this.life--;
        
        if (this.life <= 0 || 
            this.pos.x < 0 || this.pos.x > this.p5.width || 
            this.pos.y < 0 || this.pos.y > this.p5.height) {
          this.reset();
        }
      }
      
      display() {
        const alpha = this.p5.map(this.life, 0, this.maxLife, 0, 150);
        this.p5.fill(this.hue, 80, 90, alpha);
        this.p5.noStroke();
        this.p5.ellipse(this.pos.x, this.pos.y, this.size);
      }
    }
  
    const setup = (p5, canvasParentRef) => {
      const canvas = p5.createCanvas(300, 400).parent(canvasParentRef);
      canvas.style('border-radius', '15px');
      canvas.style('box-shadow', '0 4px 15px rgba(0,0,0,0.1)');
      p5.colorMode(p5.HSB);
      
      
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(p5));
      }
    };
  
    const draw = (p5) => {
      
      const gradient = p5.drawingContext.createLinearGradient(0, 0, 0, p5.height);
      gradient.addColorStop(0, p5.color(220, 10, 95));
      gradient.addColorStop(1, p5.color(220, 20, 85));
      p5.drawingContext.fillStyle = gradient;
      p5.drawingContext.fillRect(0, 0, p5.width, p5.height);
      
     
      currentBrightness = p5.lerp(currentBrightness, percent, 0.05);
      
      // Parámetros del foco
      const radius = p5.map(currentBrightness, 0, 100, 30, 120);
      const glow = p5.map(currentBrightness, 0, 100, 0, 100);
      const pulse = p5.sin(p5.frameCount * 0.05) * 5 * (glow/100);
      
      
      for (let r = radius * 2; r > 0; r -= 10) {
        const alpha = p5.map(r, radius * 2, 0, 10, 0);
        p5.fill(50, 70, glow, alpha / 100);
        p5.noStroke();
        p5.ellipse(p5.width / 2, p5.height / 2, r * 2 + pulse);
      }
      
      
      for (let r = radius + pulse; r > 0; r -= 5) {
        const alpha = p5.map(r, radius, 0, 80, 0);
        p5.fill(50, 90, glow, alpha / 100);
        p5.ellipse(p5.width / 2, p5.height / 2, r * 2);
      }
      
      
      p5.fill(50, 100, glow);
      p5.ellipse(p5.width / 2, p5.height / 2, radius);
      
      
      if (p5.millis() - lastUpdate > 200 && glow > 70) {
        lastUpdate = p5.millis();
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(p5));
        }
      }
      
     
      particles.forEach(part => {
        part.update();
        part.display();
      });
      
      // Limitar número de partículas
      if (particles.length > 50) {
        particles = particles.slice(particles.length - 50);
      }
      
      
      p5.noFill();
      p5.stroke(0, 0, 80);
      p5.strokeWeight(2);
      p5.rect(5, 5, p5.width - 10, p5.height - 10, 10);
      
      
      p5.fill(0);
      p5.noStroke();
      p5.textSize(24);
      p5.textStyle(p5.BOLD);
      p5.text(`${Math.round(currentBrightness)}%`, p5.width / 2 - 30, p5.height - 30);
      
    
      
      
    };
  
    return <Sketch setup={setup} draw={draw} />;
  };


  return (
    <div className="graficas-container">
      <div className="graficas-header-container">
        <h1 className="graficas-title">G R A F I C A S</h1>
        <button 
          onClick={handleReturn}
          className="graficas-return-button"
        >
          Regresar
        </button>
      </div>
      
      {/* Gráfica de Calidad de Aire */}
      <div className="graficas-chart-container">
        <h2 className="graficas-subtitle">Calidad de Aire (PM2.5)</h2>
        <div className="graficas-chart-wrapper">
          <CalidadDeAireVisualizacion />
        </div>
      </div>
      
      {/* Gráficas circulares reemplazadas */}
      <div className="graficas-pie-container">
        <div className="graficas-pie-chart">
          <h2 className="graficas-pie-title">
            Intensidad Luminosa: {IntensidadLuminosa}%
          </h2>
          <div className="graficas-chart-wrapper">
            <MonitoreoIntensidadLuminosa percent={IntensidadLuminosa} />
          </div>
        </div>
        
        <div className="graficas-pie-chart">
          <h2 className="graficas-pie-title">
            Humedad de Tierra: {TierraHumeda}%
          </h2>
          <div className="graficas-chart-wrapper">
            <ArbolMonitoreo percent={TierraHumeda} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficas;