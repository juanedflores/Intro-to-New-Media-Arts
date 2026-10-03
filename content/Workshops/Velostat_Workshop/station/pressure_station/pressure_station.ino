/*
  Pressure Station (ART 150, DIY Pressure Sensor Workshop)

  One of four class stations. Up to five Velostat sensors plug into this
  board, each as the top half of a voltage divider:

      3.3V -> Velostat sensor -> A0..A4 -> 10k resistor -> GND

  Pressing a sensor raises the voltage on its pin. About 30 times a second
  the board sends all five readings as one line of text:

      S1,412,0,873,15,600

  (station number, then A0..A4, each 0-1023). It sends that line two ways
  at once:
    - over Wi-Fi to relay.py on the teacher's laptop, which feeds the
      Sensor Grid page. The relay announces itself on the network once a
      second; the station sends straight to it once it hears that (direct
      messages arrive more smoothly than broadcasts), and broadcasts to the
      whole network until then;
    - over USB, so the same board also works plugged straight into the
      laptop (Sensor Grid -> "Connect station (USB)") if the Wi-Fi fails.

  BOARD: Arduino Nano 33 IoT (needs the WiFiNINA library). Its pins take
  3.3V at most, so power the sensors from the 3.3V pin, never from 5V or a
  breadboard power module. Power the board from a USB power bank or phone
  charger.

  BEFORE UPLOADING:
    1. Set STATION below to this board's number (1-4) and label the board.
    2. Put the Wi-Fi name and password in arduino_secrets.h (the router's
       2.4 GHz network; the Nano can't use 5 GHz).

  The built-in LED blinks while joining the Wi-Fi and stays on once
  connected.
*/

#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>
#include "arduino_secrets.h"

const int STATION = 1;  // <-- change to 1, 2, 3 or 4 for each board

const int NUM_SENSORS = 5;
const int PINS[NUM_SENSORS] = { A0, A1, A2, A3, A4 };
const unsigned int UDP_PORT = 9000;     // relay.py listens here
const unsigned int BEACON_PORT = 9001;  // relay.py announces itself here

// light smoothing so readings don't jitter (0 = none, closer to 1 = smoother)
const float SMOOTHING = 0.6;
float smoothed[NUM_SENSORS];

WiFiUDP udp;
IPAddress broadcastIP;
IPAddress relayIP;               // learned from the relay's announcements
unsigned long lastBeacon = 0;    // when we last heard one
bool relayKnown = false;
unsigned long lastWifiTry = 0;
bool wifiReady = false;

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  analogReadResolution(10);  // 0-1023, like an Uno
  for (int i = 0; i < NUM_SENSORS; i++) {
    smoothed[i] = analogRead(PINS[i]);
  }
  // an out-of-date Wi-Fi chip makes joining slow or flaky; say so at startup
  String fw = WiFi.firmwareVersion();
  Serial.print("# wifi: chip firmware ");
  Serial.print(fw);
  if (fw < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.print(" (update available: ");
    Serial.print(WIFI_FIRMWARE_LATEST_VERSION);
    Serial.print(", Arduino IDE > Tools > Firmware Updater)");
  }
  Serial.println();
  connectWifi();
}

// Join the network. Even when WiFi.begin() reports a failure, the Wi-Fi chip
// keeps trying on its own, and on a weak signal that can take 20+ seconds.
// Calling begin() again restarts that attempt from scratch, so we leave it
// 30 seconds between tries (and keep sending over USB meanwhile).
void connectWifi() {
  lastWifiTry = millis();
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("# wifi: no Wi-Fi module found");
    return;
  }
  digitalWrite(LED_BUILTIN, HIGH);
  int status = WiFi.begin(SECRET_SSID, SECRET_PASS);
  digitalWrite(LED_BUILTIN, LOW);
  if (status == WL_CONNECTED) startSending();
  else {
    // status lines start with "#" so the Sensor Grid ignores them
    Serial.print("# wifi: could not join \"");
    Serial.print(SECRET_SSID);
    Serial.print("\" (status ");
    Serial.print(status);
    Serial.print("), trying again in 30 s; Wi-Fi chip firmware ");
    Serial.println(WiFi.firmwareVersion());
  }
}

