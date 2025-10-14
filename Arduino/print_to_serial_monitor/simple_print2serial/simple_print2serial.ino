int count = 0;

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  // print out the current count
  Serial.println(count);
  // increment the count by 1
  count = count + 1;
  // pause the program for 1 second
  delay(1000);
}
