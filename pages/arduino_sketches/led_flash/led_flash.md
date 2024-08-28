---
heading: LED Flash with Functions
---

#### Summary

#### The Sketches

```C
int ledPin = 13;
int delayPeriod = 250;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  for (int i = 0; i < 20; i++) {
    flash(); 
  }
  delay(3000);
}

void flash() {
  digitalWrite(ledPin, HIGH);
  delay(delayPeriod);
  digitalWrite(ledPin, LOW);
  delay(delayPeriod);
}
```

##### Parameters
```C
int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  flash(20, 250); 
  delay(3000);
}

void flash(int numFlashes, int delayPeriod) {
  for (int i = 0; i < numFlashes; i++) {
    digitalWrite(ledPin, HIGH);
    delay(delayPeriod);
    digitalWrite(ledPin, LOW);
    delay(delayPeriod);
  }
}
```
