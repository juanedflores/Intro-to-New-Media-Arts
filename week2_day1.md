# Week 2
## Let's Talk about the Arduino Nano 33 iOT

![Image](https://robocraze.com/cdn/shop/products/abx00032_iso_e270eaa5-4d04-47f7-a810-16acc9fc5b16.jpg)
There are two features that we will use in class:

- Accelerometer and Gyroscope: to use **movement** data.
- Real Time Clock: to use **time** data.

---

## IMU Chip

<ul uk-accordion style="pading-bottom: 5vh">
<li class=" uk-open">
<a id="code-file" class="uk-accordion-title" href="#">Inertial Motion Units (IMUs)</a>
<div class="uk-accordion-content" style="padding-bottom:5vh">
<img src="https://docs.arduino.cc/static/0df056d8311183483ccf7a9bf699940d/29114/nano33IOT_02_IMU.png"></img>
<p></p>
<h4 id="IC">Integrated Circuits (ICs)</h4>
<p>Inertial Motion Units (IMUs) is what combines and contains the circuitry for the accelerometer and gyrometer. It's in a chip called the LSM6DS3.</p>
<p>These tiny black squares and rectangles are called <b>Integrated Circuits or ICs</b></p>
</div>

This chip can be used by using the Arduino **LSM6DS3** Library:

<a target="_blank">https://docs.arduino.cc/libraries/arduino_lsm6ds3/</a>


## The Acceleromter

<h4 id="Accelerometer"></h4>
> An accelerometer is an electromechanical device used to measure acceleration forces.

- Measures linear acceleration (changes in speed and direction)

![](https://docs.arduino.cc/static/03722b13858adabb450adfbb02aa5601/29114/nano33IOT_01_acceleration.png)

## The Gyroscope/Gyrometer

<h4 id="Gyrometer"></h4>
> A gyroscope sensor is a device that can measure and maintain the orientation and angular velocity of an object.

- Measures angular velocity (changes in rotation) (can also detect vibrations)

![](https://docs.arduino.cc/static/3675ad70bcac369f6a2fb3b459ebd636/29114/nano33IOT_02_gyroscope.png)

<div style="display: flex; padding:10vh">
<iframe style="margin:auto" width="560" height="315" src="https://www.youtube.com/embed/yqFfmwVufMo?si=mfZZj_5_dKTLgiO6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
    

<ul uk-accordion style="pading-bottom: 5vh">
<li class=" uk-open">
<a id="code-file" class="uk-accordion-title" href="#">Classic Gyroscope</a>
<div class="uk-accordion-content" style="padding-bottom:5vh;">
<h4>Classic Gyroscope</h4>
<p>from Ancient Greek γῦρος gŷros, <b>"round"</b> and σκοπέω skopéō, <b>"to look"</b></p>
<span style="display: flex;">
<img style="margin: auto" src="https://www.researchgate.net/profile/Joerg-Wagner-4/publication/348937199/figure/fig2/AS:986422769111040@1612192923009/The-very-first-gyroscope-of-1810-the-Machine-of-Bohnenberger-Tuebingen-Germany-a.png"></img>
</span>
<p>Above is The very first gyroscope of 1810-the Machine of Bohnenberger, Tuebingen, Germany. (a) Original drawing; (b) Photo; and (c) 2.5D digital twin by CV/photogrammetry.</p>
<span style="display:flex">
<iframe style="margin:auto" width="560" height="315" src="https://www.youtube.com/embed/cquvA_IpEsA?si=Epptuzit49JDv6g2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</span>
<p>Toy Gyroscope</p>
</div>


## Input and Output Pins on the Arduino


<embed style="margin-top:4vh; margin-bottom:4vh" src="https://docs.arduino.cc/resources/pinouts/ABX00027-full-pinout.pdf" width="100%" height="600" 
 type="application/pdf">

 You can find the above PDF on the Arduino section of the website. Or at the official Arduino documentation page.


<a href="https://docs.arduino.cc/resources/pinouts/ABX00027-full-pinout.pdf">Link to PDF</a>

This Arduino has:
- 14 (22)* digital I/O pins
- 8 analog input pins

Note: The 8 analog pins can also be used as extra digitial I/O pins, to make a total of 22 digital pins.

Notice the color key below of the first page of the PDF:

![](https://i.imgur.com/q7sjr03.png)

---

## Real-Time Clock

<h4 id="RTC"></h4>
A real-time clock is a clock that keeps track of the current time and can be used to program specific actions at a certain time.

This feature can be used by using the **RTCZero** Arduino Library:

<a href="https://docs.arduino.cc/libraries/rtczero/">https://docs.arduino.cc/libraries/rtczero/</a>


## Quick Introduction to Tinkercad and your first circuit 

**Student instructions**

Class link:

Go to your class with this link: https://www.tinkercad.com/joinclass/GUEBYGHMG Enter your Nickname assigned by your teacher.

https://www.tinkercad.com/joinclass/GUEBYGHMG


# Terminology

- <a href="#IC">Integrated Circuit</a>
- <a href="#Accelerometer">Accelerometer Circuit</a>
- <a href="#Gyrometer">Gyrometer</a>
- <a href="#RTC">Real-Time Clock</a>
- <a href="https://docs.arduino.cc/libraries/">Arduino Library</a>

