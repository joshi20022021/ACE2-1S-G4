#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 53 
#define RST_PIN 5 
#define IRQ_PIN 2  // Pin de interrupción para el RC522

MFRC522 rfid(SS_PIN, RST_PIN);  
volatile bool tarjetaDetectada = false;  // Variable de bandera

void IRAM_ATTR detectarTarjeta() {
    tarjetaDetectada = true;  // Marca que hay una tarjeta
}

void setup() {
    Serial.begin(9600);
    SPI.begin();
    rfid.PCD_Init();

    pinMode(IRQ_PIN, INPUT_PULLUP);  // Configura IRQ como entrada
    attachInterrupt(digitalPinToInterrupt(IRQ_PIN), detectarTarjeta, FALLING);
}

void loop() {
    if (tarjetaDetectada) {
        tarjetaDetectada = false;  // Resetear la bandera

        if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
            Serial.print("Tarjeta detectada! UID: ");
            for (byte i = 0; i < rfid.uid.size; i++) {
                Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
                Serial.print(rfid.uid.uidByte[i], HEX);
            }
            Serial.println();
        }

        rfid.PICC_HaltA();  // Detiene la comunicación con la tarjeta
        rfid.PCD_StopCrypto1();
    }
}
