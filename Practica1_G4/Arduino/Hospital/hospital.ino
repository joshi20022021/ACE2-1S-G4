

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 53 
#define RST_PIN 5 

const int pinMQ135_DO = 2;  // Salida digital del MQ-135 (DO)
const int pinMQ135_AO = A1; // Salida analógica del MQ-135 (AO)
const int pinLED = 8;       // LED de advertencia
 
MFRC522 rfid(SS_PIN, RST_PIN);  // Crear objeto para el módulo RC522
MFRC522::MIFARE_Key key;

String Leido = "";


void setup() {
  // initialize the serial communication:
  Serial.begin(9600);
  pinMode(10, INPUT); // Setup for leads off detection LO +
  pinMode(11, INPUT); // Setup for leads off detection LO -

  pinMode(pinMQ135_DO, INPUT);  // Entrada digital (DO)

  SPI.begin();         // Inicializa SPI
  rfid.PCD_Init();     // Inicializa el módulo RFID

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

}
 
void loop() {



  // Escribir en tarjeta si java me manda un dato
  if (Serial.available() > 0) {
    int indicePaciente = Serial.parseInt(); // Recibir el índice

    //Serial.print("Índice recibido: ");
    Serial.println("Mensaje:Esperando Tarjeta");
      while (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    delay(100); 
  }

    // Esperar hasta que una tarjeta esté presente
    //Serial.println(" Tarjeta detectada. Escribiendo datos...");
    String mensaje = String(indicePaciente);
    Serial.println("Mensaje: Indice entrada "+mensaje);
    escribirDatosEnTarjeta(mensaje);

    //Serial.print("Paciente:");
    //Leido = leerDatosDeTarjeta();
    //Serial.println(Leido+" ");
    
  }


  // Escribir en tarjeta si java me manda un dato
   if((digitalRead(10) == 1)||(digitalRead(11) == 1)){
    } else{
      // send the value of analog input 0:
      Serial.print("ecg:");
      Serial.println(analogRead(A0));
    }
    // Leer la señal analógica (0 - 1023)
    int valorAnalogico = analogRead(pinMQ135_AO);

    // Mostrar en el Monitor Serial
    Serial.print("oxigeno:");
    Serial.println(valorAnalogico);

  // 1) Revisa si hay una tarjeta presente y si se pudo leer su serial
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    // Aquí ya es válido leer el UID:
    Serial.print("UID:");
    for (byte i = 0; i < rfid.uid.size; i++) {
      Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
      Serial.print(rfid.uid.uidByte[i], HEX);
    }
    Serial.println();

    // Si quieres leer datos de la tarjeta:
    String datos = leerDatosDeTarjeta();
    Serial.print("Paciente:");
    Serial.println(datos);

    // O escribir (dependiendo de la lógica que quieras).
    // ...

    // Una vez terminado, se “desactiva” la tarjeta:
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  } 


     // Detiene la comunicación con la tarjeta
  //Wait for a bit to keep serial data from saturating
  delay(1000);
}


void escribirDatosEnTarjeta(String mensaje) {
    byte dataBlock[16]; 
    memset(dataBlock, ' ', 16);  // Rellenar con espacios

    // Copiar mensaje (máx 16 caracteres)
    for (byte i = 0; i < mensaje.length() && i < 16; i++) {
        dataBlock[i] = mensaje[i];
    }

    byte bloque = 4; // Escribir solo en Bloque 4

    // **No verificar tarjeta de nuevo, asumir que ya está presente**
    //Serial.println("Mensaje: Iniciando escritura en Bloque 4.");

    // **Liberar cualquier autenticación previa**
    rfid.PCD_StopCrypto1();

    // **Intentar autenticar Bloque 4**
    MFRC522::StatusCode status = rfid.PCD_Authenticate(
        MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid)
    );

    if (status != MFRC522::STATUS_OK) {
        Serial.print("Mensaje: Error en autenticación en Bloque 4 -> ");
        Serial.println(rfid.GetStatusCodeName(status));
        return;
    }

    // **Intentar escribir**
    status = rfid.MIFARE_Write(bloque, dataBlock, 16);
    if (status == MFRC522::STATUS_OK) {
        Serial.println("Mensaje: Escritura exitosa en Bloque 4!");
    } else {
        Serial.print("Mensaje: Error al escribir en Bloque 4 -> ");
        Serial.println(rfid.GetStatusCodeName(status));
    }

    // **Liberar la tarjeta después de escribir**
    rfid.PCD_StopCrypto1();
}






String leerDatosDeTarjeta() {
    byte dataBlock[18];  // 16 bytes de datos + 2 de control
    String mensaje = "";

    byte bloque = 4;  // Leer solo Bloque 4
    byte bufferLen = sizeof(dataBlock);

    // **Autenticar Bloque 4**
    if (rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid)) != MFRC522::STATUS_OK) {
        return "*"; // Error autenticación
    }

    // **Leer Bloque 4**
    if (rfid.MIFARE_Read(bloque, dataBlock, &bufferLen) != MFRC522::STATUS_OK) {
        return "*"; // Error lectura
    }

    // **Convertir bytes a String**
    for (byte i = 0; i < 16; i++) {
        char c = (char)dataBlock[i];
        if (c >= 32 && c <= 126) mensaje += c;  // Solo caracteres imprimibles
    }

    // **DETENER CRYPTO para liberar la tarjeta**
    rfid.PCD_StopCrypto1();
    
    return mensaje.length() > 0 ? mensaje : "*";
}


/*   Conexión con arduino mega
 *   SDA (SS)  ->  53
 *   SCK       ->  52
 *   MOSI      ->  51
 *   MISO      ->  50
 *   RST       ->  5
 *   GND       ->  GND
 *   3.3V      ->  3.3V 
 */
