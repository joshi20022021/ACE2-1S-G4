# Documentación del Proyecto IoT

## Descripción de la Solución

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

## Diagrama de Bloques y Estructuras del RFID
<img src="img/DB_RFID.png" alt="Diagrama Bloque RFID" width="800" height="600" />


## Diagrama de Flujo de la Solución del Prototipo


## Modelo Entidad-Relación de la Base de Datos


## Listado y Descripción de Consultas SQL
