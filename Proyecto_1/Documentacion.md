# Documentación del Proyecto IoT

## Descripción de la Solución
El **Sistema de Monitoreo de Pacientes en un Hospital** es una solución basada en tecnologías de IoT, esta diseñada para mejorar la eficiencia en la atención hospitalaria mediante el monitoreo en tiempo real de los pacientes. El sistema integra sensores médicos, autenticación segura y visualización de datos en un dashboard interactivo, facilitando la toma de decisiones médicas y optimizando la gestión hospitalaria. Los sensores ECG y de oximetría instalados en las camillas recopilan información sobre los signos vitales de los pacientes y la transmiten mediante el protocolo MQTT a un backend desarrollado en Spring Boot, que procesa y almacena los datos en una base de datos relacional como PostgreSQL o MySQL.

Para garantizar la seguridad y control de acceso, se utiliza autenticación mediante tarjetas RFID, permitiendo diferenciar roles entre residentes y especialistas, donde los residentes solo pueden visualizar datos y llenar formularios, mientras que los especialistas pueden realizar diagnósticos y dar de alta a los pacientes. 

La información recopilada se visualiza en un dashboard web, y se complementa con paneles interactivos en Grafana, mostrando métricas en tiempo real como ocupación de camillas, estadísticas de signos vitales y alertas de valores críticos. Además, el sistema permite la generación automática de reportes PDF con el historial médico y las constancias de alta, incluyendo firmas digitales y estadísticas basadas en los datos recopilados. La solución está diseñada para ser escalable, permitiendo la integración de más camillas y sensores en el futuro, asegurando una gestión hospitalaria eficiente, segura y automatizada.

## Capas del Framework IoT

## 1. Capa de Hardware
- **Sensores biomédicos:**
  - ECG (electrocardiograma) para medir actividad cardíaca.
  - Sensor de oximetría para niveles de oxígeno en sangre.
  - Sensores de presencia en camillas.
- **Dispositivos de control:**
  - Arduino/ESP32: Lectura de sensores, gestión de RFID y comunicación con el backend.
  - Lector RFID: Autenticación de médicos mediante tarjetas.
- **Infraestructura:**
  - Camillas con sensores.
  - Hotspot local para acceso al dashboard de Grafana.

## 2. Capa de Software
- **Firmware en Arduino/ESP32:**
  - Lectura de datos de sensores en tiempo real.
  - Comunicación serial/UART con el backend (Spring Boot).
- **Backend (Spring Boot):**
  - Autenticación de médicos via RFID.
  - Procesamiento de datos médicos (ECG, oximetría).
  - Gestión de base de datos relacional (PostgreSQL/MySQL).
  - Integración con MQTT para publicación/suscripción de datos.
- **Frontend Web:**
  - Dashboard interactivo para visualización de pacientes.
  - Formularios clínicos y gestión de diagnósticos.
  - Generación de reportes PDF con firmas digitales.

## 3. Capa de Comunicación
- **Protocolo MQTT:**
  - **Topics principales:**
    - `sensores/datos`: Datos crudos de ECG y oximetría.
    - `diagnostico/realizado`: Notificaciones de diagnósticos completados.
    - `camillas/estado`: Estado de ocupación de camillas.
  - **Configuración:**
    - Broker: HiveMQ.
    - QoS 1 para garantizar entrega de datos críticos.
- **Red Local:**
  - Hotspot para acceso al dashboard de Grafana.
  - Conexión UART entre Arduino y backend.

## 4. Plataforma en la Nube
- **Almacenamiento:**
  - Base de datos relacional en la nube (ej: AWS RDS, Azure SQL).
  - Historial médico con dimensión temporal.
- **Broker MQTT en la nube:**
  - HiveMQ Cloud para gestión escalable de mensajes.
- **Servicios de seguridad:**
  - Encriptación TLS/SSL para datos sensibles (ECG, RFID).
  - Autenticación OAuth2 para médicos.

