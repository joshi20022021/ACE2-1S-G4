package gt.edu.usac.ingenieria.MediTrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Connection;
import java.sql.Statement;


import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.text.ParseException;
import java.util.Base64;


@SpringBootApplication
@RestController

@CrossOrigin(origins = "*")



public class MediTrackApplication {

	public static String Paciente = ".";
	public static int indicePaciente = 0;
	public static List<Map<String, Object>> pacientes = new ArrayList<>();
	public static int Tipo_Usuario = 0;

	public static void main(String[] args) {
		SpringApplication.run(MediTrackApplication.class, args);
		
		// detectPorts();

		// new Thread(MediTrackApplication::readDataFromArduino).start();
	}
	
	// Consultas Sql
	// Configuración de conexión a MySQL
	private static final String url = "jdbc:mysql://arqui-2.ciir7ihqfr2n.us-east-2.rds.amazonaws.com:3306/ACYE2";
	private static final String usuario = "ACYE2";
	private static final String contraseña = "Sucios!344"; 

    @PostMapping("/DarDeAlta")
    public String DarDeAlta(@RequestParam("idPaciente") int idPaciente,@RequestParam("fechafinal") String fechafinal) {

    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {

            String sqlActualizarAlta = "UPDATE Pacientes SET Estado = 'Alta', Fecha_final = ? WHERE id = ?";
    
            try (PreparedStatement stmt = conn.prepareStatement(sqlActualizarAlta)) {
                stmt.setString(1, fechafinal);
                stmt.setInt(2, idPaciente);
                int filas = stmt.executeUpdate();
    
                return filas > 0 ? "Cambio exitoso" : "No se encontró el registro";
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error al ejecutar la actualización";
        }
    }

    @PostMapping("/DarDeAltaDiagnostico")
    public String darDeAltaDiagnostico(@RequestParam("idPaciente") int idPaciente,@RequestParam("idDiagnostico") int idDiagnostico) {
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {
            String sqlActualizarDiagnostico = """
                UPDATE Diagnósticos
                SET Estado = 'Alta'
                WHERE id = ? AND Pacientes_id = ?
            """;
    
            try (PreparedStatement stmt = conn.prepareStatement(sqlActualizarDiagnostico)) {
                stmt.setInt(1, idDiagnostico);
                stmt.setInt(2, idPaciente);
    
                int filas = stmt.executeUpdate();
    
                return filas > 0 ? "Diagnóstico dado de alta exitosamente" : "No se encontró coincidencia con esos IDs";
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error al ejecutar la actualización de diagnóstico";
        }
    }

    
    @PostMapping("/IdDiagnosticosPaciente")
    public List<Integer> obtenerIdDiagnosticos(@RequestParam("idPaciente") int idPaciente) {
        List<Integer> ids = new ArrayList<>();
    
        String sql = "SELECT id FROM Diagnósticos WHERE Pacientes_id = ?"; // Obtenemos todos los diagnósticos del paciente
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
    
            stmt.setInt(1, idPaciente);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    ids.add(rs.getInt("id")); // guardamos los id en una lista
                }
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return ids;
    }

	@GetMapping("/GetPacientes")
	public List<String> obtenerNombresPacientes() {
        List<String> nombres = new ArrayList<>();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
                 PreparedStatement pstmt = conn.prepareStatement("SELECT Nombre_Completo FROM Pacientes");
                 ResultSet rs = pstmt.executeQuery()) {

                // Agregar los nombres a la lista
                while (rs.next()) {
                    nombres.add(rs.getString("Nombre_Completo"));
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

	@PostMapping(value = "/guardarPaciente", consumes = "multipart/form-data")
    public ResponseEntity<Void> guardarPaciente(
        @RequestParam("nombres") String nombres,
        @RequestParam("edad") int edad,
        @RequestParam("sexo") String sexo,
        @RequestParam("expediente") String expediente,
        @RequestParam("tipoSangre") String tipoSangre,
        @RequestParam("fechaIngreso") String fechaIngreso,
        @RequestParam("fotografia") MultipartFile fotografia
    ) {
        String sql = "INSERT INTO Pacientes (Nombre_Completo, edad, Sexo, No_Exp_Med, Tipo_Sangre, Fotografía, Fecha, Usuarios_id, Camilla_id,Estado, Fecha_final) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";

        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
         PreparedStatement Contenedor = conn.prepareStatement(sql)) {

            Contenedor.setString(1, nombres);
            Contenedor.setInt(2, edad);
            Contenedor.setString(3, sexo);
            Contenedor.setString(4, expediente);
            Contenedor.setString(5, tipoSangre);
            Contenedor.setBytes(6, fotografia.getBytes());
            Contenedor.setString(7, fechaIngreso);
            Contenedor.setString(8, String.valueOf(Tipo_Usuario)); // tu variable global
            Contenedor.setString(9, "1"); // camilla fija o lo que uses
            Contenedor.setString(10, "proceso"); // camilla fija o lo que uses
            Contenedor.setString(11, fechaIngreso);

		    // Pasamos el arreglo de condiciones a cadena
            /*Object condicionesObj = datosPaciente.get("condiciones");
            String condicionesStr = condicionesObj instanceof Iterable ? String.join(",", (Iterable<String>) condicionesObj): condicionesObj.toString();
            
            Contenedor.setString(12, condicionesStr);
            */
            Contenedor.executeUpdate();

            System.out.println("Paciente guardado correctamente");
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

	@PostMapping("/AsignarCamilla")
    public ResponseEntity<String> asignarCamilla(
        @RequestParam("idPaciente") int idPaciente,
        @RequestParam("idCamilla") int idCamilla
    ) {
        String sql = "UPDATE Pacientes SET Camilla_id = ? WHERE id = ?";
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
    
            stmt.setInt(1, idCamilla);
            stmt.setInt(2, idPaciente);
    
            int Afectados = stmt.executeUpdate();
    
            if (Afectados > 0) {
                System.out.println("Camilla "+idCamilla+" asignada correctamente a " + idPaciente);
                return ResponseEntity.ok("Camilla "+idCamilla+" asignada correctamente a " + idPaciente);
            } else {
                System.out.println("⚠ No se encontró al paciente: " + idPaciente);
                return ResponseEntity.status(404).body("Paciente no encontrado.");
            }
    
        } catch (SQLException e) {
            System.out.println("Error al asignar camilla.");
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al asignar camilla.");
        }
    }


	@PostMapping("/guardarDiagnostico")
    public ResponseEntity<String> guardarDiagnostico(
            @RequestParam("pacienteId") int pacienteId,
            @RequestParam("diagnosticoPrincipal") String diagnosticoPrincipal,
            @RequestParam("sintomas") String sintomas,
            @RequestParam("antecedentes") String antecedentes,
            @RequestParam("condiciones") String condiciones,
            @RequestParam("alergias") String alergias,
            @RequestParam("tratamiento") String tratamiento,
            @RequestParam("observaciones") String observaciones,
            @RequestParam("recomendaciones") String recomendaciones, 
    		@RequestParam("fechaIngreso") String fechaIngreso
    ) {
        // variavles para min, max, promedio de ecg y oximetria
        int minECG = 0, maxECG = 0;
        double promECG = 0;
        int minOxi = 0, maxOxi = 0;
        double promOxi = 0;
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {
    
            // Estadística de signos vitales
            String sqlEstadisticas = """
                SELECT 
                    MIN(Frecuencia_Cardiaca) AS minECG,
                    MAX(Frecuencia_Cardiaca) AS maxECG,
                    AVG(Frecuencia_Cardiaca) AS promECG,
                    MIN(Oxigenacion)       AS minOxi,
                    MAX(Oxigenacion)       AS maxOxi,
                    AVG(Oxigenacion)       AS promOxi
                FROM Signos_Vitales
                WHERE Diagnósticos_id = (
                    SELECT MAX(id) FROM Diagnósticos_id
                )
            """;
    
            try (PreparedStatement psEst = conn.prepareStatement(sqlEstadisticas);
                 ResultSet rs = psEst.executeQuery()) {
    
                if (rs.next()) {
    				// Obtenemos valores despues de la consulta
                    minECG = rs.getInt("minECG");
                    maxECG = rs.getInt("maxECG");
                    promECG = rs.getDouble("promECG");
                    minOxi = rs.getInt("minOxi");
                    maxOxi = rs.getInt("maxOxi");
                    promOxi = rs.getDouble("promOxi");
                }
            }
    
            // b) Insertar registro en Diagnósticos
            //    Ajusta los campos y tipos según tus columnas
            String sqlInsert = """
                INSERT INTO Diagnósticos
                (
                  Diagnostico_Principal,
                  Sintomas_Reportados,
                  Antecedentes,
                  Condiciones,
                  Alergias,
                  Tratamiento,
                  Observaciones,
                  Recomendaciones,
    			  
                  Minimo_ECG,
                  Maximo_ECG,
                  Promedio_ECG,
                  Minimo,
                  Maximo,
                  Promedio,
                  Pacientes_id,
                  Fecha,
                  Fecha_final,
				  Estado
                )
                VALUES
                (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,'proceso')
            """;
            try (PreparedStatement psIns = conn.prepareStatement(sqlInsert)) {
    
                psIns.setString(1, diagnosticoPrincipal);
                psIns.setString(2, sintomas);
                psIns.setString(3, antecedentes);
                psIns.setString(4, condiciones);
                psIns.setString(5, alergias);
                psIns.setString(6, tratamiento);
                psIns.setString(7, observaciones);
                psIns.setString(8, recomendaciones);
    
                // min, max, prom
                psIns.setInt(9, minECG);       
                psIns.setInt(10, maxECG);      
                psIns.setDouble(11, promECG); 
                psIns.setInt(12, minOxi);
                psIns.setInt(13, maxOxi);
                psIns.setDouble(14, promOxi);
    
                psIns.setInt(15, pacienteId);
				
				// importante destacar que a la base de datos se le resto 6 la hora de su servidor, y la hora obtenida de aqui se le restaron 18 horas
                try {
			    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date fechaOriginal = sdf.parse(fechaIngreso); // fechaIngreso viene como string
                    
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(fechaOriginal);
                    calendar.add(Calendar.HOUR_OF_DAY, -18); // Restamos 18 horas para hora guatemalteca
                    Date fechaCorregida = calendar.getTime();
                    
                    String fechaFinalCorregida = sdf.format(fechaCorregida);
    
                    psIns.setString(16, fechaFinalCorregida);
			    } catch (ParseException e) {
			    	e.printStackTrace();
			    	return ResponseEntity.status(500).body("Error al parsear la fecha: " + e.getMessage());
			    }
    
                psIns.executeUpdate();
            }
    
            /*
    		//Borrar todo de la tabla Signos_Vitales (datos temporales, puede ser opcional)
            String sqlDelete = "DELETE FROM Signos_Vitales";
            try (PreparedStatement psDel = conn.prepareStatement(sqlDelete)) {
                psDel.executeUpdate();
            }
    		*/
    
            // Retornar respuesta
            return ResponseEntity.ok("Diagnóstico guardado y Signos_Vitales limpiados.");
    
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error guardando diagnóstico: " + e.getMessage());
        }
    }


    @PostMapping("/GetHistorialPaciente")
    public Map<String, Object> obtenerPaciente(@RequestParam("idPaciente") int idPaciente) {
        Map<String, Object> respuesta = new HashMap<>();
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {
    
            // Obtenemos el paciente
            String sqlPaciente = """
                SELECT p.Nombre_Completo AS nombres,
                       p.edad           AS edad,
                       p.Sexo           AS sexo,
                       p.No_Exp_Med     AS expediente,
                       p.Tipo_Sangre    AS tipoSangre,
                       p.Fecha          AS fechaIngreso,
                       p.Fotografía     AS fotografia,
                       p.Estado         AS estado
                FROM Pacientes p
                WHERE p.id = ?
            """;
    
            try (PreparedStatement stmtPaciente = conn.prepareStatement(sqlPaciente)) {
                stmtPaciente.setInt(1, idPaciente);
                try (ResultSet rsPaciente = stmtPaciente.executeQuery()) {
                    if (rsPaciente.next()) {
                        respuesta.put("nombres",      rsPaciente.getString("nombres"));
                        respuesta.put("edad",         rsPaciente.getInt("edad"));
                        respuesta.put("sexo",         rsPaciente.getString("sexo"));
                        respuesta.put("expediente",   rsPaciente.getString("expediente"));
                        respuesta.put("tipoSangre",   rsPaciente.getString("tipoSangre"));
                        respuesta.put("fechaIngreso", rsPaciente.getString("fechaIngreso"));

                        byte[] fotoBytes = rsPaciente.getBytes("fotografia"); // formateo de la imagen
                        if (fotoBytes != null && fotoBytes.length > 0) {
                            String fotoBase64 = Base64.getEncoder().encodeToString(fotoBytes);
                            respuesta.put("foto", fotoBase64);
                        } else {
                            respuesta.put("foto", null); // o una imagen por defecto
                        }

                        respuesta.put("estado", rsPaciente.getString("estado"));

                    } else {
                        respuesta.put("error", "No se encontró el paciente con id: " + idPaciente);
                        return respuesta;
                    }
                }
            }
    
            // obtenemos los diagnósticos del paciente
            String sqlDiagnosticos = """
                SELECT d.Diagnostico_Principal AS diagnostico,
                       d.Sintomas_Reportados   AS sintomas,
                       d.Condiciones           AS condiciones,
                       d.Antecedentes          AS antecedentes,
                       d.Tratamiento           AS tratamiento,
                       d.Alergias             AS alergias,
                       d.Condiciones          AS condiciones,
                       d.Estado               AS estado,
                       d.Fecha               AS fecha,
                       d.Fecha_final         AS fechafinal,
                       d.Observaciones       AS observaciones,
                       d.Recomendaciones     AS recomendaciones,

                       d.Minimo              AS minimoO,
                       d.Maximo              AS maximoO,
                       d.Promedio            AS promedioO,
                       d.Minimo_ECG           AS minimoE,
                       d.Maximo_ECG           AS maximoE,
                       d.Promedio_ECG         AS promedioE
                FROM Diagnósticos d
                WHERE d.Pacientes_id = ?
            """;
    
            try (PreparedStatement stmtDiag = conn.prepareStatement(sqlDiagnosticos)) {
                stmtDiag.setInt(1, idPaciente);
                try (ResultSet rsDiag = stmtDiag.executeQuery()) {
    
                    List<Map<String, Object>> listaDiagnosticos = new ArrayList<>();
    
                    while (rsDiag.next()) {
                        Map<String, Object> diag = new HashMap<>();
                        diag.put("diagnostico",  rsDiag.getString("diagnostico"));
                        diag.put("sintomas",     rsDiag.getString("sintomas"));
                        diag.put("condiciones",     rsDiag.getString("condiciones"));
                        diag.put("antecedentes", rsDiag.getString("antecedentes"));
                        diag.put("tratamiento",  rsDiag.getString("tratamiento"));
                        diag.put("alergias",     rsDiag.getString("alergias"));
                        diag.put("estado",     rsDiag.getString("estado"));
                        diag.put("fecha",     rsDiag.getString("fecha"));
                        diag.put("fechafinal",     rsDiag.getString("fechafinal"));
                        diag.put("observaciones",     rsDiag.getString("observaciones"));
                        diag.put("recomendaciones",     rsDiag.getString("recomendaciones"));
                        // valores de gráficas
                        diag.put("minimoO",     String.valueOf(rsDiag.getInt("minimoO")));
                        diag.put("maximoO",     String.valueOf(rsDiag.getInt("maximoO")));
                        diag.put("promedioO",   String.valueOf(rsDiag.getInt("promedioO")));
                        diag.put("minimoE",     String.valueOf(rsDiag.getInt("minimoE")));
                        diag.put("maximoE",     String.valueOf(rsDiag.getInt("maximoE")));
                        diag.put("promedioE",   String.valueOf(rsDiag.getInt("promedioE")));

                        listaDiagnosticos.add(diag);
                    }
    
                    // Se agrega la lista de diagnósticos al Map de respuesta
                    respuesta.put("diagnosticos", listaDiagnosticos);
                }
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
            respuesta.put("error", "Ocurrió un error al consultar la base de datos.");
        }
    
        return respuesta;
    }
    
    
    @GetMapping("/AccesoUsuario")
    public int AccesoUsuario() {
        int resultado = 0;
    
        String selectSql = """
            SELECT u.id, u.UID AS uid_usuario, v.id AS verificacion_id, v.UID AS uid_verificacion
            FROM Usuarios u
            JOIN Verificaciones v ON u.id = v.Usuarios_id
        """;
    
        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña);
            PreparedStatement stmt = conn.prepareStatement(selectSql);
            ResultSet rs = stmt.executeQuery()) {
    
            List<Integer> idsVerificacionesCoincidentes = new ArrayList<>();
    
            while (rs.next()) {

                // Usuarios
                int id = rs.getInt("id"); // id de usuarios
                String uidUsuario = rs.getString("uid_usuario");

                // verificaciones
                String uidVerificacion = rs.getString("uid_verificacion");
                int idVerificacion = rs.getInt("verificacion_id");
    
                if (uidUsuario != null && uidUsuario.equals(uidVerificacion)) {
                    resultado = id; // id coincidente
                }
                idsVerificacionesCoincidentes.add(idVerificacion); // guardamos id de Verificaciones
            }
    
            try (Statement truncateStmt = conn.createStatement()) {
                truncateStmt.execute("SET FOREIGN_KEY_CHECKS = 0");
                truncateStmt.execute("TRUNCATE TABLE Verificaciones");
                truncateStmt.execute("SET FOREIGN_KEY_CHECKS = 1");
            }
    
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return resultado;
    }
    

}

/*
 * A3 B5 18 96 --> Tarjeta
 * E0 23 46 10 --> Llavero
 */