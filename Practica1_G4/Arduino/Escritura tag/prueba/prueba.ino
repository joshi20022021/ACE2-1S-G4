#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 5    
#define SS_PIN 53    

MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

void setup() {
    Serial.begin(9600);
    SPI.begin();
    mfrc522.PCD_Init();
    
    // Configurar clave por defecto (FFFFFFFFFFFF)
    for (byte i = 0; i < 6; i++) {
        key.keyByte[i] = 0xFF;
    }

    pinMode(10, INPUT);
    pinMode(11, INPUT);

    Serial.println("Acerque una tarjeta para leer o escribir...");
}

void loop() {
    if (!mfrc522.PICC_IsNewCardPresent()) return;
    if (!mfrc522.PICC_ReadCardSerial()) return;

    Serial.println("Tarjeta detectada!");

    // Opción 1: Escribir datos
    escribirDatosEnTarjeta("1"); 

    // Opción 2: Leer datos después de escribir
    Serial.println("-->"+leerDatosDeTarjeta()+"<--");

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();

    leerECG();
}

void leerECG(){
   
  if((digitalRead(10) == 1)||(digitalRead(11) == 1)){
    Serial.println('!');
  } else{
    // send the value of analog input 0:
    Serial.println("ECG:"analogRead(A0));
  }
}

void escribirDatosEnTarjeta(String mensaje) {
    byte dataBlock[16]; 
    int mensajeIndex = 0;

    for (byte sector = 1; sector < 16; sector++) {
        for (byte bloque = 0; bloque < 3; bloque++) {  // 🔥 Solo bloques de datos
            byte bloqueReal = (sector * 4) + bloque;

            if (mensajeIndex >= mensaje.length()) {
                Serial.println("Fin de mensaje.");
                return;
            }

            Serial.print("Escribiendo en bloque ");
            Serial.println(bloqueReal);

            memset(dataBlock, 0, sizeof(dataBlock));  // Llenar con ceros
            for (byte i = 0; i < 16; i++) {
                if (mensajeIndex < mensaje.length()) {
                    dataBlock[i] = mensaje[mensajeIndex++];
                } else {
                    dataBlock[i] = ' ';  // Padding con espacios en vez de 0
                }
            }

            MFRC522::StatusCode status = mfrc522.PCD_Authenticate(
                MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloqueReal, &key, &(mfrc522.uid));
            
            if (status != MFRC522::STATUS_OK) {
                Serial.print("Error en autenticación en bloque ");
                Serial.println(bloqueReal);
                continue;
            }

            status = mfrc522.MIFARE_Write(bloqueReal, dataBlock, 16);
            if (status == MFRC522::STATUS_OK) {
                Serial.println("Escritura exitosa!");
            } else {
                Serial.println("Error al escribir.");
            }
        }
    }
}


String leerDatosDeTarjeta() {
    byte dataBlock[18];  // 16 bytes de datos + 2 de control interno
    String mensaje = "";

    //Serial.println("\nLeyendo datos de la tarjeta...");

    for (byte sector = 1; sector < 16; sector++) {  // Evitamos el sector 0
        for (byte bloque = 0; bloque < 3; bloque++) {  // Solo bloques de datos
            byte bloqueReal = (sector * 4) + bloque;
            byte bufferLen = sizeof(dataBlock); // Corregir el tamaño del buffer

            MFRC522::StatusCode status = mfrc522.PCD_Authenticate(
                MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloqueReal, &key, &(mfrc522.uid));
            
            if (status != MFRC522::STATUS_OK) {
                Serial.print("Error en autenticación en bloque ");
                Serial.println(bloqueReal);
                continue;
            }

            status = mfrc522.MIFARE_Read(bloqueReal, dataBlock, &bufferLen);
            if (status == MFRC522::STATUS_OK) {
                bool bloqueVacio = true;
                String temp = "";

                for (byte i = 0; i < 16; i++) {
                    char c = (char)dataBlock[i];

                    if (c > 31 && c < 127) { // Filtrar caracteres imprimibles
                        temp += c;
                        bloqueVacio = false;
                    }
                }

                if (!bloqueVacio) {
                    mensaje += temp;
                }
            }
        }
    }

    return mensaje;
}