## 5. Aplicaciones en la Nube
- **Grafana:**
  - Dashboards en tiempo real:
    - Gráficos de signos vitales por camilla.
    - Porcentaje de ocupación del hospital.
    - Alertas automáticas para valores críticos.
  - Integración directa con MQTT y bases de datos.
- **Base de datos AWS**
  - Recopilacion de datos detectados por los sensores.
  - distribucion de los datos para la graficacion.
  - interaccion a traves de una API que captura los datos del frontend.

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
<img src="img/img10.png" alt="Diagrama de Flujo de la Solución" width="300" height="500" />

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

## Explicación del Broker MQTT

El protocolo **MQTT (Message Queuing Telemetry Transport)** es un estándar ligero de comunicación basado en **publicación/suscripción**, ideal para sistemas IoT como el que estás desarrollando.

En este proyecto, el **broker MQTT** maneja la comunicación entre los dispositivos médicos (Arduino/ESP32) y el servidor/backend, que almacena los datos en la base de datos.


## 🔹 Conceptos Claves de MQTT

### 1. Broker MQTT

El **broker** es el servidor que administra los mensajes enviados por los dispositivos IoT y los distribuye a los suscriptores.

### Funciones del broker:

- Recibe datos de los sensores médicos (RFID, ECG, oximetría).
- Distribuye los datos a los clientes suscriptores (backend, Grafana, frontend web).
- Asegura la entrega de mensajes según diferentes niveles de calidad de servicio (**QoS**).
- Maneja múltiples conexiones IoT de forma eficiente.


### 2. Topics en MQTT

Los **topics** en MQTT son los "canales" donde se publican y reciben los mensajes. En el proyecto, los topics pueden organizarse de la siguiente manera:

| **Topic**               | **Descripción**                                         |
| ----------------------- | ------------------------------------------------------- |
| `sensores/datos`        | Publica los datos en tiempo real de todos los sensores. |
| `sensores/oxigeno`      | Publica los niveles de oxígeno de cada paciente.        |
| `sensores/ecg`          | Publica los datos del electrocardiograma.               |
| `diagnostico/realizado` | Notifica cuando un diagnóstico ha sido registrado.      |

Ejemplo de publicación de datos en un topic:

```python
client.publish("sensores/ecg", "Paciente_1: 78 BPM")
```

### 3. Métodos Principales en MQTT

#### 🔹 Publicar (`publish`)

Un dispositivo envía datos a un topic.

```python
client.publish("sensores/datos", "Paciente_1: ECG OK")
```

#### 🔹 Suscribirse (`subscribe`)

Un dispositivo o sistema recibe datos en tiempo real de un topic.

```python
client.subscribe("sensores/ecg")
```

### 4. Calidad de Servicio (QoS)

El **QoS (Quality of Service)** en MQTT define cómo se entregan los mensajes:

| **Nivel QoS**         | **Descripción**                                          |
| --------------------- | -------------------------------------------------------- |
| **0 (At most once)**  | Mensaje enviado sin confirmación (puede perderse).       |
| **1 (At least once)** | Mensaje garantizado al menos una vez (puede duplicarse). |
| **2 (Exactly once)**  | Mensaje entregado solo una vez (más lento pero seguro).  |

Ejemplo de publicación con QoS 1:

```python
client.publish("sensores/oxigeno", "97%", qos=1)
```


### 5. Utilidades del MQTT en el Proyecto

#### 📌 Beneficios de usar MQTT en el sistema hospitalario:

- **Comunicación en tiempo real** entre sensores y la plataforma de monitoreo.
- **Bajo consumo de energía** y ancho de banda, ideal para dispositivos IoT.
- **Fiabilidad y entrega garantizada** de datos médicos sensibles.
- **Facilidad de integración** con bases de datos y dashboards como **Grafana**.


