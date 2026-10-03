---
title: DIY Pressure Sensor Workshop
heading: DIY Pressure Sensor Workshop
---

# DIY Pressure Sensor Workshop

![A sheet of Velostat, a thin, flexible black conductive plastic. Photo: [Adafruit](https://www.adafruit.com/product/1361)](images/cover.jpg)

## Summary

Today we're making our own **pressure sensor** out of Velostat, a thin black plastic that conducts electricity. The harder you press on it, the better it conducts. We'll use it to control the brightness of an LED: press lightly and the LED glows faintly, press hard and it gets bright. Then we'll turn it into a **voltage divider**, the circuit an Arduino uses to read sensors like this one.

This workshop builds on the [Breadboard Circuits Workshop](../Breadboard_Circuits/breadboard_circuits.html): the Velostat is a **variable resistor**, just like the potentiometer and the light sensor, so it drops right into the same circuit.

### Steps

[We will go over the steps together as a class].

1. Build the Velostat sensor.
2. Wire the Velostat sensor, a resistor and an LED together, then press!
3. Turn the sensor into a **voltage divider** and measure it with a multimeter.
4. Finished? Plug your sensor into a **class station** and see it on the projector.

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

- **Breadboard**, **power supply module** and **9V adapter**, set up as in the [Breadboard Circuits Workshop](../Breadboard_Circuits/breadboard_circuits.html#part-2-powering-the-breadboard)
- **LED** (any color)
- **220Ω resistor** (bands: red, red, brown)
- **10kΩ resistor** (bands: brown, black, orange)
- **Jumper wires**
- **Alligator clips**

Provided by the lab:

- **Velostat** sheet
- **Copper tape** or aluminum foil
- **Cardstock or thin cardboard**
- **Masking tape**
- **Multimeter** (for testing your sensor, and for Part 3)

## Part 1: Build the Velostat Sensor

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

## Part 2: The Velostat Circuit

This is the same circuit as the potentiometer and light sensor circuits from the [Breadboard Circuits Workshop](../Breadboard_Circuits/breadboard_circuits.html). Everything goes in **one loop** (a series circuit) from **+** to **–**, with the Velostat sensor as the variable resistor:

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

## Part 3: The Velostat as a Voltage Divider

So far the Velostat has changed how much **current** flows, which is why the LED got brighter. Soon an Arduino will read the sensor, but an Arduino can't measure resistance or current directly. It can only measure **voltage**. A **voltage divider** turns a changing resistance into a changing voltage.

A voltage divider is just **two resistors in a row** between + and –. The 5V gets shared between them, and the point in the middle (**V<sub>out</sub>**) sits somewhere between 0V and 5V, depending on how big each resistor is compared to the other:

- **Velostat resting** (high resistance): it takes most of the 5V, so V<sub>out</sub> is **low**.
- **Velostat pressed** (low resistance): the 10kΩ resistor takes most of it, so V<sub>out</sub> **rises toward 5V**.

You already used one: a **potentiometer's three legs** are a voltage divider, with the middle leg as V<sub>out</sub>. Turning the knob changes how the 5V is shared.

**5V (+)** → **Velostat** → **V<sub>out</sub>** → **10kΩ resistor** → **GND (–)**

<svg viewBox="0 0 360 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Voltage divider: 5 volts, Velostat sensor, the output point, a 10 kilohm resistor, ground. A multimeter measures between the output point and ground." style="max-width:360px;width:100%;height:auto;font-family:Inter,sans-serif;font-size:13px">
  <g fill="none" stroke="#2c3f89" stroke-width="3" stroke-linejoin="round">
    <path d="M110 30 V60" />
    <rect x="90" y="60" width="40" height="80" rx="4" fill="#222" stroke="#222" />
    <path d="M110 140 V170 M110 170 V200" />
    <path d="M110 200 l-12 6 l24 10 l-24 10 l24 10 l-24 10 l24 10 l-24 10 l12 6" />
    <path d="M110 272 V300" />
    <path d="M110 170 H230" />
    <path d="M230 170 V190 M230 260 V300 H110" stroke-dasharray="6 5" />
    <rect x="200" y="190" width="60" height="70" rx="8" stroke="#2c3f89" fill="#fff" />
  </g>
  <circle cx="110" cy="30" r="5" fill="#c0392b" />
  <circle cx="110" cy="300" r="5" fill="#2c3f89" />
  <circle cx="110" cy="170" r="6" fill="#f3c95b" stroke="#2c3f89" stroke-width="2" />
  <text x="125" y="34" fill="#c0392b" font-weight="700">5V (+)</text>
  <text x="125" y="318" fill="#2c3f89" font-weight="700">GND (–)</text>
  <text x="110" y="104" fill="#fff" text-anchor="middle" font-weight="700" transform="rotate(-90 110 104)">VELOSTAT</text>
  <text x="80" y="240" text-anchor="end">10kΩ</text>
  <text x="80" y="175" text-anchor="end" font-weight="700">V<tspan font-size="10" dy="3">out</tspan></text>
  <text x="230" y="222" text-anchor="middle" font-weight="700">V</text>
  <text x="230" y="240" text-anchor="middle" font-size="11">meter</text>
  <text x="240" y="160" font-size="12" fill="#666">(later: Arduino A0)</text>
</svg>

With the **power off**:

1. **Place the 10kΩ resistor** so one leg is in the – rail and the other is in an empty row. That row is **V<sub>out</sub>**.
2. **Clip one sensor lead** to a jumper wire in the + rail.
3. **Clip the other sensor lead** to a jumper wire in the V<sub>out</sub> row.
4. **Set the multimeter to DC volts** (V with a straight line, the 20V range if it has ranges).
5. **Turn the power on.** Touch the **red probe** to the V<sub>out</sub> row and the **black probe** to the – rail.
6. **Press the sensor** and watch the number climb. Write down the reading with no pressure, a light press and a hard press.

**Try it:** swap the 10kΩ resistor for the 220Ω one. Does the range of readings get bigger or smaller? The fixed resistor should be roughly as big as the Velostat's resistance, so the voltage swings as much as possible.

On Wednesday, instead of the multimeter's red probe, a wire will go from V<sub>out</sub> to the Arduino's **A0** pin, and `analogRead()` will turn the voltage into a number from 0 to 1023.

## Part 4: Plug Into the Class Sensor Grid

Finished early? Bring your sensor to one of the four **class stations**. Each station is an Arduino with five open inputs, and all four show up on the projector, where every sensor gets its own tile. This is the voltage divider from Part 3, except the Arduino reads V<sub>out</sub> instead of the multimeter.

1. **Unclip your sensor** from your own breadboard.
2. **Clip one lead to the station's + rail** (3.3V, red).
3. **Clip the other lead to an open labeled row** (A0–A4). That row already has a 10kΩ resistor to – on it, so your sensor completes the voltage divider.
4. **Find your tile** on the projector, click its label and type your name.
5. **Squeeze!** Your tile fills as you press. When everyone squeezes at once, watch the **Squeeze together** meter.

**Don't** connect anything from the station to your breadboard's power module. The station Arduinos only take **3.3V**.

The stations send their readings over **Wi-Fi** to the teacher's laptop, so there are no cables to trip over. The projector page is the [Sensor Grid](station/index.html) (press **T** on it to try it with the keyboard).

## Troubleshooting

- **Nothing lights up, even when pressing hard.**
  - Is the power module on, with its LED lit?
  - Is the LED backwards? Flip it around.
  - Are the LED, resistor and wires actually in the same rows? Follow the loop from + to – with your finger.
- **The LED is bright even when you're not pressing.** The two copper layers are touching around the edges of the Velostat. Use a bigger piece of Velostat, or add a second layer.
- **The LED barely changes.** Try two layers of Velostat, a bigger sensor, or pressing with your whole palm. You can also try the **3.3V** setting on the module to make small changes easier to see.
- **The LED flickers.** Check that the alligator clips are firmly on the copper tails and not slipping.
- **The multimeter reads 0 or doesn't change.** Check it's on DC volts, the black probe is on the – rail, and the red probe is in the same row as both the sensor lead and the 10kΩ resistor.

## Going Further

- **Hide it in something.** A glove, a pillow, a shoe insole, a book cover: where would pressure mean something?
- **Swap the LED for the buzzer** from the Breadboard Circuits Workshop: a pressure-activated alarm.

## Video Walkthrough

<a href="https://www.youtube.com/watch?v=SLRYX879Py0" target="_blank">Watch the Velostat Pressure Sensor Workshop video on YouTube</a>

## Additional Resources

- <a href="https://makeabilitylab.github.io/physcomp/electronics/variable-resistors.html" target="_blank">Makeability Lab - Variable Resistors</a>
- <a href="https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/" target="_blank">Instructables - Velostat Homemade Pressure Sensor Mat</a>
