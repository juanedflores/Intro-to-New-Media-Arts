---
heading: Servo Motor
---

<img width="300" src="./images/servo_motor_internal.webp"></img>

## What is a Servo Motor?

"Servo" refers to the control mechanism of a servo motor. Servo comes from "servus", the Latin word for slave. The motors get their name from the fact that they can provide more control than a mere DC motor. With this motor, you can control **position** (rotational angle).

## How a Servo Motor Works

### Control Mechanism

Servo motors actually use a DC motor but with more parts. Inside a servo motor is a mechanism that detects the rotational motion of the DC motor, and with that information it is able to "perform feedback control of motor position".

### Gear Train

The gear assembly is to reduce RPM (rotations per minute) and to increase torque.

Check out this explanation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/1WnGv-DPexc?si=9kXZWLxdPpDr2kEd&amp;start=284" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Uses: Advantages/Disadvantages

Servo motors can operate at high speeds with reliable torque over a wide speed range.

Because of their ability to accurately position, they are used in a variety of applications that require precision and control. One application is to use them as joins for robots.

Servo motors have their own drivers built-in, so you can plug directly to Arduino (depending on the number of servos you want to use).

## Types of Servo Motors

Not all servo motors are the same. There are different sizes, some use AC motors vs. DC motors, and there are different types of behaviours.

When you google search "Servo Motor" you might get results of a blue rectangular motor like this:

<img width="300" src="./images/servo_sg90.jpg"></img>

However, pay attention to the label. In this previous photo, it is a **Tower Pro SG90**.

When moving the shaft carefully by hand, you might notice that it only goes 180 degrees. This type of servo is called a **Standard Rotation Servo** or **Closed Loop**. This limited rotation is usually from an internal _limiting pin_ which physically stops the gets from moving any further.

Closed Loop type servo motors provide the most control and most commonly used.

With this motor:

<img width="300" src="./images/servo_ft90r.jpg"></img>

Turning the shaft by hand will result in a full 360 degrees rotation. This is called a **Continuous Rotation Servo** or **Open Loop**.

Paying attention to the label is helpful because these motors look very similar.

<img width="600" src="./images/servo_type.png"></img>

<iframe width="560" height="315" src="https://www.youtube.com/embed/XrEN1oszq_Y?si=KNe9o1aePUMLApdJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Also on the label, you will usually find a weight. This is referring to the motor's torque. For example, the SG90 can apply 9g of force. A bigger servo motor can apply more force, because of the larger gears.

## Specs

Each motor should come with its own specifications. These are the specs for the standard SG90:

Operating Voltage: 4.8V - 6V  
Stall Torque: 1.6 kg-cm  
Stall Current: 650 mA  
Weight: 9g

- **Operating Voltage**: The voltage range to operate the motor safely. Remember: The higher the voltage applied, the stronger the motor will perform.

- **Stall Torque**: The maximum torque output of the motor when its unable to rotate further.

- **Stall Current**: The maximum current the motor can draw when at stall or maximum load condition (when the shaft can not rotate).

- **Weight**: Knowing the weight could be useful when weight constraints are crucial.

### A Note on Power and Arduino

As we have seen with DC motor control and Arduino, you must be careful about how much current the motor will draw from the Arduino, otherwise it could damage the board. Servo motors work directly with the +5V supply rails, but if you are planning to use more than two servo motors, you might want to consider a proper servo shield.

## Pinout

<img width="300" src="./images/sg90_pinout.webp"></img>

Two of the wires are used for power, and one cable is used to send a PWM signal for control.

## Controlling a Servo Motor

As noted above, there is a cable that is meant for PWM signals. The rotation angle is changed depending on the width of a pulse. The motor will hold this position as long as this pulse width is constant.

<img width="300" src="./images/ServoGif.gif"></img>

## Using More Than One Servo Motor on Arduino

To control more than one or two servo motors using the Arduino, all you need is this <a target="\_blank" href="https://www.arduino.cc/reference/en/libraries/servo/">Arduino Library</a> and a good battery / power supply.

From the Arduino website:

> Note that servos draw considerable power, so if you need to drive more than one or two, you’ll probably need to power them from a separate supply (i.e. not the 5V pin on your Arduino). Be sure to connect the grounds of the Arduino and external power supply together.

## Extra Links

Explore Further:

* https://circuitdigest.com/microcontroller-projects/interface-servo-motor-with-arduino
* https://blog.wokwi.com/learn-servo-motor-using-wokwi-logic-analyzer/

Youtube:

- <a href="https://www.youtube.com/watch?v=1WnGv-DPexc" target="\_blank">https://www.youtube.com/watch?v=1WnGv-DPexc</a>
