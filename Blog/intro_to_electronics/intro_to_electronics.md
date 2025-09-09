---
title: Week 2
---

# Intro to TinkerCAD

## What is TinkerCAD?

TinkerCAD is a web based design tool. It can do 3D design, but we are going to be interested in using it to build and simulate circuits as a way to introduce the basics of electronics.

<video width="100%" height="360px" autoplay loop muted>
  <source src="https://ibles-content.tinkercad.com/static/tinkercad/marketing/circuits/hero-circuits-720.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Below is an embed of the TinkerCAD circuit project that I shared in class. Feel free to interact with it or viewing through the shared classroom designs.

---

<iframe width="100%" height="453" src="https://www.tinkercad.com/embed/e9qoAI7nafb?editbtn=1" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>

<blockquote class="info">
<span class="uk-label">Note</span>
<p>TinkerCAD is owned by Autodesk, which also provides software like Fusion, EAGLE, and Maya.</p>
</blockquote>

---

## The Simplest Circuit

The simplest circuit is made of three parts:

- A power supply or (The Source)
- Something that is being powered (The Load)
- A path for electrons to travel (Electrical Conductor)

### The Source

A **power supply** is what is supplying electrical energy. This can be a battery, which converts chemical energy into electrical. 

<div>
<img src="images/source.png" width=400px style=""></img>
</div>

### The Load

A **load** is what is consuming that electrical energy. This can transform into another type of energy like light, motion, and heat. 

<div>
<img src="images/load.png" width=300px style=""></img>
</div>

### Electrical Conductor

An **electrical conductor** is made of a material that allows the free movement of electrons. When connected to a battery, electrons are pushed through this path. This is usually a metal like copper.

<div>
<img src="images/conductor.jpg" width=300px style=""></img>
</div>

---

## Building the Simple Circuit in TinkerCAD

Before you can start building circuits, you do have to make an account. Once you do, you can start creating by clicking on the "+ Create" button. Click on the "Circuits" option and you can start building.

<div>
<img src="images/create.png" width=300px style=""></img>
</div>

The first thing to notice is that all the basic components are conveniently available to us on the right hand side.

<div>
<img src="images/components.png" width=300px style=""></img>
</div>

Clicking on any of them will place it on your cursor until you put it down on the "canvas". Grab an LED and place it down somewhere. Once you do, you might notice that a window pops up. Here you can change some of the properties of this component. For example, with an LED, you can change its color.

<div>
<img src="images/properties.png" width=300px style=""></img>
</div>

Next, try using the search bar and type battery. Doing so will give you three main options.

<div>
<img src="images/batteries.png" width=300px style=""></img>
</div>

Grab the 3V battery and set it near the LED. Try clicking on one of the <span class="tooltip" style="cursor: pointer;" uk-tooltip="Battery <strong>terminals</strong> are the electrical contacts that are used to connect to a load. They are either positive (+) or negative (-).">terminals</span> and attach the wire that just appeared to one of the legs of the LED.

If you see it attach successfully do the same with the other side.

If both sides are connected it looks like we have a <span class="tooltip" style="cursor: pointer;" uk-tooltip="A closed circuit is one that provides a continous path without interruption.">closed circuit</span>. In theory the LED should light up.

### Start a Simulation

Click "Start Simulation" to start the simulation. You can also press Spacebar. Once it starts, you cannot make any edits. It will "simulate" a circuit meaning that it will work similarly to the real world. The image of the LED should light up.

<div>
<img src="images/simulation.png" width=300px style=""></img>
</div>


If this is your first time building a circuit, then it is 50% likely that your LED does not appear to be on. It should look like the following image.

<div>
<img src="images/first_circuit.png" width=300px style=""></img>
</div>

If it is not on, it is because the terminals of the battery need to be connected to the 'correct' leg.

### LED Polarity

LED stands for **<mark>Light-Emitting Diode</mark>**. A diode is another basic component. 

The short explanation is that it is a component that only allows electrical current to pass in **one direction**. It is like a one way street. So just like a battery, it has a **<span style="color: red">positive</span>** and a **negative** side.

In other words, the LED, diode, and battery all have **polarity**. This means that positive goes to positive and negative goes to negative.

LEDs and diodes both work in a similar way, with the only difference being that an LED is a diode that emits light when powered.

<blockquote class="info">
<span class="uk-label">Note</span>
<p>There is a separate post that goes into more detail about diodes. Feel free to skip it for now. We just want to build a circuit.</p>

<div style="width: 100%; display: flex; padding-top: 25px;">
<div style="width: 70%; margin: auto;">

