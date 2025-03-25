import paho.mqtt.client as mqtt
import mysql.connector

# Conexión a RDS
db_config = {
    'host': 'arqui-2.ciir7ihqfr2n.us-east-2.rds.amazonaws.com',
    'user': 'ACYE2',
    'password': 'Sucios!344',
    'database': 'ACYE2',
    'port': 3306
}

oxigeno = None
frecuencia = None

# Conectamos a la base de datos
try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    print("✅ Conectado a la base de datos RDS")
except mysql.connector.Error as err:
    print("❌ Error de conexión:", err)
    exit()

def get_next_id():
    cursor.execute("SELECT IFNULL(MAX(id), 0) + 1 FROM Signos_Vitales")
    return cursor.fetchone()[0]

def get_last_diagnostico_id():
    cursor.execute("SELECT id FROM Diagnósticos ORDER BY id DESC LIMIT 1")
    result = cursor.fetchone()
    return result[0] if result else None

def insertar_signos(ox, fc):
    try:
        id_signo = get_next_id()
        diagnostico_id = get_last_diagnostico_id()

        if diagnostico_id is None:
            print("❌ No hay Diagnósticos disponibles para asociar.")
            return

        cursor.execute("""
            INSERT INTO Signos_Vitales (id, Oxigenacion, Frecuencia_Cardiaca, Diagnósticos_id)
            VALUES (%s, %s, %s, %s)
        """, (id_signo, ox, fc, diagnostico_id))

        conn.commit()
        print(f"✅ Insertado: id={id_signo}, Oxigenacion={ox}, Frecuencia_Cardiaca={fc}, Diagnóstico={diagnostico_id}")

    except Exception as e:
        print("❌ Error al insertar en MySQL:", e)

def on_connect(client, userdata, flags, rc):
    print("✅ Conectado al broker MQTT")
    client.subscribe("sensores/#")

def on_message(client, userdata, msg):
    global oxigeno, frecuencia

    topico = msg.topic
    dato = msg.payload.decode()
    print(f"📩 {topico}: {dato}")

    if topico == "sensores/oxigeno":
        oxigeno = int(dato)
    elif topico == "sensores/ecg":
        frecuencia = int(dato)

    if oxigeno is not None and frecuencia is not None:
        insertar_signos(oxigeno, frecuencia)
        oxigeno = None
        frecuencia = None

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("localhost", 1883, 60)
client.loop_forever()