// Once on the network (whether our WiFi.begin() did it or the Wi-Fi chip
// reconnected by itself), work out where to send and open the socket.
void startSending() {
  // send to the whole network (e.g. 192.168.1.255), so the laptop's
  // address never has to be typed in here
  IPAddress ip = WiFi.localIP();
  IPAddress mask = WiFi.subnetMask();
  for (int i = 0; i < 4; i++) {
    broadcastIP[i] = ip[i] | (~mask[i] & 0xFF);
  }
  WiFi.noLowPowerMode();  // keep the radio awake: steadier, faster sends
  udp.begin(BEACON_PORT);  // listen for the relay; we send to UDP_PORT
  wifiReady = true;
  Serial.print("# wifi: joined, address ");
  Serial.print(ip);
  Serial.print(", sending to ");
  Serial.println(broadcastIP);
}

// The relay sends "RELAY" to BEACON_PORT once a second.
void listenForRelay() {
  while (udp.parsePacket() > 0) {
    char buf[8] = { 0 };
    udp.read(buf, sizeof(buf) - 1);
    if (strncmp(buf, "RELAY", 5) == 0) {
      if (!relayKnown || udp.remoteIP() != relayIP) {
        Serial.print("# wifi: found the relay at ");
        Serial.println(udp.remoteIP());
      }
      relayIP = udp.remoteIP();
      relayKnown = true;
      lastBeacon = millis();
    }
  }
}

void loop() {
  unsigned long started = millis();

  // keep the Wi-Fi up, and show its state on the built-in LED
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, HIGH);
    if (!wifiReady) startSending();
    // every 5 s, report the signal strength (closer to 0 is stronger;
    // below about -75 dBm, readings start getting lost), over USB and to
    // the relay as "R1,-62", which warns the teacher about weak stations
    static unsigned long lastSignal = 0;
    if (wifiReady && millis() - lastSignal > 5000) {
      lastSignal = millis();
      long rssi = WiFi.RSSI();
      Serial.print("# wifi: signal ");
      Serial.print(rssi);
      Serial.println(" dBm");
      char msg[16];
      int n = snprintf(msg, sizeof(msg), "R%d,%ld", STATION, rssi);
      bool direct = relayKnown && millis() - lastBeacon < 5000;
      udp.beginPacket(direct ? relayIP : broadcastIP, UDP_PORT);
      udp.write((const uint8_t *)msg, n);
      udp.endPacket();
    }
  } else {
    if (wifiReady) {
      udp.stop();  // reopened by startSending() after reconnecting
      wifiReady = false;
      relayKnown = false;
    }
    digitalWrite(LED_BUILTIN, (millis() / 250) % 2);  // blink
    if (millis() - lastWifiTry > 30000) connectWifi();
  }

  // read the five sensors into one line: S1,412,0,873,15,600
  char line[48];
  int len = snprintf(line, sizeof(line), "S%d", STATION);
  for (int i = 0; i < NUM_SENSORS; i++) {
    int raw = analogRead(PINS[i]);
    smoothed[i] = SMOOTHING * smoothed[i] + (1.0 - SMOOTHING) * raw;
    len += snprintf(line + len, sizeof(line) - len, ",%d", (int)smoothed[i]);
  }

  Serial.println(line);
  if (wifiReady) {
    listenForRelay();
    // straight to the laptop if we've heard it lately, otherwise everyone
    bool direct = relayKnown && millis() - lastBeacon < 5000;
    udp.beginPacket(direct ? relayIP : broadcastIP, UDP_PORT);
    udp.write((const uint8_t *)line, len);
    udp.endPacket();
  }

  // about 30 lines a second: wait out whatever is left of this 33 ms
  unsigned long spent = millis() - started;
  if (spent < 33) delay(33 - spent);
}
