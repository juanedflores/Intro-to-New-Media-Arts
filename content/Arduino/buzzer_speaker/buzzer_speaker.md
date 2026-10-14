---
heading: Buzzer Speaker
---

# Passive Buzzer Speaker

## Materials

For this lesson, please collect the following:

- Arduino Nano 33 IoT
- Breadboard
- Passive buzzer
- 100Ω–220Ω resistor (optional, makes it a bit quieter)
- Photoresistor (photocell) and a 10kΩ resistor, for the theremin
- Jumper wires

## Passive vs. Active Buzzers

There are two kinds of buzzers that look almost identical:

- An **active buzzer** has a small circuit inside that makes its own tone. Give it power and it beeps, always at the same pitch. You can only turn it on and off.
- A **passive buzzer** is just a tiny speaker. It makes no sound on its own. We have to send it a wave, switching the pin HIGH and LOW very fast, and the speed of that switching sets the pitch.

We are using **passive buzzers**, because they let us choose the pitch and play melodies.

How to tell them apart: an active buzzer usually has a sealed black bottom and a sticker on top, and it beeps when you connect it straight to 3.3V and GND. A passive buzzer usually shows a green circuit board on the bottom, and it only clicks once when you connect it to power.

This should sound familiar: switching a pin HIGH and LOW very fast is what we saw with PWM on the oscilloscope. With `analogWrite()` we changed how long the pin stays on (the brightness). With `tone()` we change **how many times per second** it switches (the pitch).

## Wiring

- Buzzer **+** leg (often the longer leg, or marked with a **+**) → pin **D8**
- Buzzer **−** leg → **GND** (through a 100Ω–220Ω resistor if you want it quieter)

Any digital pin works with `tone()` on the Nano 33 IoT. We use D8 here so it stays out of the way of the RGB LED's PWM pins.

## The tone() Function

`tone()` takes two arguments, and an optional third:

- **Pin**: the pin the buzzer is connected to
- **Frequency**: in hertz (cycles per second). This sets the pitch. 262 Hz is middle C, 440 Hz is the A above it.
- **Duration** (optional): how long the tone plays, in milliseconds. If you leave it out, the tone keeps playing until you call `noTone(pin)`.

```arduino
int buzzerPin = 8;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  tone(buzzerPin, 440, 500);   // play A4 for half a second
  delay(1000);                 // wait one second before playing again
}
```

## Some Things to Keep in Mind

- `tone()` runs in the background, using one of the microcontroller's built-in timers. It does not pause your sketch. If you call `tone()` with a duration of 500 milliseconds and then `delay(1000)`, you get 500 milliseconds of sound followed by 500 milliseconds of silence.
- Frequencies below about 31 Hz will not sound right.
- Only one pin can play a tone at a time. To switch to another buzzer, call `noTone()` on the first pin before calling `tone()` on the second.
- The Nano 33 IoT runs at 3.3V, so the buzzer will be quieter than on a 5V Arduino like the Uno. Try different frequencies: most small buzzers are loudest somewhere around 2000–4000 Hz.

## Playing a Melody

A melody is a list of frequencies (notes) and a list of how long each one lasts. The Arduino IDE has an example for this:

**File** > **Examples** > **02.Digital** > **toneMelody**

Change the pin number from `8` if you wired your buzzer to a different pin. Notice the second tab, `pitches.h`: it gives a name to the frequency of each musical note, so you can write `NOTE_C4` instead of `262`.

<p><a href="https://docs.arduino.cc/built-in-examples/digital/toneMelody/">Arduino toneMelody Sketch: Official Arduino Documentation</a></p>

## Combining Sketches: A Light Theremin

