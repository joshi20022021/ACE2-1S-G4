from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import numpy as np
import cv2
import base64
import os
from io import BytesIO
from PIL import Image
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- Configuración de la base de datos RDS ---
db_config = {
    'host': 'acye2.cnqa2sk8srfr.us-east-2.rds.amazonaws.com',  # 🔁 reemplaza con tu endpoint real
    'user': 'admin',
    'password': 'Sucio!2244',
    'database': 'ACYE2'  # 🔁 reemplaza con el nombre de tu base
}

# --- Función para verificar si el usuario existe ---
def usuario_existe(nombre):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = "SELECT COUNT(*) FROM Usuario WHERE Nombre = %s"
        cursor.execute(query, (nombre,))
        result = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return result > 0
    except Exception as e:
        print(f"[!] Error al consultar usuario en RDS: {e}")
        return False

# --- Función para registrar ingreso con fecha ---
def registrar_ingreso(nombre):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO Usuario (Nombre, Fecha) VALUES (%s, %s)"
        cursor.execute(query, (nombre, now))
        conn.commit()
        cursor.close()
        conn.close()
        print(f"[+] Ingreso registrado: {nombre} - {now}")
    except Exception as e:
        print(f"[!] Error al registrar ingreso: {e}")

# --- Cargar rostros conocidos ---
known_encodings = []
known_names = []

def load_known_faces():
    global known_encodings, known_names
    known_encodings = []
    known_names = []

    for filename in os.listdir("known_faces"):
        path = os.path.join("known_faces", filename)
        name, _ = os.path.splitext(filename)  # quitar extensión
        image = face_recognition.load_image_file(path)
        encs = face_recognition.face_encodings(image)
        if encs:
            known_encodings.append(encs[0])
            known_names.append(name)
            print(f"[+] Rostro cargado: {name}")
        else:
            print(f"[!] No se detectó rostro en: {filename}")

load_known_faces()
print(f"[+] Total rostros cargados: {len(known_names)}")

# --- Endpoint principal ---
@app.route("/verify", methods=["POST"])
def verify():
    data = request.get_json()
    img_b64 = data.get("image")

    if not img_b64:
        return jsonify({"error": "No image provided"}), 400

    # Decodificar imagen base64
    img_data = base64.b64decode(img_b64.split(",")[1])
    pil_img = Image.open(BytesIO(img_data)).convert("RGB")
    np_img = np.array(pil_img)

    # Detectar rostros
    face_locations = face_recognition.face_locations(np_img)
    face_encodings = face_recognition.face_encodings(np_img, face_locations)

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.5)
        name = "Desconocido"
        distances = face_recognition.face_distance(known_encodings, face_encoding)
        best_match = np.argmin(distances) if distances.size > 0 else None

        if best_match is not None and matches[best_match]:
            name = known_names[best_match]
            print(f"[+] Rostro detectado: {name}")

            if usuario_existe(name):
                registrar_ingreso(name)
                return jsonify({"name": name})
            else:
                print(f"[!] Usuario '{name}' no autorizado.")
                return jsonify({"name": "No autorizado"})

    return jsonify({"name": "Desconocido"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

