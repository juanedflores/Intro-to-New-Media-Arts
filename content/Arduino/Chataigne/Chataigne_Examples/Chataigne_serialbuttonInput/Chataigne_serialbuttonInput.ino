int digitalSensor;

void setup() {
  pinMode(2, INPUT);
  Serial.begin(115200);
}

void loop() {
  digitalSensor = digitalRead(2);
  Serial.print("A ");
  Serial.println(digitalSensor, DEC);
  delay(10);
}
