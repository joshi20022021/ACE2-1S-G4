import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importar motion desde framer-motion
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const enviarUsuario = async (indice) => {
    try {
      const response = await fetch('http://localhost:8080/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          IndiceUsuario: indice,
        }),
      });
  
      if (!response.ok) throw new Error('Error en la solicitud');
  
      const tipoUsuario = await response.json(); // o .text() si es un número plano
      console.log('Respuesta del servidor:', tipoUsuario);
    } catch (error) {
      console.error('Error al enviar usuario:', error);
    }
  };
  

  const handleLogin =async (e) => {

    /*try {
      const response = await fetch("http://192.168.137.1:8080/AccesoUsuario");
      if (!response.ok) throw new Error("Error en la solicitud");
      const Medico = await response.json();
      enviarUsuario(Medico);
      if (Medico !=0) {
        toast.success("Acceso concedido, redirigiendo...");
        navigate('/principal');
      } else {
        toast.warn("Coloca la llave de acceso");
      }
    } catch (error) {
      toast.error(" Error al obtener datos");
      console.error("Error al obtener datos:", error);
    }*/

    e.preventDefault();
    
    if (email === 'Especialista@gmail.com' && password === '123456') {
      enviarUsuario(1);
      navigate('/principal');
    } else if (email === 'residente@gmail.com' && password === '123456') {
      enviarUsuario(2);
      navigate('/principal');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };
  

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <motion.div
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 style={styles.title} variants={formVariants}>
        L O G I N
      </motion.h1>
      <motion.div
        style={styles.formContainer}
        variants={formVariants}
      >
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              style={styles.input}
            />
          </div>
          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  title: {
    fontSize: '70px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#fff',
    textShadow: '2px 2px 5px rgba(255, 255, 255, 0.95)',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '18px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(235, 221, 221, 0.94)',
    transition: 'border 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    marginTop:20,
    borderRadius: '150px',
    backgroundColor: '#480808',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(235, 221, 221, 0.94)',
    transition: 'all 0.3s ease',
  },
  linkLabel: {
    display: 'block',
    marginTop: '20px',
    fontSize: '16px',
    color: '#00f',
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'center',
  }
};

export default Login;