#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 53 
#define RST_PIN 5 
#define IRQ_PIN 3  // Pin de interrupción del RC522

MFRC522 rfid(SS_PIN, RST_PIN);
volatile bool tarjetaDetectada = false;  // Variable de bandera para la interrupción

void detectarTarjeta() {
    tarjetaDetectada = true;  // Activa la bandera cuando el IRQ es LOW
}

void setup() {
    Serial.begin(115200);  // Velocidad mayor para mejor lectura
    SPI.begin();
    rfid.PCD_Init();

    // ✅ Resetear el RC522 completamente antes de configurar IRQ
    rfid.PCD_Reset();
    
    // ✅ Desactivar todas las interrupciones anteriores
    rfid.PCD_WriteRegister(MFRC522::ComIrqReg, 0x7F);  // Limpiar todas las interrupciones
    rfid.PCD_WriteRegister(MFRC522::ComIEnReg, 0x20);  // Habilitar interrupción por tarjeta detectada

    pinMode(IRQ_PIN, INPUT_PULLUP);  // Configurar IRQ como entrada con pull-up
    attachInterrupt(digitalPinToInterrupt(IRQ_PIN), detectarTarjeta, FALLING);

    Serial.println("🔵 Sistema listo. Esperando tarjeta...");
}

void loop() {
    Serial.print("Estado IRQ: ");
    Serial.println(digitalRead(IRQ_PIN));  // ✅ Verifica si cambia de estado
    
    if (tarjetaDetectada) {
        tarjetaDetectada = false;  // Resetear la bandera para la próxima interrupción

        // ✅ Verificar si el RC522 realmente ha detectado una tarjeta
        if (rfid.PCD_ReadRegister(MFRC522::ComIrqReg) & 0x20) {
            if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
                Serial.print("✅ Tarjeta detectada! UID: ");
                for (byte i = 0; i < rfid.uid.size; i++) {
                    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
                    Serial.print(rfid.uid.uidByte[i], HEX);
                }
                Serial.println();
            }

            rfid.PICC_HaltA();  // Finaliza comunicación con la tarjeta
            rfid.PCD_StopCrypto1();

            // ✅ Restablecer el IRQ después de procesar la tarjeta
            rfid.PCD_WriteRegister(MFRC522::ComIrqReg, 0x7F);
        }
    }

    delay(500);  // Pequeño delay para evitar saturar el serial
}
