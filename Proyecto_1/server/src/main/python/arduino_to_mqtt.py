import serial
import paho.mqtt.client as mqtt

SERIAL_PORT = 'COM5' 
BAUD_RATE = 9600

MQTT_BROKER = "localhost"
MQTT_PORT = 1883

client = mqtt.Client()
client.connect(MQTT_BROKER, MQTT_PORT, 60)

ser = serial.Serial(SERIAL_PORT, BAUD_RATE)
print(f"Conectado a {SERIAL_PORT}, escuchando datos del Arduino...")

while True:
    try:
        line = ser.readline().decode('utf-8').strip()
        print("Dato leído:", line)

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
        elif line.startswith("Camilla"):
            partes = line.split(",")
            if len(partes) == 3:
                id_camilla = partes[1].strip()
                estado = partes[2].strip()
                mensaje = f"{id_camilla},{estado}"
                client.publish("sensores/camilla", mensaje)
                print(f"📤 Publicado a sensores/camilla: {mensaje}")

    except Exception as e:
        print("Error:", e)