int led_r = 13;
int led_g = 12;
int led_b = 11;

int led_delay_r = 100;
int led_delay_g = 100;
int led_delay_b = 100;

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(led_r, OUTPUT);
  pinMode(led_g, OUTPUT);
  pinMode(led_b, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  led_delay_r = random(100);
  digitalWrite(led_r, HIGH);
  delay(led_delay_r);
  digitalWrite(led_r, LOW);
  delay(led_delay_r);

  led_delay_g = random(100);
  digitalWrite(led_g, HIGH);
  delay(led_delay_g);
  digitalWrite(led_g, LOW);
  delay(led_delay_g);

  led_delay_b = random(100);
  digitalWrite(led_b, HIGH);
  delay(led_delay_b);
  digitalWrite(led_b, LOW);
  delay(led_delay_b);
}
