---
title: Velostat Pressure Sensor Workshop
heading: Velostat Pressure Sensor Workshop
---

# Velostat Pressure Sensor Workshop

![A sheet of Velostat, a thin, flexible black conductive plastic. Photo: [Adafruit](https://www.adafruit.com/product/1361)](images/cover.jpg)

## Summary

Today we're making our own **pressure sensor** out of Velostat, a thin black plastic that conducts electricity. The harder you press on it, the better it conducts. We'll use it to control the brightness of an LED: press lightly and the LED glows faintly, press hard and it gets bright.

This is also our first time building on a **breadboard**, so we can put circuits together without soldering. Before we make the Velostat sensor, we'll warm up with three quick circuits using parts from your new electronics kit: a **potentiometer**, a **light sensor**. They all work the same way the Velostat will, so by the time we get to it you'll already know the circuit. These are all examples of *Variable Resistors*.

### Steps

[We will go over the steps together as a class].

1. Get to know the breadboard.
2. Power the breadboard with the 9V adapter and the power supply module.
3. Dim an LED with a **potentiometer**.
4. Control an LED with light using a **photoresistor** (light sensor).
5. Make sound with a **buzzer**, and use the potentiometer as a volume knob.
6. Build the Velostat sensor.
7. Wire the Velostat sensor, a resistor and an LED together, then press!

## How Velostat Works

Velostat is plastic filled with tiny carbon particles. When it's resting, the particles are spread apart, so electricity has a hard time getting through. It has a **high resistance**. When you press on it, the particles get squeezed closer together and more paths open up for current, so the **resistance drops**.

That makes it a **variable resistor**, like the potentiometer in your kit, except you control it by squeezing instead of turning a knob.

| | Resting | Pressed |
|---|---|---|
| Carbon particles | Spread apart | Squeezed together |
| Resistance | High | Low |
| Current through the LED | Very little | More |
| LED | Dim / off | Bright |

Because it's a flexible sheet, you can cut it to any shape and hide it inside soft objects, clothing, shoes, cushions or your own sculptures. That's why it shows up so often in e-textiles and wearables.

## Tools & Materials

From your **electronics kit**:

- **830-point breadboard**
- **Breadboard power supply module** (the small board with the barrel jack, USB port and on/off button)
- **9V 1A power adapter** (plugs into the wall and into the power module)
- **LED** (any color)
- **220Ω resistor** (bands: red, red, brown)
- **Potentiometer** (the small blue knob)
- **Photoresistor** (the small disc with a squiggly line on top)
- **Active buzzer** (the small black cylinder with a sticker on top)
- **Jumper wires**
- **Alligator clips**

Provided by the lab:

- **Velostat** sheet
- **Copper tape** or aluminum foil
- **Cardstock or thin cardboard**
- **Masking tape**
- **Multimeter** (optional, for testing your sensor)

## Part 1: The Breadboard

A breadboard lets you connect components by pushing their legs into holes. Underneath the holes are metal strips that connect certain holes together.

- **Terminal strips (the middle):** each short row of 5 holes is connected. The rows on either side of the center gap are **not** connected to each other.
- **Power rails (the long edges):** each long line marked **+** (red) or **–** (blue) is connected along the whole side of the board. We'll put power on **+** and ground on **–**.
- On some 830-point boards the power rails are split in the middle. If the lines on the edge have a gap halfway down, the two halves are **not** connected. Bridge the gap with a jumper wire if you need both halves.

Two components are connected when their legs are in the **same row** (or the same rail).

The Makeability Lab has a good visual guide: [Breadboards](https://makeabilitylab.github.io/physcomp/electronics/breadboards.html).

## Part 2: Powering the Breadboard

The power supply module takes the 9V from the adapter and turns it into a steadier **5V** or **3.3V** for the breadboard.

1. **Check the voltage jumpers.** The module has a small jumper cap on each side that selects the voltage for that side's rail. Set **both** to **5V**.
2. **Plug the module into one end of the breadboard** so its pins go into the power rails. Line up the module's **+** and **–** markings with the red **+** and blue **–** rails. Getting this backwards can damage components.
3. **Plug the 9V adapter** into the module's barrel jack, then into the wall. Only use one power source at a time: the adapter **or** USB, not both.
4. **Press the module's power button.** Its small LED should light up.
5. **Turn the power off** (press the button again) whenever you're changing wires.

## Part 3: Potentiometer Dimmer

A **potentiometer** ("pot") is a resistor you can adjust with a knob. It has three legs: the two outer legs are the ends of a resistor, and the **middle leg** (the wiper) slides along it as you turn the knob. Using the middle leg and one outer leg gives you a resistance that changes as you turn.

**5V (+)** → **potentiometer** → **220Ω resistor** → **LED** → **GND (–)**

<svg viewBox="0 -10 510 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Series circuit: 5 volts, potentiometer, 220 ohm resistor, LED, ground" style="max-width:510px;width:100%;height:auto;font-family:Inter,sans-serif;font-size:13px">
  <g fill="none" stroke="#2c3f89" stroke-width="3" stroke-linejoin="round">
    <path d="M40 40 H100" />
    <path d="M190 40 H230" />
    <path d="M320 40 H360" />
    <path d="M450 40 H490 V150 H40 V40" />
    <path d="M100 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M120 62 L172 16 m-12 1 l12 -1 l-1 12" stroke-width="2" />
    <path d="M230 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M360 40 h27 M387 22 V58 L423 40 Z" fill="#f3c95b" />
    <path d="M423 22 V58 M423 40 h27" />
    <path d="M402 14 l10 -10 M412 18 l10 -10" stroke-width="2" />
  </g>
  <circle cx="40" cy="40" r="5" fill="#c0392b" />
  <circle cx="40" cy="150" r="5" fill="#2c3f89" />
  <text x="30" y="20" fill="#c0392b" font-weight="700">5V (+)</text>
  <text x="30" y="175" fill="#2c3f89" font-weight="700">GND (–)</text>
  <text x="145" y="80" text-anchor="middle">potentiometer</text>
  <text x="275" y="80" text-anchor="middle">220Ω resistor</text>
  <text x="405" y="80" text-anchor="middle">LED</text>
  <text x="405" y="95" text-anchor="middle" fill="#666">(long leg on the left)</text>
</svg>

With the **power off**:

1. **Place the LED** across two rows. The **long leg (+)** points toward power, the **short leg (–)** toward ground.
2. **Connect the LED's short leg to the – rail** with a jumper wire.
3. **Put the 220Ω resistor** so one leg shares a row with the LED's long leg and the other leg is in a new row.
4. **Place the potentiometer** so each of its three legs is in its own row.
5. **Connect the pot's middle leg** to the resistor's free row with a jumper wire.
6. **Connect one of the pot's outer legs** to the + rail. Leave the other outer leg unconnected.
7. **Turn the power on and turn the knob.** The LED should fade from bright to dim.

**Why the resistor?** At one end of the knob, the pot's resistance is close to 0Ω. The 220Ω resistor makes sure there's always enough resistance in the loop to protect the LED. Keep it in every LED circuit today.

## Part 4: Light Sensor

A **photoresistor** (also called a light-dependent resistor, or LDR) changes its resistance with light. **More light = less resistance**, so more current flows and the LED gets brighter. It has no polarity, so either leg can go either way.

**5V (+)** → **photoresistor** → **220Ω resistor** → **LED** → **GND (–)**

<svg viewBox="0 -10 510 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Series circuit: 5 volts, photoresistor, 220 ohm resistor, LED, ground" style="max-width:510px;width:100%;height:auto;font-family:Inter,sans-serif;font-size:13px">
  <g fill="none" stroke="#2c3f89" stroke-width="3" stroke-linejoin="round">
    <path d="M40 40 H100" />
    <path d="M190 40 H230" />
    <path d="M320 40 H360" />
    <path d="M450 40 H490 V150 H40 V40" />
    <circle cx="145" cy="40" r="30" stroke-width="2" />
    <path d="M100 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M118 -2 l12 14 m-9 0 l9 0 l0 -9 M134 -6 l12 14 m-9 0 l9 0 l0 -9" stroke-width="2" />
    <path d="M230 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M360 40 h27 M387 22 V58 L423 40 Z" fill="#f3c95b" />
    <path d="M423 22 V58 M423 40 h27" />
    <path d="M402 14 l10 -10 M412 18 l10 -10" stroke-width="2" />
  </g>
  <circle cx="40" cy="40" r="5" fill="#c0392b" />
  <circle cx="40" cy="150" r="5" fill="#2c3f89" />
  <text x="30" y="20" fill="#c0392b" font-weight="700">5V (+)</text>
  <text x="30" y="175" fill="#2c3f89" font-weight="700">GND (–)</text>
  <text x="145" y="88" text-anchor="middle">photoresistor</text>
  <text x="275" y="80" text-anchor="middle">220Ω resistor</text>
  <text x="405" y="80" text-anchor="middle">LED</text>
  <text x="405" y="95" text-anchor="middle" fill="#666">(long leg on the left)</text>
</svg>

This is the same circuit as Part 3, with the photoresistor in place of the potentiometer:

1. **Turn the power off.**
2. **Remove the potentiometer.**
3. **Place the photoresistor** so its two legs are in two different rows.
4. **Connect one leg to the + rail** and the **other leg to the resistor's free row**.
5. **Turn the power on.** Cover the photoresistor with your hand, then shine your phone's flashlight on it. The LED should go from dim or off to bright.

In normal room light the LED may only glow faintly. That's expected: the photoresistor still has a fairly high resistance until you shine a bright light on it.

## Part 5: Buzzer

The **active buzzer** in your kit makes a beep on its own whenever it gets power. No extra parts are needed to make a sound. It **does** have polarity: the **longer leg** (or the leg marked **+** on top) goes toward power.

**Make sure you have the active buzzer.** It has a sticker on top and a sealed black bottom. If your kit also has a buzzer with a green circuit board visible underneath, that's a *passive* buzzer. It needs a changing signal to make a tone, so on its own it will only click. We'll use it with Arduino later.

First, just make it beep:

1. **Turn the power off** and clear your LED circuit.
2. **Place the buzzer** so its two legs are in two different rows.
3. **Connect the buzzer's + (long) leg to the + rail** and its **other leg to the – rail**.
4. **Turn the power on.** It should beep continuously. (It's loud! Turn it off when you're done.)

Now add the potentiometer as a **volume knob**:

**5V (+)** → **potentiometer** → **buzzer** → **GND (–)**

<svg viewBox="0 -10 380 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Series circuit: 5 volts, potentiometer, active buzzer, ground" style="max-width:380px;width:100%;height:auto;font-family:Inter,sans-serif;font-size:13px">
  <g fill="none" stroke="#2c3f89" stroke-width="3" stroke-linejoin="round">
    <path d="M40 40 H100" />
    <path d="M190 40 H230" />
    <path d="M320 40 H360 V150 H40 V40" />
    <path d="M100 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M120 62 L172 16 m-12 1 l12 -1 l-1 12" stroke-width="2" />
    <rect x="245" y="18" width="60" height="44" rx="22" fill="#222" stroke="#222" />
    <path d="M230 40 h15 M305 40 h15" />
  </g>
  <circle cx="40" cy="40" r="5" fill="#c0392b" />
  <circle cx="40" cy="150" r="5" fill="#2c3f89" />
  <text x="30" y="20" fill="#c0392b" font-weight="700">5V (+)</text>
  <text x="30" y="175" fill="#2c3f89" font-weight="700">GND (–)</text>
  <text x="145" y="80" text-anchor="middle">potentiometer</text>
  <text x="275" y="45" fill="#fff" text-anchor="middle" font-weight="700">BUZZER</text>
  <text x="252" y="14" fill="#c0392b" font-weight="700">+</text>
  <text x="275" y="80" text-anchor="middle">active buzzer</text>
  <text x="275" y="95" text-anchor="middle" fill="#666">(+ leg on the left)</text>
</svg>

1. **Turn the power off.**
2. **Remove the jumper from the + rail to the buzzer's + leg.**
3. **Place the potentiometer** with each leg in its own row.
4. **Connect the pot's middle leg** to the buzzer's + leg row.
5. **Connect one of the pot's outer legs** to the + rail.
6. **Turn the power on and turn the knob.** The buzzer should get quieter, and eventually stop, as the resistance goes up.

The buzzer is rated for 5V, so it doesn't need the 220Ω resistor.

**Try it:** swap the potentiometer for the photoresistor. Can you make a buzzer that only sounds when a light shines on it?

## Part 6: Build the Velostat Sensor

The sensor is a sandwich: a piece of Velostat between two conductive layers, each with a wire coming off it.

```
   cardstock
   copper tape  ──── lead A
   VELOSTAT
   copper tape  ──── lead B
   cardstock
```

1. **Cut two squares of cardstock**, about 2" × 2" (5cm × 5cm).
2. **Stick a strip of copper tape onto each square.** Leave an extra 1" tail hanging off the edge. That tail is where you'll clip your wire.
3. **Cut a square of Velostat** slightly **bigger** than the copper area. It should fully cover the copper so the two copper strips can never touch each other directly.
4. **Stack them:** cardstock + copper (facing up), Velostat, then copper (facing down) + cardstock. Line the copper strips up in an X or directly on top of each other.
5. **Tape the edges closed** with masking tape so the layers stay lined up.
6. **Clip an alligator clip to each copper tail.** Those are your two sensor leads. It doesn't matter which is which: Velostat has no polarity.

**Optional test:** set a multimeter to resistance (Ω) and touch the probes to the two copper tails. Watch the number drop as you press. If it reads close to 0Ω without pressing, the copper layers are touching; add more Velostat.

## Part 7: The Velostat Circuit

This is the same circuit as Parts 3 and 4. Everything goes in **one loop** (a series circuit) from **+** to **–**, with the Velostat sensor as the variable resistor:

**5V (+)** → **Velostat sensor** → **220Ω resistor** → **LED** → **GND (–)**

<svg viewBox="0 -10 510 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Series circuit: 5 volts, Velostat sensor, 220 ohm resistor, LED, ground" style="max-width:510px;width:100%;height:auto;font-family:Inter,sans-serif;font-size:13px">
  <g fill="none" stroke="#2c3f89" stroke-width="3" stroke-linejoin="round">
    <path d="M40 40 H100" />
    <path d="M190 40 H230" />
    <path d="M320 40 H360" />
    <path d="M450 40 H490 V150 H40 V40" />
    <rect x="100" y="22" width="90" height="36" rx="4" fill="#222" stroke="#222" />
    <path d="M230 40 h7 l8 -12 l12 24 l12 -24 l12 24 l12 -24 l12 24 l8 -12 h7" />
    <path d="M360 40 h27 M387 22 V58 L423 40 Z" fill="#f3c95b" />
    <path d="M423 22 V58 M423 40 h27" />
    <path d="M402 14 l10 -10 M412 18 l10 -10" stroke-width="2" />
  </g>
  <circle cx="40" cy="40" r="5" fill="#c0392b" />
  <circle cx="40" cy="150" r="5" fill="#2c3f89" />
  <text x="30" y="20" fill="#c0392b" font-weight="700">5V (+)</text>
  <text x="30" y="175" fill="#2c3f89" font-weight="700">GND (–)</text>
  <text x="145" y="45" fill="#fff" text-anchor="middle" font-weight="700">VELOSTAT</text>
  <text x="145" y="80" text-anchor="middle">pressure sensor</text>
  <text x="275" y="80" text-anchor="middle">220Ω resistor</text>
  <text x="405" y="80" text-anchor="middle">LED</text>
  <text x="405" y="95" text-anchor="middle" fill="#666">(long leg on the left)</text>
</svg>

With the **power off**:

1. **Place the LED** across two rows on the breadboard. Remember which leg is longer: the **long leg (+, anode)** points toward power, the **short leg (–, cathode)** toward ground.
2. **Connect the LED's short leg to the – rail** with a jumper wire.
3. **Put the 220Ω resistor** so one leg shares a row with the LED's long leg, and the other leg is in a new, empty row.
4. **Clip one sensor lead** to a jumper wire in the + rail.
5. **Clip the other sensor lead** to a jumper wire in the resistor's free row.
6. **Turn the power on and press the sensor.** The LED should get brighter the harder you press.

**Why the resistor?** When you squeeze the Velostat hard, its resistance can get very low. The 220Ω resistor makes sure there's always enough resistance in the loop to keep the LED from burning out.

## Troubleshooting

- **Nothing lights up, even when pressing hard.**
  - Is the power module on, with its LED lit?
  - Is the LED backwards? Flip it around.
  - Are the LED, resistor and wires actually in the same rows? Follow the loop from + to – with your finger.
  - Are the power rails split in the middle of the board? Bridge them with a jumper.
- **The LED is bright even when you're not pressing.** The two copper layers are touching around the edges of the Velostat. Use a bigger piece of Velostat, or add a second layer.
- **The LED barely changes.** Try two layers of Velostat, a bigger sensor, or pressing with your whole palm. You can also try the **3.3V** setting on the module to make small changes easier to see.
- **The LED flickers.** Check that the alligator clips are firmly on the copper tails and not slipping.
- **Turning the potentiometer does nothing.** You're probably using the two outer legs. One of your connections needs to be the **middle leg**.
- **The buzzer only clicks, or makes no sound.** Check that it's the **active** buzzer (sticker on top, sealed bottom) and that its + leg is toward power.

## Going Further

- **Swap the LED for the buzzer.** Put the Velostat in place of the potentiometer from Part 5 and you have a pressure-activated alarm.
- **Compare all three.** Which feels most expressive to control: turning a knob, changing the light, or squeezing?
- **Change the shape.** Make a long strip, a big pad, or a sensor sewn into fabric using conductive thread or fabric instead of copper tape.
- **Hide it in something.** A glove, a pillow, a shoe insole, a book cover: where would pressure mean something?

Next week we'll start reading sensors like this one with an **Arduino**, so the pressure can control sound, motors or code instead of just an LED.

## Video Walkthrough

<a href="https://www.youtube.com/watch?v=SLRYX879Py0" target="_blank">Watch the Velostat Pressure Sensor Workshop video on YouTube</a>

## Additional Resources

- <a href="https://makeabilitylab.github.io/physcomp/electronics/breadboards.html" target="_blank">Makeability Lab - Breadboards</a>
- <a href="https://makeabilitylab.github.io/physcomp/electronics/variable-resistors.html" target="_blank">Makeability Lab - Variable Resistors</a>
- <a href="https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/" target="_blank">Instructables - Velostat Homemade Pressure Sensor Mat</a>
