import paho.mqtt.client as mqtt
import mysql.connector
from datetime import datetime

# Configuración de la base de datos (ajústalo a tu setup)
conexion = mysql.connector.connect(
    host="acye2.cnqa2sk8srfr.us-east-2.rds.amazonaws.com",       # o IP si es externa
    user="admin",      # ⚠️ Cambia esto
    password="Sucio!2244", # ⚠️ Cambia esto
    database="ACYE2"      # ⚠️ Cambia esto
)
cursor = conexion.cursor()
print("✅ Conexión a base de datos exitosa") 

# Variables temporales
humedad_actual = None
brillo_actual = None

# Función callback al recibir mensajes
def on_message(client, userdata, msg):
    global humedad_actual, brillo_actual

    mensaje = msg.payload.decode()
    topico = msg.topic

    print(f"📥 {topico}: {mensaje}")

    if topico == "sensor/humedad":
        humedad_actual = int(mensaje.split(":")[1].strip())

    elif topico == "sensor/brillo":
        brillo_actual = int(mensaje.split(":")[1].strip())

    # Insertar solo si hay ambos valores
    if humedad_actual is not None and brillo_actual is not None:
        calidad_aire = -1  # Valor por defecto
        fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        sql = """
        INSERT INTO Productivibad_bienestar (CalidadAire, Humedad, Luminosidad, Fecha)
        VALUES (%s, %s, %s, %s)
        """
        valores = (calidad_aire, humedad_actual, brillo_actual, fecha)
        cursor.execute(sql, valores)
        conexion.commit()
        print(f"✅ Insertado en DB: H={humedad_actual}, B={brillo_actual}, F={fecha}")

        # Resetear
        humedad_actual = None
        brillo_actual = None

# Configurar cliente MQTT
cliente = mqtt.Client()
cliente.on_message = on_message
cliente.connect("localhost", 1883, 60)

# Suscribirse a los tópicos
cliente.subscribe("sensor/humedad")
cliente.subscribe("sensor/brillo")

print("🟢 Escuchando MQTT y listo para insertar en la base de datos...")
cliente.loop_forever()
