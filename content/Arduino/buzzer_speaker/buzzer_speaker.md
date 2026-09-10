---
heading: Buzzer Speaker
---

# Buzzer Speaker Workshop

## Materials

 For this workshop, please collect the following:

- Arduino Nano 33 IoT
- Breadboard
- Buzzer

## Buzzers

It's super easy to use piezo buzzers with Arduino's tone() function. Just wire up the buzzer to pin 10 and then to GND with a resistor. The tone() function needs 2 arguments, but can take three:

- Pin#
- Frequency - this is in hertz (cycles per second) which determines the pitch of the noise made
- Duration (optional) - how long the tone plays. If you don't use the duration argument, you should have a delay() function following the tone instead.

Here's a simple example: 

![|400](https://nathanmelenbrink.github.io/lab/output/buzzer/buzzer_uno.png)

```arduino
int buzzerPin = 10;

void setup() {
    pinMode(buzzerPin, OUTPUT);
}

void loop() {
    tone(buzzerPin, 1000, 500);
    delay(1000);
}
```

Note: there have been some issues with the tone() function not working properly with some microcontrollers. In some cases, the tone() function causes the program to not compile. In other cases, it compiles fine but fails to produce sounds. If you experience problems, we recommend pasting the myTone() function below, and using it in the same way. So the above example would look like this: 

```arduino
int buzzerPin = 10;

void setup() {
    pinMode(buzzerPin, OUTPUT);
}

void loop() {
    myTone(buzzerPin, 262, 500);
    delay(1000);
}

void myTone(int pin, int frequency, int duration){ 
    int startTime = millis();
    int period = 1000000/frequency; 
    while ((millis() - startTime) < duration){ 
        digitalWrite(pin, HIGH);
        delayMicroseconds(period/2);
        digitalWrite(pin, LOW);
        delayMicroseconds(period/2);
    }
}
```

## Some Things to Keep in Mind:


- The tone() function uses one of the built in timers on the Arduino’s microcontoller. tone() works independently of the delay() function. You can start a tone and do other stuff – while the tone is playing in the background. Therefore, if you use 500 milliseconds as the third argument in tone(), and follow that by a delay of 1000 milliseconds, you will only be creating a “rest” of 500 milliseconds.
- You cannot generate a tone lower than 31 HZ. You can pass values 31 and less to the tone() function, but it doesn’t mean you will get a good representation of it.
- The tone() function cannot be used by two separate pins at the same time. Let’s say you have two separate piezo speakers, each on a different pin. You can’t have them both play at the same time. One has to be on, and then the other. Furthermore, before you can have the other pin use the tone() function, you must call the noTone() function and “turn off” the tone from the previous pin.

--- 

 Being able to combine multiple example sketches into one is a very useful skill. See if you can combine the buzzer with a sketch you made for an input device like a potentiometer. 

 ---

Getting a buzzer to make noise is simple, but composing music is not. There are plenty of reference tables for frequencies of musical notes, but timing notes is also tricky. Check out some examples of classic tunes arranged for Arduino:

- [Airduino Melody](https://docs.arduino.cc/built-in-examples/digital/toneMelody/)
- [Super Mario Theme Song](https://www.princetronics.com/supermariothemesong/)
- [More Songs](https://github.com/robsoncouto/arduino-songs)