A [theremin](https://en.wikipedia.org/wiki/Theremin) is an electronic instrument you play without touching it: moving your hand closer or farther changes the pitch.

::: {.video-embed}
<iframe src="https://www.youtube.com/embed/pSzTPGlNa5U" title="Theremin: Clara Rockmore plays The Swan (Saint-Saëns)" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Clara Rockmore plays "The Swan" (Saint-Saëns)**  
Clara Rockmore was one of the first great theremin players. Watch her hands: the right hand, near the vertical antenna, sets the pitch, and the left hand, over the loop antenna, sets the volume. She never touches the instrument.
:::

We can make our own version with a **photoresistor** (photocell): your hand casts a shadow over the sensor, and the amount of light sets the pitch of the buzzer.

This combines two sketches we already know: `analogRead()` and `tone()`.

### Wiring the Photoresistor

If you just finished the [RGB LED](../rgb_led/rgb_led.html) lesson, your photoresistor is already wired this way: keep it, and add the buzzer.

In the Breadboard Circuits workshop, the photoresistor controlled an LED directly. To read it with the Arduino, we need a **voltage divider**: the photoresistor and a fixed **10kΩ resistor** in series, with the point between them going to an analog pin. As the light changes, the voltage at that point changes, and `analogRead()` can measure it.

- **3.3V** → one leg of the photoresistor (it has no polarity)
- Other leg of the photoresistor → **A0**, and also → **10kΩ resistor** → **GND**
- Buzzer stays on **D8** and **GND**

<img src="../rgb_led/images/photocell_divider.svg" alt="Schematic of the photocell voltage divider: the Nano's 3.3V pin goes to one leg of the photocell. The photocell's other leg connects to pin A0 and to a 10 kilohm resistor, whose other end goes to GND. More light on the photocell gives a higher reading on A0." style="max-width:560px;width:100%;height:auto" />

With this wiring, **more light = higher readings**, and covering the sensor with your hand makes the reading go down.

### First, Look at Your Numbers

Every room has different light, so before making sound, find your sensor's range. Upload this and open the **Serial Plotter**. Note the reading in normal light, and the reading when your hand covers the sensor.

```arduino
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(A0));
  delay(10);
}
```

### The Theremin Sketch

Replace `lowest` and `highest` with the numbers you saw in the Serial Plotter.

```arduino
int buzzerPin = 8;
int sensorPin = A0;

int lowest = 100;    // reading with your hand covering the sensor
int highest = 800;   // reading in normal light

void setup() {
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightValue = analogRead(sensorPin);
  Serial.println(lightValue);

  // turn the light range into a range of pitches (200–2000 Hz)
  int pitch = map(lightValue, lowest, highest, 200, 2000);
  pitch = constrain(pitch, 200, 2000);   // keep it inside that range

  tone(buzzerPin, pitch);
  delay(10);
}
```

`constrain()` keeps the pitch between 200 and 2000 Hz, even if the light goes brighter or darker than the range you measured.

### Let the Arduino Measure the Light for You

Changing the numbers by hand every time you move to a new room gets old. Instead, the sketch can **calibrate** itself: for the first five seconds after it starts, it watches the sensor and remembers the lowest and highest readings. While the built-in LED is on, wave your hand over the sensor, covering and uncovering it.

```arduino
int buzzerPin = 8;
int sensorPin = A0;

int lowest = 1023;   // start high, so any reading will be lower
int highest = 0;     // start low, so any reading will be higher

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  // calibrate for 5 seconds while the LED is on
  digitalWrite(LED_BUILTIN, HIGH);
  while (millis() < 5000) {
    int lightValue = analogRead(sensorPin);
    if (lightValue < lowest) {
      lowest = lightValue;
    }
    if (lightValue > highest) {
      highest = lightValue;
    }
  }
  digitalWrite(LED_BUILTIN, LOW);
}

void loop() {
  int lightValue = analogRead(sensorPin);
  int pitch = map(lightValue, lowest, highest, 200, 2000);
  pitch = constrain(pitch, 200, 2000);
  tone(buzzerPin, pitch);
  delay(10);
}
```

This is based on the Arduino **Calibration** example: **File** > **Examples** > **03.Analog** > **Calibration**.

### Try It

- **Flip it:** swap `200` and `2000` in `map()`, so covering the sensor makes the pitch go up instead of down.
- **Silence:** add an `if` statement so the buzzer only plays when your hand is over the sensor, and calls `noTone()` otherwise.
- **Notes instead of a slide:** instead of every frequency, snap the pitch to the notes of a scale, so it sounds more like an instrument. (Hint: `map()` the light to a number from 0 to 7, and use it to pick a frequency from an array of notes.)
- **Light and color:** use the same reading to change the color of your RGB LED with `analogWrite()`.
- **Other sensors:** swap the photoresistor for your Velostat sensor, so pressing harder raises the pitch.

---

Getting a buzzer to make noise is simple, but composing music is not. There are plenty of reference tables for the frequencies of musical notes, but timing the notes is also tricky. Check out some examples of classic tunes arranged for Arduino:

- [Arduino toneMelody](https://docs.arduino.cc/built-in-examples/digital/toneMelody/)
- [Super Mario Theme Song](https://www.princetronics.com/supermariothemesong/)
- [More Songs](https://github.com/robsoncouto/arduino-songs)
