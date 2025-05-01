import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "./FaceLogin.css";

function FaceLogin() {
    
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ message: "", type: "" });   // type: success, error, warning
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [status, setStatus] = useState("Seleccione una cámara y verifique su rostro.");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      const videoDevices = mediaDevices.filter((device) => device.kind === "videoinput");
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const captureAndSend = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    setStatus("🔍 Verificando rostro...");

    try {
      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: screenshot }),
      });
      const data = await res.json();

      if (data.name === "Desconocido") {
        setStatus("❌ Rostro no reconocido");
        setModalContent({ message: "❌ Rostro no reconocido", type: "error" });
        setShowModal(true);
      } else if (data.name === "No autorizado") {
        setStatus("⛔ Usuario no registrado");
        setModalContent({ message: "⛔ Acceso denegado: Usuario no registrado", type: "warning" });
        setShowModal(true);
      } else {
        setStatus(`✅ Bienvenido, ${data.name}`);
        setModalContent({ message: `✅ Bienvenido, ${data.name}`, type: "success" });
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/Principal", { state: { user: data.name } });
        }, 2000);
      }
      
      
      
      
    } catch (err) {
      console.error(err);
      setStatus("❌ Error al verificar el rostro.");
    }
  };

  return (
    <div className="facelogin-container">
        {showModal && (
        <div className="facelogin-modal-overlay">
            <div className={`facelogin-modal ${modalContent.type}`}>
            <p>{modalContent.message}</p>
            {modalContent.type !== "success" && (
                <button onClick={() => setShowModal(false)}>Cerrar</button>
            )}
            </div>
        </div>
        )}

  
      <div className="facelogin-card">
        <h1>🔐 Reconocimiento Facial</h1>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId: selectedDeviceId }}
          className="facelogin-webcam"
        />
        <select
          className="facelogin-select"
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Cámara ${index + 1}`}
            </option>
          ))}
        </select>
        <button className="facelogin-button" onClick={captureAndSend}>
          Verificar rostro
        </button>
        <p className="facelogin-status">{status}</p>
      </div>
    </div>
  );
}

export default FaceLogin;
