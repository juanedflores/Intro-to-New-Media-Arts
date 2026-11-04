---
title: Week 11
---

# Week 11

::: {.days}

::: {.day title="MONDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
We're starting the **[Final Project](./content/Assignments/Final_Project/final_project.html)** today. This week, create an Are.na channel called **"Final Project"** and put your research, sketches and inspiration there.
:::

::: {.announcement type="reminder"}
**Final Project Proposals are due next Monday, November 9.** Post yours in the **[Final Project Proposals](https://canvas.uic.edu/courses/51541/assignments/450955){target="_blank"}** thread on Canvas.
:::

::: {.announcement type="gallery"}
The **[Creative Interfaces Gallery](./content/Assignments/Creative_Interfaces/gallery/index.html)** is up. It's a saved copy of your Are.na channel, and I'll update it next Monday, November 9. Make sure your channel is up to date by then, including your photos and Description block.
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, servo motor, power supply module, photoresistor, potentiometer, jumper wires)
:::

### Agenda
- **Midterm gallery.** We'll start by looking through the [Creative Interfaces Gallery](./content/Assignments/Creative_Interfaces/gallery/index.html) together.
- **Final project proposals.** Here's what's left in the semester: proposals are due **Monday, November 9**, then we have studio time, and final projects are due, with critiques, on **Wednesday, December 2**. We'll go over the Final Project page and what goes in a proposal, then start brainstorming:
  - What is it, and who (or what) is it for?
  - How does someone interact with it?
  - What does it sense, and how does it respond: with light, sound or movement?
  - What do you already know how to build, and what would you need to learn?
- **Servo motors.** The vibration motor on your Drawing Machine just spins. A servo turns to the exact angle you tell it to. We'll wire one up, move it with `write()`, then sweep it back and forth with a `for` loop.
- **Control it with a sensor.** Turn a potentiometer or photoresistor reading into an angle with `map(analogRead(A0), 0, 1023, 0, 180)`. Then try wiring up your midterm interface: what could it move?

### Topics
::: {.topics}

::: {.card type="assignment" title="Final Project" thumb="./content/Assignments/Final_Project/images/cover.png" href="./content/Assignments/Final_Project/final_project.html" tag="Assignment"}
:::

::: {.card type="lesson" title="Servo Motors: Sweep" thumb="./content/Arduino/sweep/images/cover.webp" href="./content/Arduino/sweep/sweep.html" tag="Arduino"}
:::

::: {.card type="lesson" title="map()" thumb="./content/Arduino/map/images/cover.png" href="./content/Arduino/map/map.html" tag="Arduino"}
:::

::: {.card type="external" title="NeoPixels" thumb="./content/weeks/week_11/images/neopixels_cover.jpg" href="https://learn.adafruit.com/adafruit-neopixel-uberguide" target="_blank" tag="External Resource"}
:::

::: {.card type="lesson" title="Arduino Cheat Sheet" thumb="./content/Arduino/cheat_sheet/images/cover.png" href="./content/Arduino/cheat_sheet/cheat_sheet.html" tag="Arduino"}
:::

:::

:::

::: {.day title="WEDNESDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
**Final Project Proposals are due this Monday, November 9.** Post yours in the **[Final Project Proposals](https://canvas.uic.edu/courses/51541/assignments/450955){target="_blank"}** thread on Canvas, and keep adding your research and ideas to your "Final Project" channel on Are.na.
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, passive buzzer, photoresistor, push buttons, 10kΩ resistors, jumper wires)
- I'll hand out a piezo disc, a 1MΩ resistor and a 3.3V Zener diode
:::

### Agenda
- **Run it without a laptop.** A quick demo to start: the Light Theremin from Week 8, running on a 9V battery through the VIN pin. It's the same sketch and the same circuit, and now it can go anywhere.
- **What is a microphone?** We'll plug three kinds into a speaker and listen. An electret microphone hears the air, a contact microphone hears the object it's touching, and an electromagnetic pickup hears the magnetic fields around anything that uses electricity.
- **Feedback.** When a microphone hears its own speaker, the sound goes around in a loop and grows into a howl. We'll make it happen, then see how Steve Reich uses it on purpose in *Pendulum Music* (1968).
- **Objects and fields.** We'll listen to objects with a contact microphone and look at Laurie Anderson's *The Handphone Table* (1978), where you hear sound through the bones of your arms. Then I'll demonstrate the pickup with a coil of wire, and we'll look at Christina Kubisch's *Electrical Walks* (since 2003), where you walk through a city and hear its electromagnetic fields.
- **Knock.** Wire a piezo to A0, watch each knock in the Serial Plotter, then upload the Knock example. Try making a knock do something: play a sound, move a servo or press a key.
- **Keyboard and mouse.** Your Arduino can act like a USB keyboard or mouse, so anything you build can control anything on your computer. We'll press keys with a button and play the Dino game, then click and move the cursor by tilting the board.
- **Back to your proposal.** What could your project listen to?

### Topics
::: {.topics}

::: {.card type="lesson" title="VIN: Running Without a Laptop" thumb="./content/Arduino/vin_power/images/cover.png" href="./content/Arduino/vin_power/vin_power.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Microphones" thumb="./content/Arduino/microphones/images/cover.png" href="./content/Arduino/microphones/microphones.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Knock" thumb="./content/Arduino/knock/images/cover.webp" href="./content/Arduino/knock/knock.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Keyboard and Mouse" thumb="./content/Arduino/Keyboard/images/cover.jpg" href="./content/Arduino/Keyboard/Keyboard.html" tag="Arduino"}
:::

::: {.card type="lesson" title="Sound Art" thumb="./content/weeks/week_11/images/electrical-walk_cover.jpg" href="./content/slides/sound_art_slides/index.html" target="_blank" tag="Slides"}
:::

:::

:::

:::

### Next Week
::: {.nextweek}
Monday your proposal is due, and we'll look at everyone's ideas in class and give feedback. Wednesday is studio time, and I'll come around to talk with each of you about how to build your project.
:::
