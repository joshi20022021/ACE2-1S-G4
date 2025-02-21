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
![Login](https://i.ibb.co/LD1VjdH5/Captura-de-pantalla-2025-02-14-151659.png)

**Menu principal**
Menu en el cual el doctor podra acceder a cualquiera de las 3 opciones disponibles, acercando el tag correspondiente para poder acceder al formulario y poder agregar a un nuevo paciente
![Vista Principal](https://i.ibb.co/93ZxZvWQ/Captura-de-pantalla-2025-02-14-151936.png)


**Formulario**
Formulario en el cual el doctor podra registrar cada paciente almacenandolo en cada tag correspondiente sin problema alguno
![Formulario](https://i.ibb.co/7J9ZPfT7/Captura-de-pantalla-2025-02-14-152645.png)


**Signos vitales**
Apartado donde el medico podra visualizar en tiempo real las graficas correspondientes de la frecuencia cardiaca y la calidad de aire dentro de la habitacion del paciente
![Signos vitales](https://i.ibb.co/N6Xkv5xX/Captura-de-pantalla-2025-02-14-153248.png)


**Ficha de identificacion**
Ficha del paciente, donde el medico podra acceder a ella para poder visualizar los datos del mismo, dar de alta y generar un reporte de los datos del paciente
![Ficha](https://i.ibb.co/0pMJLFhZ/Captura-de-pantalla-2025-02-14-153650.png)

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
### Endpoints




## Repositorio de GitHub
*https://github.com/joshi20022021/ACE2-1S-G4.git*

-------


