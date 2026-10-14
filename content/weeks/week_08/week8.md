---
title: Week 8
---

# Week 8

<section class="slides_section">
<iframe src="content/Assignments/Creative_Interfaces/Creative_Interfaces_Slides/index.html" width="100%" height="500px"></iframe>
</section>

[Open Slides in New Tab](./content/Assignments/Creative_Interfaces/Creative_Interfaces_Slides/index.html)

::: {.days}

::: {.day title="MONDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
Today we introduce the midterm assignment, **Creative Interfaces**. The critique is on **Wednesday, October 28**.
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, LEDs, 220Ω and 10kΩ resistors, jumper wires, push button)
:::

### Agenda
- Oscilloscope demo: two ways to dim an LED. First an analog fade with the Velostat pressure sensor, where the voltage itself rises and falls. Then a PWM fade with `analogWrite()`, where the voltage is always either fully on or fully off, switching very fast.
- Quick review: Blink, `analogRead()` and the Serial Monitor
- The Button sketch: wiring a push button to pin 2, `digitalRead()`, and the pull-down resistor
- `if` / `else` statements: making a decision based on the button's state
- Introducing the midterm: Creative Interfaces
- What can be a switch? Looking at DIY switches and variable resistors as a starting point for your interface

### Topics
::: {.topics}

::: {.card type="lesson" title="Fade and Intro to PWM" thumb="./content/Arduino/fade/images/cover.jpg" href="./content/Arduino/fade/fade.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Button" thumb="./content/Arduino/button/images/button.png" href="./content/Arduino/button/button.html" tag="Arduino"}
:::

::: {.card type="external" title="Buttons and Pull-Down Resistors" thumb="./content/Arduino/button/images/button_schematic.png" href="https://makeabilitylab.github.io/physcomp/arduino/buttons.html" tag="External Resource"}
:::

::: {.card type="assignment" title="Midterm: Creative Interfaces" thumb="./content/Assignments/Creative_Interfaces/images/cover.jpg" href="./content/Assignments/Creative_Interfaces/creative_interfaces.html" tag="Assignment"}
:::

::: {.card type="external" title="The Interface as Artwork" thumb="./content/weeks/week_08/images/oncontact_cover.jpg" href="https://liveinterfacesjournal.ulusofona.pt/the-interface-as-artwork/#elementor-toc__heading-anchor-2" tag="Reading"}
:::

:::

:::

::: {.day title="WEDNESDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
The midterm critique for **Creative Interfaces** is on **Wednesday, October 28**. Start sketching ideas for your interface: what will the person touch, and what will it make happen?
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, RGB LED, passive buzzer, photoresistor, potentiometer, push button, 220Ω and 10kΩ resistors, jumper wires)
:::

### Agenda
- The RGB LED: three LEDs (red, green, blue) in one package, wired to three PWM pins, and mixing colors with `analogWrite()`
- Two kinds of RGB LED: common cathode (long leg to GND) and common anode (long leg to 3.3V, where LOW turns a color on), and how to test which one you have
- RGB sketches: blinking through colors with `digitalWrite()`, fading each color at its own speed, then mixing colors with a potentiometer and a photocell
- New functions: `map()` to convert a reading from one range to another, and `constrain()` to keep it inside a range
- The passive buzzer: a tiny speaker that only makes sound when we send it a wave. How it differs from an active buzzer, and how it connects back to PWM.
- `tone()` and `noTone()`: frequency (pitch) and duration, and playing a short melody
- Build a light theremin: a photoresistor in a voltage divider, read with `analogRead()`, sets the pitch of the buzzer with `map()` and `tone()`. Then calibrating the sensor to the light in the room.
- Midterm brainstorm: sharing early ideas for your interface
- Class Band: everyone wires a button to pin 2, joins the classroom router over Wi-Fi, and plays their own sound and animation on the projector, Patatap-style

### Topics
::: {.topics}

::: {.card type="lesson" title="RGB LED" thumb="./content/Arduino/rgb_led/images/cover.png" href="./content/Arduino/rgb_led/rgb_led.html" tag="Arduino"}
:::

::: {.card type="lesson" title="map()" thumb="./content/Arduino/map/images/cover.png" href="./content/Arduino/map/map.html" tag="Arduino"}
:::

::: {.card type="lesson" title="constrain()" thumb="./content/Arduino/constrain/images/cover.png" href="./content/Arduino/constrain/constrain.html" tag="Arduino"}
:::

::: {.card type="external" title="RGB LEDs (Makeability Lab)" thumb="./content/weeks/week_08/images/rgb-led_cover.jpg" href="https://makeabilitylab.github.io/physcomp/arduino/rgb-led.html" tag="External Resource"}
:::

::: {.card type="lesson" title="Passive Buzzer and Light Theremin" thumb="./content/Arduino/buzzer_speaker/images/cover.jpg" href="./content/Arduino/buzzer_speaker/buzzer_speaker.html" tag="Arduino"}
:::

::: {.card type="workshop" title="Class Band" thumb="./content/Workshops/Class_Band/images/cover.jpg" href="./content/Workshops/Class_Band/class_band.html" tag="Workshop"}
:::

::: {.card type="external" title="Play a Melody with tone()" thumb="./content/Arduino/buzzer_speaker/images/buzzer.jpg" href="https://docs.arduino.cc/built-in-examples/digital/toneMelody/" tag="External Resource"}
:::

:::

:::

:::

### Supplementary Material
ITP NYU course explaining digital input and output with the Arduino Uno. A good review of what we have learned so far.

<iframe title="vimeo-player" src="https://player.vimeo.com/video/374067285?h=c6390e412a" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>

### Next Week
::: {.nextweek}
Monday we'll look at more custom switches, like the tilt switch, which turns on and off when you tip it, and DIY switches you can build into your interface. Wednesday we'll use the Nano 33 IoT's built-in accelerometer to measure tilt and movement. Both days include midterm studio time, so bring your interface materials and ideas.
:::
