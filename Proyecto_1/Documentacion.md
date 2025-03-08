# Documentación del Proyecto IoT

## Descripción de la Solución
El **Sistema de Monitoreo de Pacientes en un Hospital** es una solución basada en tecnologías IoT (Internet of Things) e IoT-As-A-Service, diseñada para mejorar la eficiencia en la atención hospitalaria mediante el monitoreo en tiempo real de los pacientes. El sistema integra sensores médicos, autenticación segura y visualización de datos en un dashboard interactivo, facilitando la toma de decisiones médicas y optimizando la gestión hospitalaria. Los sensores ECG y de oximetría instalados en las camillas recopilan información sobre los signos vitales de los pacientes y la transmiten mediante el protocolo MQTT a un backend desarrollado en Spring Boot, que procesa y almacena los datos en una base de datos relacional como PostgreSQL o MySQL. Para garantizar la seguridad y control de acceso, se utiliza autenticación mediante tarjetas RFID, permitiendo diferenciar roles entre residentes y especialistas, donde los primeros solo pueden visualizar datos y llenar formularios, mientras que los especialistas pueden realizar diagnósticos y dar de alta a los pacientes. La información recopilada se visualiza en un dashboard web desarrollado con HTML, CSS y JavaScript, y se complementa con paneles interactivos en Grafana, mostrando métricas en tiempo real como ocupación de camillas, estadísticas de signos vitales y alertas de valores críticos. Además, el sistema permite la generación automática de reportes PDF con el historial médico y certificados de alta, incluyendo firmas digitales y estadísticas basadas en los datos recopilados. La solución está diseñada para ser escalable, permitiendo la integración de más camillas y sensores en el futuro, asegurando una gestión hospitalaria eficiente, segura y automatizada.

## Capas del Framework IoT

# Smart Apps (Aplicaciones Inteligentes)

- **Aplicación Web**: Permite a los médicos visualizar datos en tiempo real, gestionar diagnósticos y controlar las camillas.
- **Grafana**: Se utiliza para crear dashboards de monitoreo en tiempo real, mostrando datos como ocupación de camillas y signos vitales.
- **Reportes PDF**: Generación automática de reportes personalizados, incluyendo el historial médico y certificados de alta.

# Analytics (Análisis de Datos)

- **Base de Datos Relacional**: Uso de PostgreSQL o MySQL para almacenar y procesar datos de pacientes, diagnósticos y sensores.
- **Tendencias y Métricas**: Análisis de tendencias en ocupación hospitalaria y signos vitales utilizando Grafana.
- **Cálculo de Métricas**: Cálculo de métricas como promedio, mínimo y máximo de mediciones de ECG y oximetría.

# Connectivity (Conectividad)

- **Protocolo MQTT**: Comunicación en tiempo real entre sensores y la aplicación web mediante el protocolo MQTT.
- **Backend con Spring Boot**: Recepción de datos, autenticación y gestión de la lógica del sistema.
- **Autenticación con RFID**: Conexión segura de médicos mediante tarjetas RFID para acceder al sistema.

# Sensors (Sensores)

- **Sensores ECG**: Medición de la actividad cardíaca de los pacientes.
- **Sensores de Oximetría**: Medición de la saturación de oxígeno en la sangre.
- **Sensores en Camillas**: Detección de la presencia de pacientes en las camillas.

# Product Infrastructure (Infraestructura del Producto)

- **Dispositivos Arduino/ESP32**: Captura de datos desde los sensores y envío al backend.
- **Red Local (Hotspot)**: Conexión del dashboard y dispositivos a través de una red local.
- **Autenticación Segura**: Implementación de un sistema seguro basado en RFID para la autenticación de médicos y personal autorizado.
# Descripción de los Sensores

### Sensor MAX30102

