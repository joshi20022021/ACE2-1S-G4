import serial
import paho.mqtt.client as mqtt

SERIAL_PORT = 'COM5' 
BAUD_RATE = 9600

# Configuración del broker MQTT
MQTT_BROKER = "localhost"
MQTT_PORT = 1883

# Conexión MQTT
client = mqtt.Client()
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Abrir el puerto serial
ser = serial.Serial(SERIAL_PORT, BAUD_RATE)
print(f"Conectado a {SERIAL_PORT}, escuchando datos del Arduino...")

while True:
    try:
        line = ser.readline().decode('utf-8').strip()
        print("Dato leído:", line)

        # Publicar en diferentes tópicos según el dato
        if line.startswith("ecg:"):
            client.publish("sensores/ecg", line.split(":")[1])
        elif line.startswith("oxigeno:"):
            client.publish("sensores/oxigeno", line.split(":")[1])
        elif line.startswith("UID:"):
            client.publish("sensores/rfid_uid", line[4:].strip())
        elif line.startswith("Paciente:"):
            client.publish("sensores/paciente", line[9:].strip())
        elif line.startswith("Mensaje:"):
            client.publish("sensores/mensaje", line[8:].strip())

    except Exception as e:
        print("Error:", e)