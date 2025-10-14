---
title: Print to Serial Monitor
---

# Serial Monitor

## What is it? Where is it?

First, think back to when we were learning the Arduino software graphical user interface (GUI). To upload our code we learned how to make sure of two things:

###### 1.) How to select the correct board that we are using

###### 2.) How to make sure we are connected to the correct <strong>port</strong> that our Arduino is connected to.

##### What it is

The port that we are connected to is the <strong>"Serial Port"</strong>. The serial port is used to achieve a communication between the computer and the Arduino board using a process called "Serial Communication". You can think of it as both your computer and your Arduino board having a conversation, where they take turns sending messages to each other.

<strong>Serial Cables</strong>

<div class="uk-column-1-2">
<p>Serial cables today (USB)</p>
<p><img src="./images/new_serial.jpg"></img></p>
<p>Serial cables back then (RS-422)</p>
<p><img src="./images/old_serial.webp"></img></p>
</div>

You can actually see some visual feedback of the communication by looking at some board's RX and TX LEDs. The RX LED blinks when the board is <strong>(r)eceiving</strong> information from the computer, and the TX LED blinks when the board is <strong>(t)ransmitting</strong> information to the computer.

<p><img width="400" src="./images/arduino_LEDs.jpg"></img></p>

To see the actual messages the Arduino is <strong>sending</strong> to our computer, we use the <strong>Serial Monitor</strong>.

##### Where it is

The Serial Monitor can be accessed by clicking on the magnifying glass icon in the top right corner of the Arduino IDE, and the Serial Monitor window will pop up on the bottom of the screen.

<p><img width="100%" src="./images/serial_monitor.png"></img></p>


---

### Serial Port

<blockquote class="info">
<span class="uk-label">Note</span>

<p>Check out the official Arduino documentation on the Serial Monitor:
<a href="https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-monitor/">Serial Monitor: Arduino Documentation</a>
</p>

<p><strong>Makeabilitylab</strong> has a more in-depth post about the serial monitor.</p>

<p>
Check it out here:
<a href="https://makeabilitylab.github.io/physcomp/communication/serial-intro.html ">Intro the Serial Monitor</a>
</p>

<p>How to use Debug with Serial:
<a href="https://makeabilitylab.github.io/physcomp/arduino/serial-print.html#step-3-open-serial-monitor-in-the-arduino-ide">Debugging with Serial</a>
</p>
</blockquote>


