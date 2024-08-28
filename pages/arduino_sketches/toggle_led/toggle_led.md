---
heading: Toggle LED with Button
---

#### Summary

Instead of lighting the LED when the button is pressed, pushing the button will result in toggling the state of the LED from changing between on and off.

### Wiring

<img style="height:300px" src="./toggle_led_wiring.png"></img>

### The Sketch

```c
#define LED_PIN 8
#define BUTTON_PIN 7

int lastButtonState = LOW;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  
  if (buttonState != lastButtonState) {
    lastButtonState = buttonState;
    if (buttonState == LOW) {
      if(digitalRead(ledState == HIGH)) {
        digitalWrite(LED_PIN, LOW);
      } else {
        digitalWrite(LED_PIN, HIGH);
      }
    }
  }
}
```
