---
title: Week 7
---

# Week 7

<section class="slides_section">
<iframe src="content/slides/week_7_day1/index.html" width="100%" height="500px"></iframe>
</section>

[Open Slides in New Tab](./content/slides/week_7_day1/index.html)

::: {.days}

::: {.day title="MONDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
We're picking up the DIY pressure sensor workshop that we didn't get to last Wednesday. Bring your electronics kit, and your breadboard if you still have last week's circuits on it.
:::

::: {.announcement type="materials"}
- Electronics Kit (breadboard, power supply module, 9V adapter, LEDs, 220Ω and 10kΩ resistors, jumper wires, alligator clips)
- Velostat, copper tape, cardstock and multimeters (provided)
:::

::: {.announcement type="tip"}
The Arduinos are here! Everyone gets their own Arduino Nano 33 IoT today.
:::

### Agenda
- Quick review: potentiometers, photoresistors and buzzers from Wednesday
- Voltage dividers: turning a changing resistance into a changing voltage
- DIY Pressure Sensor Workshop: build a Velostat sensor, light an LED with it, then measure it as a voltage divider
- Passing out the Arduino Nano 33 IoTs
- What is an Arduino? A walkthrough of the board and its pins, and how to place it on your breadboard

### Topics
::: {.topics}

::: {.card type="workshop" title="DIY Pressure Sensor Workshop" thumb="./content/Workshops/Velostat_Workshop/images/cover.jpg" href="./content/Workshops/Velostat_Workshop/velostat_workshop.html" tag="Workshop"}
:::

::: {.card type="external" title="Voltage Dividers" thumb="./content/weeks/week_07/images/voltage-divider.svg" href="https://learn.sparkfun.com/tutorials/voltage-dividers/all" tag="Electronics"}
:::

::: {.card type="external" title="Potentiometers as Voltage Dividers" thumb="./content/weeks/week_06/images/potentiometer_cover.jpg" href="https://makeabilitylab.github.io/physcomp/electronics/variable-resistors.html#potentiometers-as-voltage-dividers" tag="Electronics"}
:::

::: {.card type="lesson" title="The Arduino Nano 33 IoT" thumb="./content/Arduino/getting_setup/getting_setup.svg" href="./content/Arduino/getting_setup/getting_setup.html" tag="Arduino"}
:::

::: {.card type="video" title="Velostat Pressure Sensor Video" thumb="./content/weeks/week_07/images/velostat-matrix_cover.jpg" href="https://www.youtube.com/watch?v=SLRYX879Py0" tag="Youtube Video"}
:::

:::

:::

::: {.day title="WEDNESDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
Bring your Arduino Nano 33 IoT, a USB cable that fits it, and your Velostat sensor from Monday. If you haven't yet, install the Arduino IDE before class.
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, LEDs, 220Ω and 10kΩ resistors, jumper wires, push button)
- Your Velostat sensor from Monday
:::

### Agenda
- Getting set up: the Arduino IDE, picking the board and port, uploading your first sketch
- Blink: the built-in LED, then an LED on the breadboard
- Reading sensors: `analogRead()` and printing values to the Serial Monitor and Serial Plotter
- If there's time: the Button sketch with `digitalRead()`
- Class Sensor Grid: everyone uploads the same sketch, joins the classroom router over Wi-Fi, and sends their Velostat sensor's readings to one shared screen

### Topics
::: {.topics}

::: {.card type="lesson" title="Getting Set Up with the Arduino IDE" thumb="./content/Arduino/getting_setup/getting_setup.svg" href="./content/Arduino/getting_setup/getting_setup.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Blink" thumb="./content/Arduino/blink/images/cover.jpg" href="./content/Arduino/blink/blink.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Print to Serial Monitor" thumb="./content/Arduino/print_to_serial_monitor/images/cover.png" href="./content/Arduino/print_to_serial_monitor/print_to_serial_monitor.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Button" thumb="./content/Arduino/button/images/button.png" href="./content/Arduino/button/button.html" tag="Arduino"}
:::

::: {.card type="workshop" title="Your Arduino on the Class Sensor Grid" thumb="./content/Workshops/Velostat_Workshop/images/cover.jpg" href="./content/Workshops/Velostat_Workshop/velostat_workshop.html#part-4-your-own-arduino-on-the-class-grid" tag="Workshop"}
:::

:::

:::

:::

<!-- ### Supplementary Material -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/Mr9NlMFNWgw?si=cdDMIXsOmWE98kfi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
<!---->
<!-- <a href="https://class.textile-academy.org/2026/marissa-renteria/assignments/week05/">Marissa Renteria: E-Textiles (Fabricademy)</a> -->
<!---->
### Next Week
::: {.nextweek}
We'll look at E-Textiles (conductive thread, copper tape, snaps and soft circuits), keep going with Arduino (buttons, `if` statements and digital input), and introduce the midterm assignment, Creative Interfaces.
:::