<li class="" style="list-style-type: none; margin: auto">
<div>
<a href="./Electronics/diode/diode.html">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: rgb(210, 230, 250)">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="">
<h3 class="cardtitle">Diode</h3>
<div style="display: inline">
<img src="../../Electronics/diode/images/cover.jpg" alt="" style="padding-bottom: 10px" uk-image />
<span class="uk-label" style="background-color: rgb(56, 79, 172)c">Basic Component</span>
</div>
</div>
</a>
</div>
</div>
</li>

</div>
</div>

</blockquote>


<ul uk-accordion style='pading-bottom: 5vh'> <li class='uk-open'>
<a id='code-file' class='uk-accordion-title' href='#'>Ground</a>
<div class='uk-accordion-content' style='padding-bottom:20px; margin-bottom:20px'>
Engineers, by convention, also call the **NEGATIVE** side the Ground side of the connection. Ground is a term used by engineers to indicate a lower voltage terminal with 0 (zero) relative volts.
</div>

#### Leg Length

The most common way to determine which leg is which, is by seeing the length of the legs. The longer leg is the positive, which is called the **<span style="color: red">anode</span>**. The shorter leg is the negative which is called the **cathode**.

<div>
<img src="images/legs.webp" width="400px" style=""></img>
</div>

#### Flat Side / Notch

Another way to tell is by seeing which side of the LED has a flat side. This side would be the negative.

<div>
<img src="images/notch.webp" width="400px" style=""></img>
</div>

#### Plate

The last way to tell is by looking inside the LED. There are two sectioned plates. The bigger one is the negative side.

<div>
<img src="images/plate.webp" width="400px" style=""></img>
</div>

## Protecting the LED

With this information let's go back to TinkerCAD. Hovering over one of the LED legs will reveal what it is.

<div>
<img src="images/anode.png" width="400px" style=""></img>
</div>

I know **<span style="color: red">anode</span>** means positive, so I will connect it to the positive terminal of the coin cell battery.

<blockquote class="success">
<span class="uk-label uk-label-success">Tip</span>
<p>
I will change the wire colors to match the **<span style="color: red">red</span>** and **black** to match the **<span style="color: red">positive</span>** and **negative**. This does not affect the circuit in any way but it is good practice to keep this convention consistent so that you can visually digest better what is going on.
</p>
</blockquote>


<div>
<img src="images/colors.png" width="400px" style=""></img>
</div>

<div>
<img src="images/warning.png" width="400px" style=""></img>
</div>

The LED should work now, but there appears the be a warning icon next to the lit LED. Hovering over it reveals a message.

<div>
<img src="images/warning2.png" width="400px" style=""></img>
</div>

It says:

> Current through the LED is 61.9mA, while recommended maximum is 20.0 mA. The usable lifetime of the LED may be reduced.

It is telling us that something called current is more than the recommended maximum. There is a lot to unpack here, but i'll cut to the chase. An LED is usually paired with a resistor, another basic component.

<div>
<img src="images/resistor.png" width="400px" style=""></img>
</div>

Now the LED is on and the warning is gone, which is what we want, but in order to understand why this thing called a resistor is needed we need to understand a little bit about how electricity works.

## Voltage, Current, and Resistance

<blockquote class="warning">
<span class="uk-label uk-label-warning">Warning</span>
<p>
Before I attempt to note down some of the basics of electronics, know that this takes time to learn. Knowing the how and why of things is definitely useful, satisfying, and recommended, unfortunately (or fortunately) with our time limitation it is impossible to go into it in depth. It can also be a little dull, tedious, and overwhelming. Because this is a design course and we are artists and designers, I am guessing we mostly want to start making things happen, and ponder about what our creations are doing. I also think it's important to minimize the stress as much as possible and create an environment where you feel comfortable working in this area.
</p>

<p>
Trying to speed teach this material has been attempted many times in different classrooms around the world. Thankfully we can compare notes and get a sense of the different philosophies.
</p>

<p>If you find yourself feeling hungry or curious for more information, I can provide some external resources that can possibly point you in the right direction.</p>

<ul>
<li>
<a href="https://makeabilitylab.github.io/physcomp/electronics/">
Makeability Lab
</a> - A website made by Jon E. Froehlich, a computer science professor at the University of Washington.</li>
<li>
<a href="https://itp.nyu.edu/physcomp/lessons/electronics/electricity-the-basics/">ITP Physical Computing</a> - The course website made for NYU's ITP Physical Computing class.</li>
</li>
</ul>
</blockquote>

## Terminology

- Closed and Open Circuit
