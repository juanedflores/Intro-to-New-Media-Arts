---
title: Week 8
---

# Week 8

::: {.days}

::: {.day title="MONDAY" open="true"}

### AGENDA

- Reviewing readanalogserial, digital output
- Button sketch (if statements)
- The Interface
- Digital Button Workshop

Patatype with me!

```arduino
#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>  // Required for UDP communication
#include <OSCMessage.h>

// Include the secrets file with your network credentials
#include "arduino_secrets.h"

char ssid[] = "ssid";  // your network SSID (name)
char pass[] = "pass";   // your network password

unsigned int localPort = 2390;  // local port to listen on
char incomingPacket[255];       // buffer for incoming packets

// 172.20.10.14
IPAddress remoteIP(172, 20, 10, 14);  // The IP address of the destination device
unsigned int remotePort = 8888;       // The destination port

WiFiUDP Udp;

void setup() {
  Serial.begin(9600);
  while (!Serial)
    ;

  // attempt to connect to WiFi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    delay(10000);  // wait 10 seconds for connection
  }
  Serial.println("Connected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());  // Prints the fassigned IP address

  // Initialize Udp on the local port
  Udp.begin(localPort);
}

void loop() {
  if (digitalRead(2) == HIGH) {
    sendOSC();
  }
  delay(1);
}

void sendOSC() {
  OSCMessage msg("/juan/1");

  Udp.beginPacket(remoteIP, remotePort);
  msg.send(Udp);    // send the bytes to the SLIP stream
  Udp.endPacket();  // mark the end of the OSC Packet
  msg.empty();      // free space occupied by message
}

```

### Interfaces

To get you to start thinking about what kind of interface you want to create, here are some examples of switches and variable resistors that you can use as a starting point.

