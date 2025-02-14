package gt.edu.usac.ingenieria.MediTrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import com.fazecast.jSerialComm.SerialPort;


import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@SpringBootApplication
@RestController

@CrossOrigin(origins = "*")


public class MediTrackApplication {

	private static SerialPort serialPort;
	private static String ultimoDato = ".";

	private static int ecg = 0;
	private static float foto = 0;
	private static boolean rfid = false;

	public static void main(String[] args) {
		SpringApplication.run(MediTrackApplication.class, args);

		detectPorts();

		new Thread(MediTrackApplication::readDataFromArduino).start();
	}

	private static void detectPorts() {
		SerialPort[] puertosDisponibles = SerialPort.getCommPorts();

		if (puertosDisponibles.length == 0) {
			System.out.println("❌ No se encontraron puertos COM disponibles.");
			return;
		}

		System.out.println("🔍 Puertos disponibles:");
		for (int i = 0; i < puertosDisponibles.length; i++) {
			System.out.println("📌 [" + i + "] " + puertosDisponibles[i].getSystemPortName() + " - " + puertosDisponibles[i].getDescriptivePortName());
		}

		// Seleccionar el primer puerto disponible
		serialPort = puertosDisponibles[0];  // Antes estaba en el índice 5, ahora toma el primero disponible.

		// Configuración del puerto serial
		serialPort.setBaudRate(9600);
		serialPort.setNumDataBits(8);
		serialPort.setNumStopBits(1);
		serialPort.setParity(SerialPort.NO_PARITY);

		if (serialPort.openPort()) {
			System.out.println("✅ Conectado al puerto: " + serialPort.getSystemPortName());
		} else {
			System.out.println("❌ Error al abrir el puerto serial.");
		}
	}

	private static void unpackageDataFromArduino() {
		// "10 0.78 0 | 1"
		System.out.println(ultimoDato);
		/* 
			if (ultimoDato == null || ultimoDato.trim().isEmpty() || ultimoDato.equals(".")) {
				System.out.println("⚠ [DEBUG] Dato vacío o inválido recibido. Ignorando...");
				return;
			}
	
			// System.out.println("✅ [DEBUG] Procesando dato: " + ultimoDato);
	
			String[] sensores = ultimoDato.trim().split(":"); // Divide por cualquier cantidad de espacios
	
			if (sensores.length < 2) {
				System.out.println("❌ [ERROR] Formato incorrecto. Se esperaban 3 valores, pero llegaron: " + sensores.length);
				return;
			}

	
			try {
				//ecg = Integer.parseInt(sensores[0]);
				//System.out.println("hola1");
				//foto = Float.parseFloat(sensores[1]);
				//System.out.println("hola2");
				System.out.println(sensores[1]);
				rfid = !sensores[0].equals("0");
	
				// System.out.println("✅ Datos desempaquetados correctamente -> ECG: " + ecg + ", Foto: " + foto + ", RFID: " + rfid);
			} catch (NumberFormatException e) {
				System.out.println("❌ [ERROR] Error al convertir datos: " + e.getMessage());
			}
			*/
		}

	private static void readDataFromArduino() {
		if (serialPort == null || !serialPort.isOpen()) {
			System.out.println("⚠ No hay un puerto serial abierto.");
			return;
		}

		System.out.println("✅ Iniciando lectura de datos desde Arduino...");

		try {
			// variable = input(esta cosa)
			serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 0, 0);
			InputStream inputStream = serialPort.getInputStream();
			// input stream >> teclad

			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

			while (true) {
				String datoRecibido = reader.readLine();  // Leer una línea completa
				if (datoRecibido == null || datoRecibido.trim().isEmpty()) {
					System.out.println("⚠ [DEBUG] Se recibió una línea vacía. Ignorando...");
					continue;  // Evita procesar líneas vacías
				}

				if (!datoRecibido.isEmpty()) {
					//System.out.println("📥 [DEBUG] Dato recibido: " + datoRecibido);
					ultimoDato = datoRecibido;  // Guardar el último dato recibido
					//System.out.println(ultimoDato);
					//System.out.println("Llego hasta aqui");
					unpackageDataFromArduino();

				}
			}
		} catch (Exception e) {
			System.out.println("❌ Error leyendo datos: " + e.getMessage());
		}
	}

	@GetMapping("/status")
	public String getStatus() {
		System.out.println("[REQUEST ARQUITECTURA 2] REQUEST");
		return "El servidor está funcionando correctamente 🚀";
	}

	@PostMapping("/team")
	public String crearUsuario(@RequestBody Map<String, Object> datos) {
		String nombre = (String) datos.get("nombre");
		String lider = (String) datos.get("lider");

		System.out.println("[INGRESO DE EQUIPO] " + nombre + " " + lider);
		enviarDatosAArduino(nombre + "," + lider);

		return "Bienvenido a Arqui 2, " + nombre;
	}

	@GetMapping("/ecg")
	public String getDatosPaciente() {
		System.out.println("[SOLICITUD] Datos del paciente enviados.");
		return String.valueOf(ecg);  // Devuelve el último dato recibido desde Arduino
	}


	@GetMapping("/get-datos-sensores")
	public Map<String, Object> getDatosSensores() {
		System.out.println("[SOLICITUD] Datos del sensores enviados.");
		// No debemos devolver el ultimo dato sino un json, con los datos empaquetados
		// sensor 1 - Fotorresistencia
		// sensor 2 - ECG
		// sensor 3 - RFID
		Map<String, Object> datosSensores = new HashMap<>();
		datosSensores.put("ecg", ecg);
		datosSensores.put("foto", foto);
		datosSensores.put("rfid", rfid);

		// devolvemos un json con los datos
		// de los sensores
		// { "ecg": int, "foto": foto, "rfid": bool }
		return datosSensores;
	}

	// Tambien podemos enviar datos al arduino
	/*
	* NOTA> BODY->  x-www-form-urlencoded
	* Key> Comando, Value> ON
	* Key> Comando, Value> OFF
	* curl -X POST "http://192...:8080/encender" -d "comando=ON"
	* curl -X POST "http://localhost:8080/encender" -d "comando=ON"
	*
	* */
	@PostMapping("/encender")
	public String enviarDatosAArduino(@RequestParam String comando) {
		if (serialPort != null && serialPort.isOpen()) {
			try {
				// ✅ Validar el comando antes de enviarlo
				if (!comando.equalsIgnoreCase("ON") && !comando.equalsIgnoreCase("OFF")) {
					return "⚠ Comando no válido. Usa 'ON' o 'OFF'.";
				}

				OutputStream outputStream = serialPort.getOutputStream();
				String mensaje = comando + "\n";  // Asegurar que el mensaje se envía con salto de línea
				outputStream.write(mensaje.getBytes(StandardCharsets.UTF_8));
				outputStream.flush();
				System.out.println("📤 Mensaje enviado a Arduino: " + mensaje);
				return "✅ Mensaje enviado a Arduino: " + mensaje;
			} catch (Exception e) {
				e.printStackTrace();
				return "❌ Error enviando datos: " + e.getMessage();
			}
		} else {
			return "⚠ El puerto serial no está abierto.";
		}
	}


}