| **Tamaño** | **Tipo de Lectura** | **Instalación** | **Rango de Medición** | **Unidad de Medida** | **Imágenes** | **Precio Estimado** | **Fechas de Importación** |
|------------|---------------------|-----------------|-----------------------|----------------------|--------------|---------------------|---------------------------|
| 14mm x 17mm | Óptico          | Dedo, Muñeca, Tórax | 870nm a 900nm     | HR y SpO₂       | ![Imagen MAX30102](https://www.electronicadiy.com/cdn/shop/products/10bb4f_566be73d5f2c49be959a58faff8629b6_mv2_678x397.jpg?v=1592916379) | Q165.00        | (Especificar)         |

**Enlace para comprar**: [Comprar MAX30102](https://www.electronicadiy.com/products/max30102-sensor-pulso-y-concentracion-oxigeno)

---

### Sensor ECG

| **Tamaño** | **Tipo de Lectura** | **Instalación** | **Rango de Medición** | **Unidad de Medida** | **Imágenes** | **Precio Estimado** | **Fechas de Importación** |
|------------|---------------------|-----------------|-----------------------|----------------------|--------------|---------------------|---------------------------|
| 28mm x 35mm  | Eléctrico       | Tórax, Extremidades |   ±1 mV a ±5 mV     | milivoltios (mV)    | ![Imagen ECG](https://tienda.tettsa.gt/wp-content/uploads/2020/12/20201201_112647.jpg) | $165.00          | (Especificar)         |

**Enlace para comprar**: [Comprar Sensor ECG](https://tienda.tettsa.gt/producto/sensor-de-pulso-cardiaco-ad8232-ecg/)

---

### Sensor de Temperatura y Humedad DHT11

| **Tamaño** | **Tipo de Lectura** | **Instalación** | **Rango de Medición** | **Unidad de Medida** | **Imágenes** | **Precio Estimado** | **Fechas de Importación** |
|------------|---------------------|-----------------|-----------------------|----------------------|--------------|---------------------|---------------------------|
| 19 mm x 17 mm x 19 mm | Digital          | Ambiente    | 0 °C a 50 °C y 20% a 90% HR     | °C y %  | ![Sensor de Temperatura y Humedad DHT11](https://tienda.tettsa.gt/wp-content/uploads/2020/05/dht11-A.jpeg) | Q25.00          | (Especificar)         |

**Enlace para comprar**: [Comprar Sensor de DHT11](https://tienda.tettsa.gt/producto/sensor-de-temperatura-y-humedad-dht11/)

---

### Sensor RFID

| **Tamaño** | **Tipo de Lectura** | **Instalación** | **Rango de Medición** | **Unidad de Medida** | **Imágenes** | **Precio Estimado** | **Fechas de Importación** |
|------------|---------------------|-----------------|-----------------------|----------------------|--------------|---------------------|---------------------------|
| 40mm × 60mm | Electromagnético | Lector RFID     |   0 a 60 mm     | milímetros (mm)    | ![Imagen RFID](https://laelectronica.com.gt/image/cache/catalog/Productos/M%C3%B3dulos/Modulo-RFID--RC522-Producto-1200x1200.jpg) | Q50.00          | (Especificar)         |

**Enlace para comprar**: [Comprar Sensor RFID](https://laelectronica.com.gt/modulo-sensor-rfid-rc522)

---

## Mockups del Prototipo
### Boceto del prototipo

<img src="https://i.ibb.co/mCnGM3V5/Captura-de-pantalla-2025-03-06-173829.png" alt="Boceto de la maqueta" width="500" />

### Ubicacion de cada componente
<img src="https://i.ibb.co/QFWSWYGj/Captura-de-pantalla-2025-03-06-174232.png" alt="Ubicacion de componentes" width="500" />

## Fotografías del Prototipo

### RFID
<img src="img/img1.jpg" alt="RFID" width="500" height="500" />

### MQ-135
<img src="img/img2.jpg" alt="MQ-135" width="500" height="500" />

### AD8232
<img src="img/img3.jpg" alt="AD8232" width="500" height="500" />

### Desarrollo
<img src="img/img5.jpg" alt="Desarrollo 1" width="500" height="500" />
<img src="img/img6.jpg" alt="Desarrollo 2" width="500" height="500" />
<img src="img/img7.jpg" alt="Desarrollo 3" width="500" height="500" />
<img src="img/img8.jpg" alt="Desarrollo 4" width="500" height="500" />
<img src="img/img9.jpg" alt="Desarrollo 5" width="500" height="500" />

## Mockups de la Aplicación Web/Móvil
### Mockups de la Aplicación Web

#### Login
<img src="https://i.ibb.co/Fbxdq85m/Captura-de-pantalla-2025-03-04-192406.png" alt="Ventana Login" height="300" />

#### Ventana de Doctores
<img src="https://i.ibb.co/dwG0JL2q/Captura-de-pantalla-2025-03-06-132635.png" alt="Ventana de Doctores" width="500" />

#### Registro de Pacientes
<img src="https://i.ibb.co/n8CkBSL5/Captura-de-pantalla-2025-03-06-133735.png" alt="Registro de Pacientes" width="500" />

#### Actualización de Datos del Paciente
<img src="https://i.ibb.co/W4q8Cjxm/Captura-de-pantalla-2025-03-06-133423.png" alt="Actualización de Datos del Paciente" width="500" />

#### Ventana para Pacientes
<img src="https://i.ibb.co/wrwjk2sm/Captura-de-pantalla-2025-03-06-134328.png" alt="Ventana para Pacientes" width="500" />

#### Actualización de Datos del Paciente
<img src="https://i.ibb.co/HLjfNCtV/Captura-de-pantalla-2025-03-06-134837.png" alt="Actualización de Datos del Paciente" width="500" />

#### Vista de Historial Médico
<img src="https://i.ibb.co/C5Xr8RDD/Captura-de-pantalla-2025-03-06-135957.png" alt="Vista de Historial Médico" width="500" />

## Diagrama de Conexiones
<img src="img/DC.png" alt="Diagrama de Conexiones" width="800" height="600" />

## Diagrama de Arquitectura de Software

<img src="img/Arquitectura_Software.png" alt="Diagrama Bloque RFID" width="800" height="600" />

## Diagrama de Bloques y Estructuras del RFID
<img src="img/DB_RFID.png" alt="Diagrama Bloque RFID" width="800" height="600" />


## Diagrama de Flujo de la Solución del Prototipo


## Modelo Entidad-Relación de la Base de Datos

<img src="img/ER.png" alt="Diagrama Bloque RFID" width="800" height="600" />

## Listado y Descripción de Consultas SQL
### Verificar Inicio
##### SELECT * FROM usuarios WHERE UID = 'UID_Consultado';

### Declarar Camillas

##### INSERT INTO Camilla (Estado , Fecha) VALUES (Alta_Baja,fecha);

### Llenar Formulario

##### INSERT INTO Pacientes (Nombre Completo,Fotografía, Estado,Historial_Médico, Camilla_id, Fecha) VALUES (Texto, Foto,Alta_Baja,texto,Numero_id,fecha);

##### INSERT INTO Diagnósticos (Pacientes_id, Usuarios_id,Estado,Observaciones,Recomendaciones) VALUES (Numero_id, Numero_id_Usuarios,Alta_Baja,texto,texto,fecha);


### Registros de signos vitales
##### INSERT INTO ecg (Pacientes_id, dato,Fecha) VALUES (Numero_id, Numero_dato,fecha);

##### INSERT INTO Oximetría (Pacientes_id, Oxigenación,Frecuencia_pulso,Fecha) VALUES (Numero_id, Numero_Oxigeno,Numero_Pulso,fecha);

##### INSERT INTO Signos_Vitales (Pacientes_id, Oxigenación,Frecuencia_cardica,Fecha) VALUES (Numero_id, Numero_Oxigeno,Numero_Cardiaca,fecha);

### Datos Pacientes

##### SELECT * FROM Pacientes WHERE id = 'id_consultado';

## 🔌 **API Contracts**  

 Descripción de la API de MediTrack, la cual interactúa con un dispositivo Arduino para leer datos de sensores (ECG, oxígeno, RFID) y gestionar información de pacientes.

```yaml
info:
  title: MediTrack API
  version: 0.0.1
  description: >
    API para la aplicación MediTrack, que interactúa con un dispositivo Arduino
    para leer datos de sensores (ECG, oxígeno, RFID), así como gestionar 
    información básica de pacientes.

servers:
  - url: http://localhost:8080
    description: Servidor local

paths:
  /status:
    get:
      summary: Verificar estado del servidor
      description: Retorna un mensaje indicando si el servidor está funcionando.
      responses:
        '200':
          description: Respuesta exitosa
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemplo:
                  value: "El servidor está funcionando correctamente 🚀"

  /ecg:
    get:
      summary: Obtener dato de ECG
      description: Retorna el último valor de ECG recibido desde Arduino.
      responses:
        '200':
          description: Respuesta exitosa
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemplo:
                  value: "125"  # Ejemplo de dato ECG

  /get-datos-sensores:
    get:
      summary: Obtener datos de sensores
      description: Retorna un objeto JSON con los valores de ECG, oxígeno y estado RFID.
      responses:
        '200':
          description: Respuesta exitosa
          content:
            application/json:
              schema:
                type: object
                properties:
                  ecg:
                    type: integer
                    example: 120
                  oxigeno:
                    type: number
                    format: float
                    example: 0.78
                  rfid:
                    type: boolean
                    example: true
              examples:
                ejemplo:
                  value:
                    ecg: 127
                    oxigeno: 0.82
                    rfid: false

  /encender:
    post:
      summary: Enviar comando de encendido/apagado al Arduino
      description: Envía el comando "ON" o "OFF" al Arduino a través del puerto serial.
      parameters:
        - in: query
          name: comando
          schema:
            type: string
            enum: [ON, OFF]
          required: true
          description: Comando para enviar al Arduino.
      responses:
        '200':
          description: Respuesta exitosa (o mensaje de validación)
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemploOn:
                  value: "✅ Mensaje enviado a Arduino: ON\n"
                ejemploOff:
                  value: "✅ Mensaje enviado a Arduino: OFF\n"
        '400':
          description: Comando no válido

  /Acceso_Form:
    get:
      summary: Verificar acceso
      description: Retorna un valor booleano que indica si se reconoce la tarjeta RFID autorizada (médico).
      responses:
        '200':
          description: Respuesta exitosa (true = acceso permitido, false = denegado)
          content:
            application/json:
              schema:
                type: boolean
              examples:
                ejemplo:
                  value: true

  /Bloqueo_Acceso:
    get:
      summary: Alternar estado de acceso
      description: Invierte el estado interno de la variable `rfid` y retorna el valor nuevo.
      responses:
        '200':
          description: Retorna el nuevo estado booleano
          content:
            application/json:
              schema:
                type: boolean
              examples:
                ejemplo:
                  value: false

  /guardarPaciente:
    post:
      summary: Guardar paciente en memoria local
      description: Recibe datos de un paciente y los almacena temporalmente en la lista `pacientes`. 
                   Además, envía al Arduino el índice del paciente recién guardado.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                nombres:
                  type: string
                  example: "Carlos Mendoza"
                edad:
                  type: number
                  example: 45
                diagnostico:
                  type: string
                  example: "Arritmia leve"
              additionalProperties: true
      responses:
        '200':
          description: Paciente guardado exitosamente
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemplo:
                  value: "Paciente guardado exitosamente."
        '400':
          description: Cuerpo de solicitud inválido
        '500':
          description: Error interno del servidor

  /GetPacientes:
    get:
      summary: Obtener lista de nombres de pacientes
      description: Retorna una lista de strings con los nombres de los pacientes registrados en la base de datos (MySQL).
      responses:
        '200':
          description: Lista de nombres
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
              examples:
                ejemplo:
                  value:
                    - "Carlos Mendoza"
                    - "Ana López"

  /SeleccionarPaciente:
    get:
      summary: Obtener datos del paciente seleccionado
      description: Devuelve la información completa (en memoria) del paciente en el índice `indicePaciente`.
      responses:
        '200':
          description: Datos del paciente
          content:
            application/json:
              schema:
                type: object
                example:
                  nombres: "Carlos Mendoza"
                  edad: 45
                  diagnostico: "Arritmia leve"

  /SeleccionarIndice:
    get:
      summary: Obtener índice del paciente seleccionado
      description: Retorna el valor de `indicePaciente`.
      responses:
        '200':
          description: Índice actual
          content:
            text/plain:
              schema:
                type: integer
              examples:
                ejemplo:
                  value: 0

  /BorrarDatosPaciente:
    post:
      summary: Borrar datos de un paciente en memoria
      description: Borra la información del paciente que se encuentra en el índice proporcionado.
      parameters:
        - in: query
          name: IndicePaciente
          schema:
            type: integer
          required: true
          description: Índice del paciente en la lista `pacientes`.
      responses:
        '200':
          description: Paciente dado de alta o error
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemploAlta:
                  value: "Paciente de Alta"
                ejemploFueraDeRango:
                  value: "Índice fuera de rango"

  /enviarBool:
    post:
      summary: Enviar un valor booleano al Arduino
      description: Envía `true` o `false` al puerto serial.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: boolean
            examples:
              ejemploTrue:
                value: true
              ejemploFalse:
                value: false
      responses:
        '200':
          description: Se envía el valor booleano correctamente
          content:
            text/plain:
              schema:
                type: string
              examples:
                ejemplo:
                  value: "Booleano enviado correctamente: true"
        '500':
          description: Error al enviar datos al Arduino

  /auth/rfid:
    post:
      summary: Autenticación RFID
      description: Verifica el UID de la tarjeta RFID y devuelve el rol del médico.
      requestBody:
        required: true
        content:
          text/plain:
            schema:
              type: string
              example: "RFID_UID_12345"
      responses:
        '200':
          description: Rol del usuario
          content:
            application/json:
              schema:
                type: object
                properties:
                  rol:
                    type: string
                    enum: [RESIDENTE, ESPECIALISTA]
                  nombre:
                    type: string
                    example: "Dr. Juan Pérez"
              example:
                rol: "ESPECIALISTA"
                nombre: "Dr. Ana López"
        '403':
          description: Acceso denegado

  /pacientes:
    get:
      summary: Listar todos los pacientes
      description: Retorna lista de pacientes con datos básicos (filtrables por nombre/CUI).
      parameters:
        - in: query
          name: search
          schema:
            type: string
          description: Búsqueda por nombre o CUI
      responses:
        '200':
          description: Lista de pacientes
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Paciente'

    post:
      summary: Crear nuevo paciente
      description: Registra un paciente en la base de datos (solo para especialistas).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Paciente'
      responses:
        '201':
          description: Paciente creado

  /pacientes/{id}:
    put:
      summary: Actualizar datos del paciente
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Paciente'
      responses:
        '200':
          description: Datos actualizados

  /diagnosticos:
    post:
      summary: Registrar nuevo diagnóstico
      description: Crea un diagnóstico asociado a un paciente (timestamp automático).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                pacienteId:
                  type: integer
                observaciones:
                  type: string
                sintomas:
                  type: array
                  items:
                    type: string
              example:
                pacienteId: 101
                observaciones: "Arritmia detectada"
                sintomas: ["Taquicardia", "Mareos"]
      responses:
        '201':
          description: Diagnóstico registrado

  /diagnosticos/{id}/alta:
    post:
      summary: Dar de alta a paciente
      description: Cierra un diagnóstico y genera reporte PDF automático.
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Reporte generado
          content:
            application/pdf:
              schema:
                type: string
                format: binary

  /reportes/historial/{pacienteId}:
    get:
      summary: Generar historial médico PDF
      parameters:
        - in: path
          name: pacienteId
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: PDF descargable
          content:
            application/pdf:
              schema:
                type: string
                format: binary

  /camillas:
    get:
      summary: Estado de camillas
      description: Retorna estado de ocupación de todas las camillas.
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    ocupada:
                      type: boolean
                    pacienteId:
                      type: integer
                      nullable: true

  /estadisticas/signos-vitales:
    get:
      summary: Datos para Grafana
      description: Retorna métricas de ECG y oximetría para dashboards.
      parameters:
        - in: query
          name: intervalo
          schema:
            type: string
            enum: [1h, 24h, 7d]
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  ecg_promedio:
                    type: number
                    format: float
                  oximetria_min:
                    type: integer

  /firma-digital:
    post:
      summary: Subir firma digital
      description: Almacena firma digital del médico (QR/base64) en la base de datos.
      requestBody:
        required: true
        content:
          image/png:
            schema:
              type: string
              format: binary
      responses:
        '200':
          description: Firma almacenada

components:
  schemas:
    Paciente:
      type: object
      properties:
        id:
          type: integer
        nombre:
          type: string
        cui:
          type: string
        fechaIngreso:
          type: string
          format: date-time
        camillaId:
          type: integer
        # ... otros campos del modelo

    Diagnostico:
      type: object
      properties:
        timestampInicio:
          type: string
          format: date-time
        timestampFin:
          type: string
          format: date-time
        estadisticas:
          type: object
          properties:
            ecg_max:
              type: number
```
