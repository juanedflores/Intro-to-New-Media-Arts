---
title: "Midterm: Creative Interfaces"
heading: "Midterm: Creative Interfaces"
---

# Midterm: Creative Interfaces

## Summary

We have looked at how switches (buttons) and variable resistors (potentiometers) work. For your midterm assignment, you will construct your own **creative input device**, using the same electronic principles:

- **Button:** makes or breaks a connection in a circuit. Open vs. closed circuit.
- **Potentiometer:** a variable resistor. Also think of photoresistors, Velostat, and graphite.

[View the midterm slides](Creative_Interfaces_Slides/index.html)

### Timeline

::: {.timeline}
- **October 12** — Midterm introduced. The Button sketch. RGB LEDs.
- **October 19** — The built-in accelerometer. Midterm studio.
- **October 21** — Keyboard and mouse simulation. Midterm studio.
- **October 26** — Topics in sound. Midterm studio.
- **October 28** — Midterm Critique
:::

### Requirements

- [x] A physical interface object
- [x] Confirm it can be read by one of the [two Arduino sketches](#arduino) below
- [x] Project documentation: pictures of the object by itself, and of it being used
- [x] An Are.na channel called "Creative Interfaces" that describes your interface, how it is used, and what it is for, with your images
- [x] Participation in the Midterm Critique on October 28

## What Are Interfaces?

### Formal Definition

When it comes to hardware, interfaces are the physical and interactable means that bridge the communication between humans and computers. They can take many forms, from traditional input devices like keyboards and mice to more innovative and creative designs that "enhance" user experience.

We can take a look around us and see many examples of them. We use interfaces every day.

[Doug Engelbart: The Mother of All Demos](https://dougengelbart.org/content/view/162/)

### Informal Definition

You can think of interfaces as the touchpoints, or the computer's "sensors", that allow it to perceive the world around it.

## The Challenge

This is an art course, so we can stretch, challenge, discard, or reinvent what an interface can be.

What if we challenged the word "enhance"?

What if we made something for people with disabilities? What if it was for someone without hands, eyes, or ears? What if it was for someone who could not speak? ([DIYAbility](https://www.diyability.org/))

What if we made something that was not for humans? What if it was for animals? Plants? For physical phenomena like wind or light? For an imaginary being? ([Video](https://vimeo.com/150344536))

What if we made something that was not even useful at all? What if it was just for fun? For play? For aesthetics? For a pointless task? For a ritual? For a protest?

What if it was wearable? Or portable? Or stationary? What if it was anchored to a specific location? What if it was extremely heavy? Or extremely light? Can you imagine an interface with a bird's feather?

What if it was large scale? Or tiny?

What if it used unusual materials? Or recycled materials? Or everyday materials? Or organic materials? Can you imagine an interface with a fork? Or with a banana?

What if it required more than one person to use? What if it was made for a community?

What if it was extremely simple? Or extremely complex?

## The Assignment

Design a physical interface that could be imagined to be connected to a computer.

Be imaginative with your design, even if it is made with materials like cardboard, paper, aluminum foil, or tape. Think of it as a prototype for a more refined version of your interface. Don't let the materials limit your ideas.

We will share our work with our peers in our first class critique on the due date, so your project should be ready to present. Critiques usually take the full 2.5 hours of class.

### Arduino

This assignment will not involve any major code writing (unless you want to!), but we do need to confirm that your interface can be read by the Arduino, and use the Serial Monitor to print a reading based on interaction.

You can also use the Serial Monitor to print out an imagined effect. For example, if the button is on, `Serial.println("LEDs turn on")`; if the button is off, `Serial.println("LEDs turn off")`.

You have the option of working with either a **digital input** using `digitalRead()` (on/off: 2 possible states) or an **analog input** using `analogRead()` (0–1023: 1024 possible states). Your design must work with one of these two sketches:

#### DigitalRead.ino

Wire your switch the same way as the [Button sketch](../../Arduino/button/button.html), with the 10kΩ pull-down resistor.

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

#### AnalogRead.ino

Wire your variable resistor as a voltage divider, the same way as the Velostat sensor in the [DIY Pressure Sensor Workshop](../../Workshops/Velostat_Workshop/velostat_workshop.html).

```arduino
void setup() {
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

## Switches and Variable Resistors

To get you to start thinking about what kind of interface you want to create, here are some examples of switches and variable resistors that you can use as a starting point.

[Instructables: Switches](https://www.instructables.com/Switches/)

### Switches

#### Push Button Switch

[Instructables](https://www.instructables.com/How-to-Make-a-Push-Button-Switch/)  
[Cardboard Push Button](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Push+Button/356)  
[Stomp/Foot Switch](https://makeymakey.com/pages/stomp-switch-start-and-stop-timer)  
[DIYAbility](https://www.diyability.org/guide/make-a-simple-capability-switch/)

Hint: Springs!

#### Toggle Switch

[Instructables](https://www.instructables.com/how-to-make-a-homemade-ONOFF-switch/)  
[Lever Switch](https://learn.browndoggadgets.com/Guide/Paper+Circuits+Cubes+-+Lever+Switch/522)

Guides by Pete Prodoehl:

[Slide Switch](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Slide+Switch/253)  
[Cardboard Knife Switch](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Knife+Switch/203)

#### Tilt Switch

[Instructables](https://www.instructables.com/Build-your-own-tilt-switch/)  
[YouTube Video](https://www.youtube.com/watch?v=jEqb6r3WV30)  
[Tilt Joystick](https://makeymakey.com/pages/diy-tilt-joystick)

### Variable Resistors

- Potentiometer: [Instructables](https://www.instructables.com/Make-a-Pencils-Lead-Potentiometer-Experimentatio/)
- Photoresistor (LDR): [Instructables](https://www.instructables.com/How-to-use-a-photoresistor-or-photocell-Arduino-Tu/)
- Force Sensitive Resistor (FSR): [Instructables](https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/), or the Velostat sensor from our [DIY Pressure Sensor Workshop](../../Workshops/Velostat_Workshop/velostat_workshop.html)
- Flex Sensor: [Instructables](https://www.instructables.com/Stickytape-Sensors/)

### Custom Interfaces

- [Crank Counter](https://learn.browndoggadgets.com/Guide/Crank+Counter/238)
- [Therapy Ball Controller](https://makeymakey.com/blogs/how-to-instructions/balance-weight-shifting-ball-controller-as-assistive-technology-by-katie-butzu-and-mark-lyons)
- [Hula Hoop Controller](https://makeymakey.com/pages/hula-hoop-controller)

![The Playdate, a handheld game console with a crank on its side](images/playdate.jpg)

## Inspiration & Examples

ART 150 student examples from the section taught by Sabrina Raaf: [art150.nma](https://art150.nma-course.online/category/all-posts/creative-switch/)

[The Interface as Artwork](https://liveinterfacesjournal.ulusofona.pt/the-interface-as-artwork/#elementor-toc__heading-anchor-2)

One button games: [c1ic.mx](https://c1ic.mx/menu.html)

Take a look at this TED Talk by Holly Cohen:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-We84cxubCY?si=fiqwsISlsHhsAIe6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
