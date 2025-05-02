import serial
import paho.mqtt.client as mqtt

# Configuración del puerto serial
puerto_serial = "COM5"  # Cambia según tu sistema
baudrate = 9600

# Configuración del broker MQTT
mqtt_broker = "3.16.139.219"
mqtt_puerto = 1883

# Tópicos para cada tipo de dato
topico_humedad = "sensor/humedad"
topico_brillo = "sensor/brillo"

# Conectar al puerto serial
try:
    ser = serial.Serial(puerto_serial, baudrate)
    print(f"✔️ Escuchando en {puerto_serial} a {baudrate} baud")
except:
    print("❌ No se pudo abrir el puerto serial.")
    exit()

# Conectar al broker MQTT
cliente = mqtt.Client()
try:
    cliente.connect(mqtt_broker, mqtt_puerto, 60)
    print(f"✔️ Conectado a MQTT broker {mqtt_broker}:{mqtt_puerto}")
except:
    print("❌ No se pudo conectar al broker MQTT.")
    ser.close()
    exit()

# Leer y enviar datos continuamente
try:
    while True:
        if ser.in_waiting:
            linea = ser.readline().decode('utf-8').strip()
            print(f"📨 Recibido: {linea}")

            # Publicar según el tipo de dato recibido
            if linea.startswith("Humedad:"):
                cliente.publish(topico_humedad, linea)
            elif linea.startswith("Brillo:"):
                cliente.publish(topico_brillo, linea)

except KeyboardInterrupt:
    print("⛔ Finalizado por el usuario.")
    ser.close()
