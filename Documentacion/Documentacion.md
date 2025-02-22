# Universidad de San Carlos de Guatemala  
#### Facultad de Ingeniería - Escuela de Ciencias y Sistemas  
#### Arquitectura de Computadores y Ensambladores 2  

#### **Práctica 1 - Grupo 4**  

### **MediTrack - Monitoreo Inteligente de Camillas y Cubículos de Pacientes**  

### **Integrantes:**  
- **Sebastian Vásquez** (Coordinador)  
- Jens Pablo  
- Edgar Can  
- Manuel Pichiya
- Andrés Agosto 
 

**Fecha de Entrega:** 21 de febrero de 2025  

-------



## Descripción de la Solución
MediTrack es un sistema de monitoreo hospitalario en tiempo real basado en IoT para camillas del Hospital Roosevelt. Utiliza sensores ECG y RFID para registrar signos vitales y gestionar el alta de pacientes de manera eficiente. La plataforma permite la visualización remota de datos mediante una API REST y una interfaz web adaptable.

-------

## Capas del Framework IoT
1. **Capa de Sensores**: Captura datos de ECG y concentración de oxígeno, Tags para acceso de Doctores a formularios.
2. **Capa de Comunicación**: Transmisión de datos vía UART/USB hacia un servidor local.
3. **Capa de Procesamiento**: Servidor LAN/WAN que expone los datos a través de una API REST.
4. **Capa de Presentación**: Interfaz web para visualizar y gestionar la información del paciente.

-------

## Fotografías del Prototipo


**Prototipo de maqueta**
![Prototipo](https://i.ibb.co/cX30m4T2/prototipo.jpg)

**Modelo de maqueta finalizada**
![Prototipo](https://i.ibb.co/PvZv5G8b/maqueta.jpg)


## Mockups de la Aplicación Web/Móvil


**LOGIN**
Login intuitivo para que el doctor acceda de manera amigable al menu pricipal
![Login](https://i.ibb.co/yc2CmBVr/LOGIN.png)

**Menu principal**
Menu en el cual el doctor podra acceder a cualquiera de las 3 opciones disponibles, acercando el tag correspondiente para poder acceder al formulario y poder agregar a un nuevo paciente
![Vista Principal](https://i.ibb.co/vxrgW6VJ/MENU-PRINCIPAL.png)


**Formulario**
Formulario en el cual el doctor podra registrar cada paciente almacenandolo en cada tag correspondiente sin problema alguno
![Formulario](https://i.ibb.co/xthJtGpf/FORMULARIO.png)


**Signos vitales**
Apartado donde el medico podra visualizar en tiempo real las graficas correspondientes de la frecuencia cardiaca y la calidad de aire dentro de la habitacion del paciente
![Signos vitales](https://i.ibb.co/nxKX4RH/SIGNOS.png)


**Ficha de identificacion**
Ficha del paciente, donde el medico podra acceder a ella para poder visualizar los datos del mismo, dar de alta y generar un reporte de los datos del paciente
![Ficha](https://i.ibb.co/8nWZ63Y3/FICHA.png)

## Diagramas de Conexiones

**Sensor RFID**

| Pin RFID RC522 | Pin Arduino Uno | Descripción |
|--------------|--------------|-------------|
| VCC          | 3.3V         | Alimentación del módulo RFID |
| GND          | GND          | Tierra |
| RST          | 9            | Reinicio del módulo |
| SDA (SS)     | 10           | Selección de esclavo (SPI) |
| SCK          | 13           | Reloj serial SPI |
| MOSI         | 11           | Master Out Slave In (SPI) |
| MISO         | 12           | Master In Slave Out (SPI) |


**Sensor AD8232**



| Pin AD8232   | Pin Arduino Uno | Descripción |
|-------------|----------------|-------------|
| GND         | GND            | Tierra |
| 3.3V        | 3.3V           | Alimentación del módulo |
| OUTPUT      | A0             | Salida de señal analógica (ECG) |
| LO-         | 11             | Detección de desconexión de electrodo (-) |
| LO+         | 10             | Detección de desconexión de electrodo (+) |



**Sensor MQ135**
| Pin MQ-135  | Pin Arduino Uno | Descripción |
|------------|----------------|-------------|
| VCC        | 5V             | Alimentación del sensor |
| GND        | GND            | Tierra |
| A0         | A0             | Salida analógica de concentración de gas |
| D0         | 7    | Salida digital  |




**Conexiones en simulador**
![Ficha](https://i.ibb.co/HW7vCTJ/conexiones.jpg)

**Conexiones Fisicas de cada sensor**
![Ficha](https://i.ibb.co/jvfNm6Wh/conexionezzzzzzzzzzzzzzzzzzzzzzzzzzzzz.jpg)



#### Notas para sensor RFID:
- Es importante alimentar el módulo **RFID RC522** con **3.3V**, ya que **5V pueden dañarlo**.
- Asegúrate de usar la librería **MFRC522** para manejar el módulo en Arduino.


#### Notas para sensor AD8232:
- El **pin OUTPUT** del AD8232 debe conectarse a una entrada analógica del Arduino, por defecto **A0**.
- Los pines **LO+** y **LO-** se pueden usar para detectar si los electrodos están correctamente colocados.
- Es recomendable usar una resistencia pull-up de **10kΩ** en los pines **LO+** y **LO-** para evitar lecturas erróneas.
- El sensor **requiere electrodos adhesivos** para obtener mediciones correctas.

#### Notas para MQ-135:
- El **pin A0** proporciona una **salida analógica** proporcional a la concentración de gases detectados.
- El **pin D0** ofrece una **salida digital** que se activa cuando la concentración supera un umbral ajustable con el potenciómetro del módulo.
- Es recomendable dejar el sensor precalentando unos minutos antes de tomar mediciones precisas.
- Se recomienda usar la librería **MQ135.h** para facilitar la calibración y lectura de datos.




## Diagrama de Arquitectura de Software

aqui iria todo lo relacionado al backend y la comunicacion con el front

## API Contracts

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

components:
  schemas:
    Paciente:
      type: object
      properties:
        nombres:
          type: string
        edad:
          type: integer
        diagnostico:
          type: string
      additionalProperties: true
```



## Repositorio de GitHub
*https://github.com/joshi20022021/ACE2-1S-G4.git*

-------


