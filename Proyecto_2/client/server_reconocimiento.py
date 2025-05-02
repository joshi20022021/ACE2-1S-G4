import cv2
import face_recognition
import os
import imutils
import asyncio
import websockets
#import mysql.connector
#from datetime import datetime

'''db_config = {
    'host': 'mi-rds-endpoint.us-east-1.rds.amazonaws.com',
    'user': 'admin',
    'password': 'tu_clave',
    'database': 'nombre_de_tu_base'
}

def registrar_usuario(nombre):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO usuarios (nombre, fecha) VALUES (%s, %s)"
        cursor.execute(sql, (nombre, now))

        conn.commit()
        cursor.close()
        conn.close()
        print(f"[+] Usuario registrado en BD: {nombre} a las {now}")
    except Exception as e:
        print(f"[!] Error al insertar en BD: {e}")'''

'''if best_match is not None and matches[best_match]:
    name = known_names[best_match]
    registrar_usuario(name)  # <- aquí insertamos en la RDS
    return jsonify({"name": name})
'''

# Buscar cámara USB
def find_external_camera(max_idx=5):
    for idx in range(0, max_idx):  # 🔁 desde 0 ahora
        cap = cv2.VideoCapture(idx)
        if cap.isOpened():
            print(f"Cámara encontrada en índice {idx}")
            cap.release()
            return idx
        cap.release()
    raise RuntimeError("No encontré ninguna cámara disponible.")

# Cargar rostros conocidos
known_encodings = []
known_names = []
for filename in os.listdir("known_faces"):
    path = os.path.join("known_faces", filename)
    name, _ = os.path.splitext(filename)
    image = face_recognition.load_image_file(path)
    encs = face_recognition.face_encodings(image)
    if encs:
        known_encodings.append(encs[0])
        known_names.append(name)
print(f"[+] {len(known_names)} rostros conocidos cargados.")

# Servidor WebSocket: detectar rostro y enviar nombre
async def face_recognition_server(websocket):
    cam_idx = find_external_camera()
    cap = cv2.VideoCapture(cam_idx)

    if not cap.isOpened():
        await websocket.send("ERROR: No se pudo abrir la cámara.")
        return

    print("[+] Esperando detección facial...")

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        small_frame = imutils.resize(frame, width=640)
        rgb_small = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_small)
        face_encodings = face_recognition.face_encodings(rgb_small, face_locations)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.5)
            name = "Desconocido"
            distances = face_recognition.face_distance(known_encodings, face_encoding)
            best = distances.argmin() if len(distances) > 0 else None
            if best is not None and matches[best]:
                name = known_names[best]
                print(f"[+] Persona detectada: {name}")
                await websocket.send(name)
                await asyncio.sleep(2)  # Esperar un poco antes de detectar de nuevo

        await asyncio.sleep(0.1)

    cap.release()

# Arrancar servidor WebSocket en localhost:8765
async def main():
    print("[*] Servidor WebSocket escuchando en ws://localhost:8765")
    async with websockets.serve(face_recognition_server, "localhost", 8765):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
