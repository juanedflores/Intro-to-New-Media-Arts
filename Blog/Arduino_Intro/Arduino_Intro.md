---
title: Intro to Arduino
---

# Arduino RGB LED Fade Example

```c
/*
   Fade

   This example shows how to fade an LED on pin 9 using the analogWrite()
   function.

   The analogWrite() function uses PWM, so if you want to change the pin you're
   using, be sure to use another PWM capable pin. On most Arduino, the PWM pins
   are identified with a "~" sign, like ~3, ~5, ~6, ~9, ~10 and ~11.

   This example code is in the public domain.

   https://www.arduino.cc/en/Tutorial/BuiltInExamples/Fade
 */
int ledr = 12;
int ledg = 11;
int ledb = 10;
int brightnessr = 0;
int brightnessg = 90;
int brightnessb = 150;
int fadeAmountr = 5;
int fadeAmountg = 5;
int fadeAmountb = 5;

// the setup routine runs once when you press reset:
void setup() {
    // declare pin 9 to be an output:
    pinMode(ledr, OUTPUT);
    pinMode(ledg, OUTPUT);
    pinMode(ledb, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
    // set the brightness of pin 9:
    analogWrite(ledr, brightnessr);
    analogWrite(ledg, brightnessg);
    analogWrite(ledb, brightnessb);

    // change the brightness for next time through the loop:
    brightnessr = brightnessr + fadeAmountr;
    brightnessg = brightnessg + fadeAmountg;
    brightnessb = brightnessb + fadeAmountb;

    // reverse the direction of the fading at the ends of the fade:
    if (brightnessr <= 0 || brightnessr >= 255) {
        fadeAmountr = -fadeAmountr;
    }
    if (brightnessr <= 0 || brightnessr >= 255) {
        fadeAmountg = -fadeAmountg;
    }
    if (brightnessr <= 0 || brightnessr >= 255) {
        fadeAmountb = -fadeAmountb;
    }
    // wait for 30 milliseconds to see the dimming effect
    delay(30);
}
```
