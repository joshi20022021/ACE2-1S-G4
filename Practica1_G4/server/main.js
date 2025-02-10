import express from 'express';
import cors from 'cors';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ajusta "COM3" al puerto correcto 
const serial = new SerialPort({ path: 'COM4', baudRate: 9600 });

const parser = serial.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Variable para guardar el último dato recibido
let lastData = 'No data yet';

// Cuando Arduino mande datos por Serial, esto se ejecutará
parser.on('data', (data) => {
  console.log('Dato recibido desde Arduino:', data);
  lastData = data;
});

// Endpoint para consultar el último dato
app.get('/api/datos', (req, res) => {
  res.json({ dato: lastData });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'Servidor funcionando',
    puertoSerial: 'COM3'
  });
});

// Arranca el servidor
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:${port}");
});