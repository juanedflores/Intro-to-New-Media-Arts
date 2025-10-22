---
title: Week 9
---

# Week 9

---

### Tuesday Agenda:

- Review Pulse Width Modulation (PWM) [Video](https://www.youtube.com/watch?v=X8dHbdhnGKY)
- Introduce the Midterm Assignment (Due October 30th)
- See example projects
- Overview of switches and variable resistors. (photoresistor, FSR, tilt switch, flex sensor, etc)
- Workshop / Studio Time

---

### Midterm Assignment: Creative Interfaces

#### Description

We have looked at how switches (buttons) and variable resistors (potentiometers) work. For your midterm assignment, I want you to construct your own creative input device, using the same electronic principles.

- Button: (Break or Make) a connection of a circuit. Open vs Closed Circuit.
- Potentiometer: Variable resistor

#### What are Interfaces?

<strong>Formal Definition:</strong>

When it comes to hardware, interfaces are the physical and interactable means that bridge the communication between humans and computers. They can take many forms, from traditional input devices like keyboards and mice to more innovative and creative designs that "enhance" user experience.

We can take a look around us and see many examples of it. We use interfaces every day.

#### The Point of the Assignment; The Challenge:

This is an art course, so we can stretch, challenge, discard, or reinvent what an interface can be.

What if we challenged the word "enhace"?

What if we made something for people with disabilities? What if it was for someone without hands, eyes, or ears? What if it was for someone who could not speak?

What if we made something that was not for humans? What if it was for animals? plants? for physical phenomena like wind or light? For an imaginary being?

What if we made something that was not even useful at all? What if it was just for fun? for play? for aesthetics? for a pointless task? for a ritual? for a protest?

What if it was wearable? or portable? or stationary? what if it was anchored to a specific location? what if it was extremely heavy? or extremely light? Can you imagine an interface with a bird's feather?

What if it was large scale? or tiny?

What if it used unusual materials? or recycled materials? or everyday materials? or organic materials? Can you imagine an interface with a fork? or with a banana?

What if it required more than one person to use? What if it was made for a community?

What if it was extremely simple? or extremely complex?

<strong>Informal Definition:</strong>

You can think of interfaces as the touchpoints, or the computer's "sensors" that allow it to perceive the world around it. 

---

#### Assignment parameters and requirements:

<strong>The assignment is to design a physical interface that could be imagined to be connected to a computer.</strong>

#### Arduino

This assignment will not involve any major code writing (unless you want to!!), but we do need to confirm that your interface can be read by the Arduino and use the serial monitor to print an imagined effect. for example, if button is on, `Serial.println("LEDs turn on")`, if button is off, `Serial.println("LEDs turn off")`

You have the option of working with either a <strong>Digital Input</strong> using `digitalRead()` (on/off; 2 possible states) switch or an <strong>Analog Input</strong> using `analogRead()` (0-1023; 1024 possible states).

Therefore, your design must be able to work using these Arduino sketches:

`DigitalRead.ino`:

```arduino
void setup() {
    // Your switch should be connected to Pin 2
    pinMode(2, INPUT);
    // Using serial monitor to confirm input is working
    Serial.begin(9600);
}

void loop() {
    // read the state of your switch (is the circuit open or closed?)
    int sensorValue = digitalRead(2);

    // print results
    Serial.println(sensorValue);
}
```

`AnalogRead.ino`:

```arduino
void setup() {
    // Your sensor should be connected to Pin 2
    pinMode(2, INPUT);
    // Using serial monitor to confirm input is working
    Serial.begin(9600);
}

void loop() {
    // read the value coming from your sensor (What voltage level is it? 0-3.3V)
    int sensorValue = analogRead(A0);

    // print results
    Serial.println(sensorValue);
}
```


Be imaginative with your design, even if it is made with materials like cardboard, paper, aluminum foil, or tape. Think of it as a prototype for a more refined version of your interface. Don't let the materials limit your ideas. We will be sharing with the class on the due date.

### Requirements:

- Physical Interface Object
- Confirm can be read by one of two Arduino Sketches
- Project Documentation (take pictures of the object by itself and of it being used)
- A post on Blackboard that describes your interface, how it is used, what it is for, with images provided.

<p style="color: red;">
<strong>Due Date: October 30th, 2025</strong>
</p>


### 

To get you to start thinking about what kind of interface you want to create, here are some examples of switches and variable resistors that you can use as a starting point.

[Instructables: Switches](https://www.instructables.com/Switches/)

Here is a list of switches that exist, along with any tutorials on how to make one from scratch:

- Push Button Switch:

[Instructables](https://www.instructables.com/How-to-Make-a-Push-Button-Switch/)

Hint: Springs!

- Toggle Switch:

[Instructables](https://www.instructables.com/how-to-make-a-homemade-ONOFF-switch/)

- Tilt Switch:

[Instructables](https://www.instructables.com/Build-your-own-tilt-switch/)  
[Youtube Video](https://www.youtube.com/watch?v=jEqb6r3WV30)

Here is a list of variable resistors:

- Potentiometer:

[Instructables](https://www.instructables.com/Make-a-Pencils-Lead-Potentiometer-Experimentatio/)

- Photoresistor (LDR):

[Instructables](https://www.instructables.com/How-to-use-a-photoresistor-or-photocell-Arduino-Tu/)

- Force Sensitive Resistor (FSR):

[Instructables](https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/)

- Flex Sensor:

[Instructables](https://www.instructables.com/Stickytape-Sensors/)

---

ART 150 student examples from the section taught by Sabrina Raaf:

[art150.nma](https://art150.nma-course.online/category/all-posts/creative-switch/)

---

#### Interfaces: Real World Examples

<div class="uk-margin" style="padding: 30px;">
<ul class="uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-2@s uk-grid-small uk-grid-match" uk-grid="masonry: pack">

<li>
<div>
<a href="https://vimeo.com/257009815">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: #a3be8c">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge">
<h3 class="cardtitle">Ivan Abreu: MULTIPLE VORTEX TORNADO (2013)</h3>
<div style="display: inline">
<img src="./Assignments/Creative_Interfaces/images/pages.png" alt="" style="padding-bottom: 10px" uk-image />
<span class="uk-label" style="background-color: #a3be8c">Inspiration</span>
</div>
</div>
</a>
</div>
</div>
</li>

<li>
<div>
<a href="https://play.date/">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: #a3be8c">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge">
<h3 class="cardtitle">PlayDate</h3>
<div style="display: inline">
<img src="./Assignments/Creative_Interfaces/images/playdate.jpg" alt="" style="padding-bottom: 10px" uk-image />
<span class="uk-label" style="background-color: #a3be8c">Inspiration</span>
</div>
</div>
</a>
</div>
</div>
</li>

</ul>
</div>

Take a look at this TED Talk by Holly Cohen:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-We84cxubCY?si=fiqwsISlsHhsAIe6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---


