---
title: Week 9
---

# Week 9

::: {.days}

::: {.day title="MONDAY" open="true"}

### Announcements
::: {.announcement type="reminder"}
The midterm critique for **Creative Interfaces** is next week, on **Wednesday, October 28**. Today we make custom switches and go over the accelerometer, then work on your interface.
:::

::: {.announcement type="tip"}
New: the **[Arduino Cheat Sheet](./content/Arduino/cheat_sheet/cheat_sheet.html)**, with every function, pattern and circuit we've used so far on one page. Keep it open while you build.
:::

::: {.announcement type="materials"}
- Laptop with the Arduino IDE installed
- Arduino Nano 33 IoT and USB cable
- Electronics Kit (breadboard, 10kΩ resistors, jumper wires, alligator clips)
- Your midterm materials, and any cardboard you can bring
:::

### Agenda
- **Switches that think outside the box.** A switch is just two pieces of metal that touch, so anything that moves can be one: a flicked spring, a bouncing ball, a door, a book, a hug. We'll look at a gallery of examples from artists, musicians and designers, then build our own custom switches.
- **The tilt switch and the accelerometer.** A tilt switch knows *if* it's tipped: a metal ball inside closes the switch, wired just like a push button. The Nano's built-in accelerometer measures *how much* it's tipped, as numbers for x, y and z.
- **Midterm studio.** Which of these could your interface use?

### Topics
::: {.topics}

::: {.card type="lesson" title="Custom Switches & Interfaces: A Gallery" thumb="./content/Assignments/Switch_Gallery/images/cover.png" href="./content/Assignments/Switch_Gallery/switch_gallery.html" tag="Gallery"}
:::

::: {.card type="workshop" title="DIY Pressure Sensor (Velostat)" thumb="./content/Workshops/Velostat_Workshop/images/cover.jpg" href="./content/Workshops/Velostat_Workshop/velostat_workshop.html" tag="Workshop"}
:::

::: {.card type="lesson" title="Arduino Cheat Sheet" thumb="./content/Arduino/cheat_sheet/images/cover.png" href="./content/Arduino/cheat_sheet/cheat_sheet.html" tag="Arduino"}
:::

::: {.card type="external" title="Tilt Sensor" thumb="./content/weeks/week_09/images/tilt_switch_cover.png" href="https://learn.adafruit.com/tilt-sensor" tag="External Resource"}
:::

::: {.card type="external" title="Accessing Accelerometer Data on Nano 33 IoT" thumb="./content/weeks/week_09/images/accelerometer_cover.png" href="https://docs.arduino.cc/tutorials/nano-33-iot/imu-accelerometer" tag="External Resource"}
:::

::: {.card type="lesson" title="Button" thumb="./content/Arduino/button/images/button.png" href="./content/Arduino/button/button.html" tag="Arduino"}
:::

:::

### Switch Tutorials
::: {.topics}

::: {.card type="external" title="Instructables: Switches" thumb="./content/weeks/week_09/images/instructables_switches_cover.jpg" href="https://www.instructables.com/Switches/" tag="Tutorial"}
:::

::: {.card type="external" title="Push Button Switch" thumb="./content/weeks/week_09/images/push_button_cover.jpg" href="https://www.instructables.com/How-to-Make-a-Push-Button-Switch/" tag="Tutorial"}
:::

::: {.card type="external" title="Cardboard Push Button" thumb="./content/weeks/week_09/images/cardboard_push_button_cover.jpg" href="https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Push+Button/356" tag="Tutorial"}
:::

::: {.card type="external" title="Stomp/Foot Switch" thumb="./content/weeks/week_09/images/stomp_switch_cover.jpg" href="https://makeymakey.com/pages/stomp-switch-start-and-stop-timer" tag="Tutorial"}
:::

::: {.card type="external" title="Simple Capability Switch (DIYAbility)" thumb="./content/weeks/week_09/images/capability_switch_cover.jpg" href="https://www.diyability.org/guide/make-a-simple-capability-switch/" tag="Tutorial"}
:::

