#define LED1 11
#define LED2 10
#define LED3 9
#define POTENCIOMETRO A1 

const int sensorPin = A0;
const int bombaPin = 8; // Este pin irá conectado al GND de la bomba
int sensorValue = 0;||
int porcentajeHumedad = 0;

void setup() {
  Serial.begin(9600);
  pinMode(bombaPin, OUTPUT);
  digitalWrite(bombaPin, LOW); // Bomba apagada al inicio

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  porcentajeHumedad = map(sensorValue, 1023, 300, 0, 100);
  porcentajeHumedad = constrain(porcentajeHumedad, 0, 100);

  Serial.print("Humedad: ");
  Serial.println(porcentajeHumedad);

  if (porcentajeHumedad < 30) {
    digitalWrite(bombaPin, LOW); // Activar "tierra", encender bomba
  } else {
    digitalWrite(bombaPin, HIGH); // Desactivar tierra (corte de circuito), apaga bomba
  }

  int valorPotenciometro = analogRead(POTENCIOMETRO);
  int brillo = valorPotenciometro / 4;
  analogWrite(LED1, brillo);
  analogWrite(LED2, brillo);
  analogWrite(LED3, brillo);
  Serial.print("Brillo: ");
  Serial.println(brillo);


  delay(500);
}
