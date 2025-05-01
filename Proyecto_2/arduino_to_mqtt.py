import serial
import paho.mqtt.client as mqtt

# Configuración del puerto serial (ajusta el COM según tu sistema)
puerto_serial = "COM4"  # Cambia a /dev/ttyUSB0 si usas Linux
baudrate = 9600

# Configuración del broker MQTT
mqtt_broker = "3.16.139.219"
mqtt_puerto = 1883
mqtt_tema = "sensor/humedad"

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

            # Solo publica si empieza con "Humedad:"
            if linea.startswith("Humedad:"):
                cliente.publish(mqtt_tema, linea)
except KeyboardInterrupt:
    print("⛔ Finalizado por el usuario.")
    ser.close()