[Instructables: Switches](https://www.instructables.com/Switches/)

Here is a list of switches that exist, along with any tutorials on how to make one from scratch:

- Push Button Switch:

[Instructables](https://www.instructables.com/How-to-Make-a-Push-Button-Switch/)  
[Push Button](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Push+Button/356)  
[Stomp/Foot Switch](https://makeymakey.com/pages/stomp-switch-start-and-stop-timer)  
[DIYAbility](https://www.diyability.org/guide/make-a-simple-capability-switch/)

Hint: Springs!

- Toggle Switch:

[Instructables](https://www.instructables.com/how-to-make-a-homemade-ONOFF-switch/)  
[Lever Switch](https://learn.browndoggadgets.com/Guide/Paper+Circuits+Cubes+-+Lever+Switch/522)

<p style="text-decoration: underline">Guides by Pete Prodoehl</p>

[Slide Switch](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Slide+Switch/253)  
[Cardboard Knife Switch](https://learn.browndoggadgets.com/Guide/Switch+-+Cardboard+Knife+Switch/203)

- Tilt Switch:

[Instructables](https://www.instructables.com/Build-your-own-tilt-switch/)  
[Youtube Video](https://www.youtube.com/watch?v=jEqb6r3WV30)  
[Tilt Joystick](https://makeymakey.com/pages/diy-tilt-joystick)

Here is a list of variable resistors:

- Potentiometer:

[Instructables](https://www.instructables.com/Make-a-Pencils-Lead-Potentiometer-Experimentatio/)

- Photoresistor (LDR):

[Instructables](https://www.instructables.com/How-to-use-a-photoresistor-or-photocell-Arduino-Tu/)

- Force Sensitive Resistor (FSR):

[Instructables](https://www.instructables.com/Velostat-Homemade-Pressure-Sensor-Mat/)

- Flex Sensor:

[Instructables](https://www.instructables.com/Stickytape-Sensors/)

ART 150 student examples from the section taught by Sabrina Raaf:

[art150.nma](https://art150.nma-course.online/category/all-posts/creative-switch/)

Custom Interfaces:

- Crank Counter
[Crank](https://learn.browndoggadgets.com/Guide/Crank+Counter/238)

- Therapy Ball Controller
[Therapy Ball](https://makeymakey.com/blogs/how-to-instructions/balance-weight-shifting-ball-controller-as-assistive-technology-by-katie-butzu-and-mark-lyons)

- Hoola Hoop Controller
[Hula Hoop Controller](https://makeymakey.com/pages/hula-hoop-controller)

### Monday Topics:

::: {.topics}

::: {.card type="external" title="The Interface" thumb="https://liveinterfacesjournal.ulusofona.pt/wp-content/uploads/2026/01/MEM_fig1_ONCONTACT-1.jpg" href="https://liveinterfacesjournal.ulusofona.pt/the-interface-as-artwork/#elementor-toc__heading-anchor-2" tag="Topic"}
:::

::: {.card type="lesson" title="Intro to the Serial Monitor" thumb="./content/Arduino/print_to_serial_monitor/images/cover.png" href="./content/Arduino/print_to_serial_monitor/print_to_serial_monitor.html" tag="Topic"}
:::

::: {.card type="lesson" title="Button" thumb="./content/Arduino/button/images/button.png" href="./content/Arduino/button/button.html" tag="sketch"}
:::

::: {.card type="external" title="AnalogRead with Potentiometer" thumb="./content/Arduino/analogread/images/cover.png" href="https://itp.nyu.edu/physcomp/labs/labs-arduino-digital-and-analog/analog-in-with-an-arduino/" tag="Sketch"}
:::

::: {.card type="lesson" title="map() function" thumb="./content/Arduino/map/images/cover.png" href="./content/Arduino/map/map.html" tag="Function"}
:::

:::

Take a look at this TED Talk by Holly Cohen:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-We84cxubCY?si=fiqwsISlsHhsAIe6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- ### Thursday Agenda: -->
<!---->
<!-- - AnalogRead Review -->
<!-- - AnalogWrite and PulseWidth Modulation (PWM) -->
<!-- - Button Sketch (DigitalRead) -->
<!---->
<!-- --- -->

<!-- ### Thursday Topics: -->
<!---->
<!-- <div class="uk-margin" style="padding: 30px;"> -->
<!-- <ul class="uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-2@s uk-grid-small uk-grid-match" uk-grid="masonry: pack"> -->
<!---->
<!-- <li> -->
<!-- <div> -->
<!-- <a href="./content/Arduino/button/button.html"> -->
<!-- <div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: #7fcbcd"> -->
<!-- <div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge"> -->
<!-- <h3 class="cardtitle">Button</h3> -->
<!-- <div style="display: inline"> -->
<!-- <img src="./content/Arduino/button/images/button.png" alt="" style="padding-bottom: 10px" uk-image /> -->
<!-- <span class="uk-label" style="background-color: #1e87f0">sketch</span> -->
<!-- </div> -->
<!-- </div> -->
<!-- </a> -->
<!-- </div> -->
<!-- </div> -->
<!-- </li> -->
<!---->
<!-- <li> -->
<!-- <div> -->
<!-- <a href="./content/Arduino/analogwrite_pwm/analogwrite_pwm.html"> -->
<!-- <div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: #7fcbcd"> -->
<!-- <div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge"> -->
<!-- <h3 class="cardtitle">AnalogWrite: Intro to Pulse Width Modulation (PWM)</h3> -->
<!-- <div style="display: inline"> -->
<!-- <img src="./content/Arduino/analogwrite_pwm/images/cover.jpg" alt="" style="padding-bottom: 10px" uk-image /> -->
<!-- <span class="uk-label" style="background-color: #b48ead">Topic</span> -->
<!-- </div> -->
<!-- </div> -->
<!-- </a> -->
<!-- </div> -->
<!-- </div> -->
<!-- </li> -->
<!---->
<!-- </ul> -->
<!-- </div> -->
<!---->

:::

:::

### Supplementary Material

ITP NYU course explaining digital output with Arduino Uno. Serves as a good review of what we have learned so far.

<iframe title="vimeo-player" src="https://player.vimeo.com/video/374067285?h=c6390e412a" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>

One button games: <a href="https://c1ic.mx/menu.html">link</a>

### Next Week

::: {.nextweek}
<!-- placeholder - edit with next week's actual plan -->
We'll continue with analog output and PWM.
:::
