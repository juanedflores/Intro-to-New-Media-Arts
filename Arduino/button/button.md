---
title: week 6
---

# Button

## How does a button work?

The button is just a simple way of completing or breaking a circuit with the simple act of "pushing" or "pressing" a button.

You could just manually join or unjoin two bare wires together to do this, but a button makes this convenient.

Often electronics kits come with a cheap button that looks like this:

<div>
<img src="./images/button.png" width=400 style=""></img>
</div>

But it can take many forms and sizes.

<div>
<img src="./images/buttons.jpg" width=400 style=""></img>
</div>

Generally, the pinout looks something like this:

<div>
<img src="./images/pinout.gif" width=300 style=""></img>
</div>

Here is a screenshot in Fritzing to show that the pins in red are connected whether the button is pressed or not. Same with the blue pins.

<div>
<img src="./images/fritzing.png" width=400 style=""></img>
</div>

---

## Circuit Demonstration

Let's do a circuit that turns an LED on when we press the button without any programming.

<div>
<img src="./images/button_analog.png" width=400 style=""></img>
</div>

First I connect the button so that it crosses over the middle of the breadboard. It might be easier to think of this middle line as a river, and the button as a bridge. Also notice that if you were to squish the button like a bug, the legs spread out to resemble more like a bridge.

Next I placed an LED on one side of the button, with one leg (the cathode) connected to the right side of the bridge.

On the left side of the bridge I placed the current limiting resistor for the LED. This is connected to ground.

<div>
<img src="./images/button_analog2.png" width=400 style=""></img>
</div>

The last step would be to connect the positive rail to the <span style="color:red">**anode**</span>.

Pressing the button should now light up the LED. This is because when you press the button, you are **completing the circuit**. When you release, you are **breaking** the circuit.

<div>
<img src="./images/tinkercad1.png" width=600 style=""></img>
</div>

By the way, because we have power going through each side of the power rails, an alternative way of wiring this is like this:

<div>
<img src="./images/tinkercad2.png" width=600 style=""></img>
</div>

Do you see why this completes the circuit?

---

## The Button Sketch

Go to:

**File** > **Examples** > **02.Digital** > **Button**

This is `Button.ino`.

Of course we should always look at the link provided in the block comment:

[https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button](https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button)

<div>
<img src="https://docs.arduino.cc/static/fb8449b4834dfbbf3c03223c8bc3e5b5/29114/schematic.png" width=100% style=""></img>
</div>

It is using the UNO, but the wiring is pretty much the same.

We are connecting one side of the switch to (+) (In our case, 3.3V).

<div>
<img src="./images/button_sketch1.png" width=400 style=""></img>
</div>

And the other side to a 10k Ohm Resistor.

<blockquote class="warning">
<span class="uk-label uk-label-warning">Warning</span>
<p>The images show a resistor with color bands of a 220 ohm resistor, but it should be 10k.</p>
</blockquote>

<div>
<img src="./images/10k.png" width=100% style=""></img>
</div>

<div>
<img src="./images/button_sketch2.png" width=400 style=""></img>
</div>

This other side of the button is ALSO connected to digital pin 2.

<div>
<img src="./images/button_sketch3.png" width=400 style=""></img>
</div>

Lastly, the other side of the resistor is connected to **Ground**.

<div>
<img src="./images/button_sketch4.png" width=400 style=""></img>
</div>

Pressing the button should turn on the built-in LED. You can confirm this by connecting an LED to pin 13 like how we did in the Blink example.

---

## In TinkerCAD

In TinkerCAD, it comes with some premade circuits with the Arduino Code.

You can find it in the dropbar menu on the right hand side:

<div>
<img src="./images/tinkercad_categories.png" width=400 style=""></img>
</div>

This is the Button example:

<div>
<img src="./images/tinker_cad_button2.png" width=100% style=""></img>
</div>

Redrawn to fit in a breadboard like we did with the Nano:

<div>
<img src="./images/tinker_cad_button.png" width=100% style=""></img>
</div>

To find the code editor:

<div>
<img src="./images/tinkercad_code.png" width=400 style=""></img>
</div>

The first thing you will see is a block code editor similar to the [Scratch Programming Language](https://scratch.mit.edu/).

<div>
<img src="./images/scratch.png" width=500 style=""></img>
</div>

To go to the text version of the code, like what we would see in the Arduino IDE. Select "Text" from this dropbar menu:

<div>
<img src="./images/text.png" width=500 style=""></img>
</div>

You can enter the **Button** example here: 

<div>
<img src="./images/text2.png" width=500 style=""></img>
</div>

And click "Start Simulation" to see if it works.