## 🔌 **API Contracts**  

 Descripción de la API, la cual interactúa con un dispositivo Arduino para leer datos de sensores (ECG, oxígeno, RFID) y gestionar información de pacientes.

 ![image](https://github.com/user-attachments/assets/d42b8e50-7a88-4561-80f6-05ba347e07af)
 ![image](https://github.com/user-attachments/assets/e4375021-5da0-4a2f-bde2-19d4ed19445a)
![image](https://github.com/user-attachments/assets/e2d944f7-b940-4551-b428-6b84e63fc5e2)



```yaml
info:
  title: Monitoreo Hospital API
  version: 0.0.1
  description: >
    API para la aplicación, que interactúa con un dispositivo Arduino
    para leer datos de sensores (ECG, oxígeno, RFID), así como gestionar 
    información básica de pacientes.

servers:
  - url: http://localhost:8080
    description: Servidor local

paths:
  /login:
    post:
      summary: Autenticar médico con RFID
      description: Verifica la tarjeta RFID del médico y devuelve un token de sesión.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                uid:
                  type: string
                  example: "A1B2C3D4"
      responses:
        '200':
          description: Autenticación exitosa
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        '401':
          description: RFID no reconocido o no autorizado

  /pacientes:
    get:
      summary: Obtener lista de pacientes
      description: Retorna una lista con los datos básicos de todos los pacientes registrados.
      responses:
        '200':
          description: Lista de pacientes
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      example: 1
                    nombre:
                      type: string
                      example: "Juan Pérez"
                    estado:
                      type: string
                      enum: [alta, tratamiento]
                      example: "tratamiento"
                    camilla:
                      type: integer
                      example: 3


  /pacientes/{id}:
    get:
      summary: Obtener información de un paciente
      description: Retorna los datos personales de un paciente, incluyendo su historial de diagnósticos.
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del paciente
      responses:
        '200':
          description: Información del paciente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Paciente'

    put:
      summary: Actualizar datos personales del paciente
      description: Permite a un médico Especialista modificar la información personal del paciente.
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                nombre:
                  type: string
                fecha_nacimiento:
                  type: string
                  format: date
                tipo_sangre:
                  type: string
                  enum: [A+, A-, B+, B-, O+, O-, AB+, AB-]
      responses:
        '200':
          description: Datos del paciente actualizados correctamente
        '403':
          description: Acceso denegado para Residentes


  /pacientes/{id}/fotografia:
    put:
      summary: Actualizar fotografía del paciente
      description: Permite la actualización de la imagen del paciente mediante carga de archivo o webcam.
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                imagen:
                  type: string
                  format: binary
      responses:
        '200':
          description: Imagen actualizada correctamente


  /pacientes/{id}/historial:
    get:
      summary: Obtener historial médico del paciente
      description: Retorna la información completa del historial médico del paciente, incluyendo datos personales, diagnóstico actual, registros previos y estadísticas.
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del paciente
      responses:
        '200':
          description: Historial médico del paciente
          content:
            application/json:
              schema:
                type: object
                properties:
                  paciente:
                    $ref: '#/components/schemas/Paciente'
                  historial_diagnosticos:
                    type: array
                    items:
                      $ref: '#/components/schemas/Diagnostico'
                  estadisticas:
                    type: object
                    properties:
                      promedio_ecg:
                        type: number
                        format: float
                      promedio_oxigeno:
                        type: number
                        format: float
                      frecuencia_cardiaca_maxima:
                        type: integer
                      frecuencia_cardiaca_minima:
                        type: integer
  /pacientes/{id}/alta:
    get:
      summary: Obtener información de alta médica del paciente
      description: Retorna los detalles del alta médica de un paciente si ha sido dado de alta, incluyendo la firma digital del médico responsable.
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del paciente
      responses:
        '200':
          description: Información de alta médica del paciente
          content:
            application/json:
              schema:
                type: object
                properties:
                  paciente:
                    $ref: '#/components/schemas/Paciente'
                  alta_medica:
                    type: object
                    properties:
                      fecha_alta:
                        type: string
                        format: date
                      medico_responsable:
                        type: string
                      indicaciones_alta:
                        type: string
                      firma_digital:
                        type: string
                        example: "data:image/png;base64,iVBORw0KGgo..."
        '404':
          description: El paciente aún no ha sido dado de alta

/diagnosticos/{id}/alta:
    post:
      summary: Dar de alta a un paciente
      description: Permite a un médico Especialista dar de alta un paciente y registrar estadísticas finales.
      security:
        - BearerAuth: []
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del diagnóstico
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                fecha_alta:
                  type: string
                  format: date
                medico_responsable:
                  type: string
                indicaciones_alta:
                  type: string
      responses:
        '200':
          description: Paciente dado de alta exitosamente
        '403':
          description: Acceso denegado para Residentes



  /medicos:
    get:
      summary: Obtener lista de médicos
      description: Retorna una lista con los datos de los médicos registrados en el sistema.
      responses:
        '200':
          description: Lista de médicos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Medico'


  /diagnosticos:
    post:
      summary: Registrar un diagnóstico
      description: Permite a un médico Especialista registrar un diagnóstico para un paciente.
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                paciente_id:
                  type: integer
                sintomas:
                  type: string
                observaciones:
                  type: string
                inicio_timestamp:
                  type: string
                  format: date-time
      responses:
        '201':
          description: Diagnóstico registrado con éxito
        '403':
          description: Acceso denegado para Residentes

  /signos-vitales:
    post:
      summary: Registrar signos vitales
      description: Registra una nueva medición de signos vitales para un paciente.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                paciente_id:
                  type: integer
                  example: 1
                frecuencia_cardiaca:
                  type: integer
                  example: 72
                oxigenacion:
                  type: number
                  format: float
                  example: 0.98
      responses:
        '201':
          description: Registro de signos vitales guardado con éxito

  /ecg:
    post:
      summary: Registrar electrocardiograma
      description: Guarda un nuevo electrocardiograma para un paciente.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                paciente_id:
                  type: integer
                  example: 1
                datos:
                  type: array
                  items:
                    type: integer
                  example: [120, 125, 130, 118]
      responses:
        '201':
          description: ECG registrado con éxito

  /camillas:
    get:
      summary: Obtener disponibilidad de camillas
      description: Retorna una lista con el estado de cada camilla en la clínica.
      responses:
        '200':
          description: Lista de camillas
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                      example: 1
                    disponible:
                      type: boolean
                      example: false

  /mqtt/publicar:
    post:
      summary: Publicar datos en MQTT
      description: Publica datos en el broker MQTT bajo el topic `sensores/datos`.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                topic:
                  type: string
                  example: "sensores/datos"
                payload:
                  type: object
      responses:
        '200':
          description: Datos publicados exitosamente
        '400':
          description: Error en el formato del mensaje

  /mqtt/suscripcion:
    get:
      summary: Suscribirse a un topic MQTT
      description: Permite que el backend reciba datos en tiempo real desde un topic MQTT.
      parameters:
        - in: query
          name: topic
          schema:
            type: string
          required: true
          description: Topic MQTT al que suscribirse
      responses:
        '200':
          description: Suscripción exitosa
        '400':
          description: Error en la suscripción

  /monitoreo/camillas:
    get:
      summary: Obtener ocupación de camillas
      description: Devuelve el estado de ocupación de todas las camillas en el hospital.
      responses:
        '200':
          description: Lista de camillas con su estado
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    camilla_id:
                      type: integer
                    ocupada:
                      type: boolean
                    paciente_id:
                      type: integer
                      nullable: true

  /monitoreo/camillas/{id}:
    get:
      summary: Obtener estadísticas de signos vitales por camilla
      description: Devuelve estadísticas de ECG y oximetría para una camilla específica.
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID de la camilla
        - in: query
          name: intervalo
          schema:
            type: string
            enum: [ultima_hora, 24_horas, ultima_semana]
          description: Intervalo de tiempo para las estadísticas
      responses:
        '200':
          description: Estadísticas de signos vitales
          content:
            application/json:
              schema:
                type: object
                properties:
                  minimo_ecg:
                    type: number
                  maximo_ecg:
                    type: number
                  promedio_ecg:
                    type: number
                  minimo_oxigeno:
                    type: number
                  maximo_oxigeno:
                    type: number
                  promedio_oxigeno:
                    type: number

  /monitoreo/ocupacion:
    get:
      summary: Obtener porcentaje de ocupación del hospital
      description: Devuelve el porcentaje de ocupación de camillas en tiempo real.
      responses:
        '200':
          description: Nivel de ocupación del hospital
          content:
            application/json:
              schema:
                type: object
                properties:
                  ocupacion_porcentaje:
                    type: number
                    format: float
                  camillas_ocupadas:
                    type: integer
                  camillas_totales:
                    type: integer

  /monitoreo/ocupacion/nivel:
    get:
      summary: Obtener porcentaje de ocupación por nivel
      description: Devuelve el porcentaje de ocupación de camillas en cada nivel del hospital.
      responses:
        '200':
          description: Porcentaje de ocupación por nivel
          content:
            application/json:
              schema:
                type: object
                properties:
                  nivel_1:
                    type: number
                    format: float
                  nivel_2:
                    type: number
                    format: float

  /monitoreo/tiempo_estadia:
    get:
      summary: Obtener tiempo promedio de estadía de pacientes
      description: Devuelve el tiempo promedio que los pacientes han estado internados antes de recibir el alta.
      responses:
        '200':
          description: Tiempo promedio de estadía
          content:
            application/json:
              schema:
                type: object
                properties:
                  tiempo_promedio_estadia:
                    type: string
                    example: "3 días 6 horas"

  /monitoreo/alertas:
    get:
      summary: Obtener alertas de signos vitales críticos
      description: Devuelve una lista de pacientes que presentan valores anómalos de ECG u oximetría.
      responses:
        '200':
          description: Lista de alertas activas
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    paciente_id:
                      type: integer
                    nombre:
                      type: string
                    valor_ecg:
                      type: number
                      nullable: true
                    valor_oxigeno:
                      type: number
                      nullable: true
                    alerta_generada:
                      type: string
                      example: "ECG crítico"

  /monitoreo/ingresos_altas:
    get:
      summary: Obtener tendencia de ingresos y altas médicas
      description: Devuelve datos sobre ingresos y altas médicas en distintos períodos de tiempo.
      parameters:
        - in: query
          name: intervalo
          schema:
            type: string
            enum: [dia, semana, mes]
          required: true
          description: Intervalo de tiempo a consultar
      responses:
        '200':
          description: Datos de ingresos y altas
          content:
            application/json:
              schema:
                type: object
                properties:
                  ingresos:
                    type: integer
                  altas:
                    type: integer



components:
  schemas:
    Medico:
      type: object
      properties:
        uid:
          type: string
        id_interno:
          type: integer
        nombre:
          type: string
        apellido:
          type: string
        rol:
          type: string
          enum: [RESIDENTE, ESPECIALISTA]
        fecha_nacimiento:
          type: string
          format: date
        fecha_registro:
          type: string
          format: date
        firma_digital:
          type: string
          description: Representación de la firma digital, puede ser una URL o base64

    Paciente:
      type: object
      properties:
        id:
          type: integer
        nombre:
          type: string
        edad:
          type: integer
        fecha_nacimiento:
          type: string
          format: date
        tipo_sangre:
          type: string
          enum: [A+, A-, B+, B-, O+, O-, AB+, AB-]
        estado:
          type: string
          enum: [alta, tratamiento]
        fotografia:
          type: string
          format: binary
        historial_diagnosticos:
          type: array
          items:
            $ref: '#/components/schemas/Diagnostico'

    Diagnostico:
      type: object
      properties:
        sintomas:
          type: string
        observaciones:
          type: string
        estado:
          type: string
          enum: [alta, en proceso]

securitySchemes:
  BearerAuth:
    type: http
    scheme: bearer



```