::: {.card type="external" title="Homemade On/Off Toggle Switch" thumb="./content/weeks/week_09/images/toggle_switch_cover.jpg" href="https://www.instructables.com/how-to-make-a-homemade-ONOFF-switch/" tag="Tutorial"}
:::

::: {.card type="external" title="Lever Switch" thumb="./content/weeks/week_09/images/lever_switch_cover.jpg" href="https://learn.browndoggadgets.com/Guide/Paper+Circuits+Cubes+-+Lever+Switch/522" tag="Tutorial"}
:::

::: {.card type="external" title="Cardboard Slide Switch" thumb="./content/weeks/week_09/images/slide_switch_cover.jpg" href="https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Slide+Switch/253" tag="Tutorial"}
:::

::: {.card type="external" title="Cardboard Knife Switch" thumb="./content/weeks/week_09/images/knife_switch_cover.jpg" href="https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Knife+Switch/203" tag="Tutorial"}
:::

::: {.card type="external" title="Build Your Own Tilt Switch" thumb="./content/weeks/week_09/images/diy_tilt_switch_cover.jpg" href="https://www.instructables.com/Build-your-own-tilt-switch/" tag="Tutorial"}
:::

::: {.card type="video" title="DIY Tilt Switch (Video)" thumb="./content/weeks/week_09/images/tilt_video_cover.jpg" href="https://www.youtube.com/watch?v=jEqb6r3WV30" tag="Video"}
:::

::: {.card type="external" title="DIY Tilt Joystick" thumb="./content/weeks/week_09/images/tilt_joystick_cover.jpg" href="https://makeymakey.com/pages/diy-tilt-joystick" tag="Tutorial"}
:::

:::

### Variable Resistor Tutorials
::: {.topics}

::: {.card type="external" title="Pencil Lead Potentiometer" thumb="./content/weeks/week_09/images/pencil_pot_cover.jpg" href="https://www.instructables.com/Make-a-Pencils-Lead-Potentiometer-Experimentatio/" tag="Tutorial"}
:::

::: {.card type="external" title="Photoresistor (LDR)" thumb="./content/weeks/week_09/images/photoresistor_cover.jpg" href="https://www.instructables.com/How-to-use-a-photoresistor-or-photocell-Arduino-Tu/" tag="Tutorial"}
:::

::: {.card type="external" title="Velostat Pressure Sensor Mat" thumb="./content/weeks/week_09/images/velostat_mat_cover.jpg" href="https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/" tag="Tutorial"}
:::

::: {.card type="external" title="Sticky Tape Flex Sensor" thumb="./content/weeks/week_09/images/flex_sensor_cover.jpg" href="https://www.instructables.com/Stickytape-Sensors/" tag="Tutorial"}
:::

:::

### Custom Interface Tutorials
::: {.topics}

::: {.card type="external" title="Crank Counter" thumb="./content/weeks/week_09/images/crank_counter_cover.jpg" href="https://learn.browndoggadgets.com/Guide/Crank+Counter/238" tag="Tutorial"}
:::

::: {.card type="external" title="Therapy Ball Controller" thumb="./content/weeks/week_09/images/therapy_ball_cover.jpg" href="https://makeymakey.com/blogs/how-to-instructions/balance-weight-shifting-ball-controller-as-assistive-technology-by-katie-butzu-and-mark-lyons" tag="Tutorial"}
:::

::: {.card type="external" title="Hula Hoop Controller" thumb="./content/weeks/week_09/images/hula_hoop_cover.jpg" href="https://makeymakey.com/pages/hula-hoop-controller" tag="Tutorial"}
:::

:::

:::

:::

### Next Week
::: {.nextweek}
Monday is about sound: a microphone that reacts to loudness, and a small speaker you can play with `tone()`. Then midterm studio. Wednesday is the **midterm critique**: bring your finished interface, ready to show.
:::
