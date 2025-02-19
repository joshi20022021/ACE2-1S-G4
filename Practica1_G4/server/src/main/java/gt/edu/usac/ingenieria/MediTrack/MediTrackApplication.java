package gt.edu.usac.ingenieria.MediTrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fazecast.jSerialComm.SerialPort;
import java.sql.Connection;


import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController

@CrossOrigin(origins = "*")




public class MediTrackApplication {

	private static SerialPort serialPort;
	private static String ultimoDato = ".";

	private static int ecg = 0;
	private static float foto = 0;
	public static String Paciente = ".";
	private static boolean rfid = false;
	public static int indicePaciente = 0;
	public static List<Map<String, Object>> pacientes = new ArrayList<>();

	public static void main(String[] args) {
		SpringApplication.run(MediTrackApplication.class, args);

		detectPorts();

		new Thread(MediTrackApplication::readDataFromArduino).start();
	}

	// Métodos de arduino
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
		serialPort = puertosDisponibles[puertosDisponibles.length-1];  // Antes estaba en el índice 5, ahora toma el primero disponible.

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
		if (ultimoDato == null || ultimoDato.trim().isEmpty() || ultimoDato.equals(".")) {
			System.out.println("⚠ [DEBUG] Dato vacío o inválido recibido. Ignorando...");
			rfid = false;
			return;
		}

		// System.out.println("✅ [DEBUG] Procesando dato: " + ultimoDato);

		String[] sensores = ultimoDato.trim().split(":"); // Divide por cualquier cantidad de espacios

		if (sensores.length != 2) {
			System.out.println("❌ [ERROR] Formato incorrecto. Se esperaban 3 valores, pero llegaron: " + sensores.length);
			return;
		}



		try {
            switch (sensores[0]) {
                case "ecg" -> ecg = Integer.parseInt(sensores[1]);
                case "foto" -> foto = Float.parseFloat(sensores[1]);
                case "UID" -> rfid = sensores[1].trim().equals("E0 23 46 10"); // Medico
				case "Paciente" -> indicePaciente = Integer.parseInt(sensores[1].trim());
            }
			System.out.println(rfid);
			System.out.println(sensores[1]);

			// System.out.println("✅ Datos desempaquetados correctamente -> ECG: " + ecg + ", Foto: " + foto + ", RFID: " + rfid);
		} catch (NumberFormatException e) {
			System.out.println("❌ [ERROR] Error al convertir datos: " + e.getMessage());
		}

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


	// 	Endpoint
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
    
	@GetMapping("/Acceso_Form")
	public boolean Acceso_Form(){
		return rfid;
	}
	
	@GetMapping("/Bloqueo_Acceso")
	public boolean Bloqueo_Acceso(){
		rfid = !rfid;
		return rfid;
	}


	// Configuración de conexión a MySQL
    private static final String url = "jdbc:mysql://arqui-2.ciir7ihqfr2n.us-east-2.rds.amazonaws.com:3306/ACYE2";
    private static final String usuario = "ACYE2";
    private static final String contraseña = "Sucios!344"; // Reemplazar con la contraseña real

    @PostMapping("/guardarPaciente")
    public ResponseEntity<String> guardarPaciente(@RequestBody Map<String, Object> datosPaciente) {
        try {
            if (datosPaciente == null || datosPaciente.isEmpty()) {
                return ResponseEntity.badRequest().body("El cuerpo de la solicitud está vacío o es inválido.");
            }
            pacientes.add(datosPaciente);
			int indicePaciente = pacientes.size() - 1; // Último índice agregado

            enviarDatosAlArduino(indicePaciente);
			return ResponseEntity.ok("Paciente guardado exitosamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error interno del servidor al guardar el paciente.");
        }
    }

	@GetMapping("/GetPacientes")
	public List<String> obtenerNombresPacientes() {
        List<String> nombres = new ArrayList<>();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
                 PreparedStatement pstmt = conn.prepareStatement("SELECT nombres FROM pacientes");
                 ResultSet rs = pstmt.executeQuery()) {

                // Agregar los nombres a la lista
                while (rs.next()) {
                    nombres.add(rs.getString("nombres"));
                }
            }
        } catch (ClassNotFoundException e) {
            System.out.println("No se pudo encontrar el driver de MySQL.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Error al obtener nombres de pacientes.");
            e.printStackTrace();
        }

        return nombres;
    }

	// Datos del paciente para la ficha
	@PostMapping("/SeleccionarPaciente")
    public void seleccionarPaciente(@RequestBody Map<String, String> request) {
        Paciente = request.get("nombre");
        System.out.println("Paciente seleccionado: " + Paciente);
    }

	//Funciones
	public static void enviarDatosAlArduino(int indice) {
		if (serialPort == null || !serialPort.isOpen()) {
			System.out.println(" El puerto no está abierto.");
			return;
		}
		try {
			String mensaje = String.valueOf(indice);
			serialPort.getOutputStream().write(mensaje.getBytes(StandardCharsets.UTF_8));
			serialPort.getOutputStream().flush();
			System.out.println("Índice enviado correctamente: " + indice);
		} catch (Exception e) {
			System.out.println("Error enviando datos al Arduino: " + e.getMessage());
		}
	}


}

/*
 A3 B5 18 96 --> Tarjeta
 E0 23 46 10 --> Llavero

 */