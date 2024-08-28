---
heading: Button
---

<img style="height:300px" src="./button_circuit.png"></img>

<a href="https://docs.arduino.cc/built-in-examples/digital/Button/">Arduino Info Page</a>

`Examples -> Digital -> Button`

```c
// constants won't change. They're used here to set pin numbers:
const int buttonPin = 2;  // the number of the pushbutton pin
const int ledPin = 13;    // the number of the LED pin

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
}
```

<img style="height:300px" src="/arduino_sketches/button/images/button_alternative_circuit.png"></img>

```c
const int buttonPin = 2;
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  // read button state
  state = digitalRead(butpin);
  // check if button is pressed
  if(state == HIGH) {
    digitalWrite(LEDpin, LOW);
  }
  else {
    digitalWrite(LEDpin, HIGH);
  }
}
```

`ÌNPUT_PULLUP` is the same as INPUT (you read data from the sensor), but in addition to that, an internal pull up resistor – between 20k and 50k Ohm – is enabled, to keep the signal HIGH by default.

More info: <a href="https://roboticsbackend.com/arduino-input_pullup-pinmode/">input_pullup</a>
