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
- Electronics Kit (breadboard, LEDs, RGB LED, 220Ω and 10kΩ resistors, jumper wires, push button)
:::

### Agenda
- Oscilloscope demo: two ways to dim an LED. First an analog fade with the Velostat pressure sensor, where the voltage itself rises and falls. Then a PWM fade with `analogWrite()`, where the voltage is always either fully on or fully off, switching very fast.
- Quick review: Blink, `analogRead()` and the Serial Monitor
- The Button sketch: wiring a push button to pin 2, `digitalRead()`, and the pull-down resistor
- `if` / `else` statements: making a decision based on the button's state
- The RGB LED: three LEDs (red, green, blue) in one, wired to three pins, and mixing colors with `analogWrite()`
- Introducing the midterm: Creative Interfaces
- What can be a switch? Looking at DIY switches and variable resistors as a starting point for your interface

### Topics
::: {.topics}

::: {.card type="lesson" title="Fade and Intro to PWM" thumb="./content/Arduino/fade/images/cover.jpg" href="./content/Arduino/fade/fade.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Button" thumb="./content/Arduino/button/images/button.png" href="./content/Arduino/button/button.html" tag="Arduino"}
:::

::: {.card type="external" title="Buttons and Pull-Down Resistors" thumb="./content/Arduino/button/images/button_schematic.png" href="https://makeabilitylab.github.io/physcomp/arduino/buttons.html" tag="Arduino"}
:::

::: {.card type="external" title="RGB LEDs" thumb="./content/weeks/week_08/images/rgb-led_cover.jpg" href="https://makeabilitylab.github.io/physcomp/arduino/rgb-led.html" tag="Arduino"}
:::

::: {.card type="assignment" title="Midterm: Creative Interfaces" thumb="./content/Assignments/Creative_Interfaces/images/cover.jpg" href="./content/Assignments/Creative_Interfaces/creative_interfaces.html" tag="Assignment"}
:::

::: {.card type="external" title="The Interface as Artwork" thumb="./content/weeks/week_08/images/oncontact_cover.jpg" href="https://liveinterfacesjournal.ulusofona.pt/the-interface-as-artwork/#elementor-toc__heading-anchor-2" tag="Reading"}
:::

:::

:::

:::

### Supplementary Material
ITP NYU course explaining digital input and output with the Arduino Uno. A good review of what we have learned so far.

<iframe title="vimeo-player" src="https://player.vimeo.com/video/374067285?h=c6390e412a" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>

### Next Week
::: {.nextweek}
We'll use the Nano 33 IoT's built-in accelerometer, and turn the Arduino into a keyboard and mouse so your interface can control your computer. Both days include midterm studio time, so bring your interface materials and ideas.
:::
