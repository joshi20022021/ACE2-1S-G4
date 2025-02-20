#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 53 
#define RST_PIN 5 

const int pinMQ135_DO = 2;  // Salida digital del MQ-135 (DO)
const int pinMQ135_AO = A1; // Salida analógica del MQ-135 (AO)

// EGC
#define LO_Mas 10
#define LO_Menos 11

// Pin para la interrupción
const int pinBotonPausa = 18; 

MFRC522 rfid(SS_PIN, RST_PIN);  // Crear objeto para el módulo RC522
MFRC522::MIFARE_Key key;



String Leido = "";

// Variable global que indica si el sistema está en pausa
volatile bool paused = false;

// ISR (Interrupción) para el botón
void ISR_togglePause() {
  // Cada vez que ocurre la interrupción, invertimos "paused"
  paused = !paused;
}

// -----------------------------------------------------
void setup() {
  // initialize the serial communication:
  Serial.begin(9600);

  pinMode(LO_Mas, INPUT); // Setup for leads off detection LO +
  pinMode(LO_Menos, INPUT); // Setup for leads off detection LO -

  pinMode(pinMQ135_DO, INPUT);  // Entrada digital (DO)

  // --- Configuración del botón con interrupción ---
  pinMode(pinBotonPausa, INPUT_PULLUP); 
  attachInterrupt(digitalPinToInterrupt(pinBotonPausa), ISR_togglePause, FALLING);
  // ------------------------------------------------

  SPI.begin();         // Inicializa SPI
  rfid.PCD_Init();     // Inicializa el módulo RFID

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
}

// -----------------------------------------------------
void loop() {

  // -------------------------------------
  // 1) Revisamos si estamos en pausa:
  //    - Si "paused == true", no hacemos nada del trabajo principal.
  // -------------------------------------
  if (paused) {
    // O puedes imprimir un mensaje si quieres ver que está en pausa
    Serial.println("Mensaje:Sistema en PAUSA. Pulsa el botón para reanudar.");
    delay(500);  // Para no saturar el serial
    return;      // Salimos de loop()
  }

  // -------------------------------------
  // 2) Si NO estamos en pausa, procedemos con el código habitual
  // -------------------------------------

  // Escribir en tarjeta si Java me manda un dato
  if (Serial.available() > 0) {
    int indicePaciente = Serial.parseInt(); // Recibir el índice
    Serial.println("Mensaje:Esperando Tarjeta");

    // Esperar hasta que haya una tarjeta presente
    while (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
      delay(100); 
      // Nota: en este 'while' sigues verificando la tarjeta,
      //       podrías también respetar la pausa aquí si prefieres.
      //       Habría que chequear si "paused" cambió.
      if (paused) return; 
    }

    String mensaje = String(indicePaciente);
    Serial.println("Mensaje: Indice entrada " + mensaje);
    escribirDatosEnTarjeta(mensaje);
  }

  // Manejo del ECG:
  if ((digitalRead(10) == 1) || (digitalRead(11) == 1)) {
    // No hacemos nada si leads off
  } else {
    // send the value of analog input 0:
    Serial.print("ecg:");
    Serial.println(analogRead(A0));
  }

  // Lectura MQ-135:
  int valorAnalogico = analogRead(pinMQ135_AO);
  Serial.print("oxigeno:");
  Serial.println(valorAnalogico);

  // Lectura de tarjeta (si está presente)
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {

    Serial.print("UID:");
    for (byte i = 0; i < rfid.uid.size; i++) {
      Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
      Serial.print(rfid.uid.uidByte[i], HEX);
    }
    Serial.println();

    String datos = leerDatosDeTarjeta();
    Serial.print("Paciente:");
    Serial.println(datos);

    // Detenemos la comunicación con la tarjeta
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }

  delay(1000);
}

// -----------------------------------------------------
void escribirDatosEnTarjeta(String mensaje) {
  byte dataBlock[16]; 
  memset(dataBlock, ' ', 16);  // Rellenar con espacios

  // Copiar mensaje (máx 16 caracteres)
  for (byte i = 0; i < mensaje.length() && i < 16; i++) {
    dataBlock[i] = mensaje[i];
  }

  byte bloque = 4; // Escribir solo en Bloque 4

  // Liberar cualquier autenticación previa
  rfid.PCD_StopCrypto1();

  // Autenticar Bloque 4
  MFRC522::StatusCode status = rfid.PCD_Authenticate(
    MFRC522::PICC_CMD_MF_AUTH_KEY_A, 
    bloque, 
    &key, 
    &(rfid.uid)
  );

  if (status != MFRC522::STATUS_OK) {
    Serial.print("Mensaje: Error en autenticación en Bloque 4 -> ");
    Serial.println(rfid.GetStatusCodeName(status));
    return;
  }

  // Intentar escribir
  status = rfid.MIFARE_Write(bloque, dataBlock, 16);
  if (status == MFRC522::STATUS_OK) {
    Serial.println("Mensaje: Escritura exitosa en Bloque 4!");
  } else {
    Serial.print("Mensaje: Error al escribir en Bloque 4 -> ");
    Serial.println(rfid.GetStatusCodeName(status));
  }

  // Liberar la tarjeta después de escribir
  rfid.PCD_StopCrypto1();
}

// -----------------------------------------------------
String leerDatosDeTarjeta() {
  byte dataBlock[18];  // 16 bytes de datos + 2 de control
  String mensaje = "";

  byte bloque = 4;  // Leer solo Bloque 4
  byte bufferLen = sizeof(dataBlock);

  // Autenticar Bloque 4
  if (rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid)) != MFRC522::STATUS_OK) {
    return "*"; // Error autenticación
  }

  // Leer Bloque 4
  if (rfid.MIFARE_Read(bloque, dataBlock, &bufferLen) != MFRC522::STATUS_OK) {
    return "*"; // Error lectura
  }

  // Convertir bytes a String (solo chars imprimibles)
  for (byte i = 0; i < 16; i++) {
    char c = (char)dataBlock[i];
    if (c >= 32 && c <= 126) {
      mensaje += c;
    }
  }

  rfid.PCD_StopCrypto1(); // Liberar la tarjeta
  
  return mensaje.length() > 0 ? mensaje : "*";
}