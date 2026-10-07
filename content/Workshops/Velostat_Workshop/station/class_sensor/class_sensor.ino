/*
  Class Sensor (ART 150, DIY Pressure Sensor Workshop)

  Every student uploads this same sketch to their own Arduino Nano 33 IoT.
  It reads one Velostat sensor wired as the top half of a voltage divider:

      3.3V -> Velostat sensor -> A0 -> 10k resistor -> GND

  and sends the reading over Wi-Fi to the teacher's laptop, where it shows
  up as your own tile on the Class Sensor Grid. Pressing the sensor raises
  the number (0-1023).

  The only lines to change are the Wi-Fi name and password just below.

  You can watch your readings in the Serial Monitor or Serial Plotter
  (115200 baud) too, even if the Wi-Fi doesn't connect. Lines starting
  with "#" tell you what the Wi-Fi is doing, including your board's ID.

  The built-in LED blinks while joining the Wi-Fi and stays on once
  connected.

  How it works: every board has a unique hardware address (its MAC
  address), so the last six characters of it become this board's ID and
  nobody has to pick a number. Readings go out as lines like "B3F9A21,412"
  over UDP. The laptop's relay.py announces itself on the network once a
  second; the board sends straight to it once it hears that, and to the
  whole network until then.
*/

#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>

// ---- change these two lines to the classroom router's 2.4 GHz network ----
const char WIFI_NAME[] = "ROUTER_NAME";
const char WIFI_PASSWORD[] = "ROUTER_PASSWORD";

const int SENSOR_PIN = A0;
const unsigned int UDP_PORT = 9000;     // relay.py listens here
const unsigned int BEACON_PORT = 9001;  // relay.py announces itself here
const unsigned long SEND_EVERY = 66;    // ms: about 15 readings a second

// light smoothing so readings don't jitter (0 = none, closer to 1 = smoother)
const float SMOOTHING = 0.6;
float smoothed;

char boardId[7];  // e.g. "3F9A21"
WiFiUDP udp;
IPAddress broadcastIP;
IPAddress relayIP;             // learned from the relay's announcements
unsigned long lastBeacon = 0;  // when we last heard one
bool relayKnown = false;
unsigned long lastWifiTry = 0;
bool wifiReady = false;

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  analogReadResolution(10);  // 0-1023, like an Uno
  smoothed = analogRead(SENSOR_PIN);

  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("# wifi: no Wi-Fi module found");
    strcpy(boardId, "000000");
    return;
  }
  // the MAC address comes back last byte first: mac[0] is the end of it
  byte mac[6];
  WiFi.macAddress(mac);
  snprintf(boardId, sizeof(boardId), "%02X%02X%02X", mac[2], mac[1], mac[0]);
  printId();

  // an out-of-date Wi-Fi chip makes joining slow or flaky; say so at startup
  String fw = WiFi.firmwareVersion();
  if (fw < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.print("# wifi: chip firmware ");
    Serial.print(fw);
    Serial.print(" is out of date (Arduino IDE > Tools > Firmware Updater)");
    Serial.println();
  }
  connectWifi();
}

void printId() {
  Serial.print("# board ID: ");
  Serial.println(boardId);
}

// Join the network. Even when WiFi.begin() reports a failure, the Wi-Fi chip
// keeps trying on its own, and on a weak signal that can take 20+ seconds.
// Calling begin() again restarts that attempt from scratch, so we leave it
// 30 seconds between tries (and keep printing readings meanwhile).
void connectWifi() {
  lastWifiTry = millis();
  if (WiFi.status() == WL_NO_MODULE) return;
  Serial.print("# wifi: joining \"");
  Serial.print(WIFI_NAME);
  Serial.println("\"...");
  digitalWrite(LED_BUILTIN, HIGH);
  int status = WiFi.begin(WIFI_NAME, WIFI_PASSWORD);
  digitalWrite(LED_BUILTIN, LOW);
  if (status == WL_CONNECTED) startSending();
  else {
    Serial.print("# wifi: could not join \"");
    Serial.print(WIFI_NAME);
    Serial.println("\" yet. Check the name and password; trying again in 30 s");
  }
}

// Once on the network (whether our WiFi.begin() did it or the Wi-Fi chip
// reconnected by itself), work out where to send and open the socket.
void startSending() {
  // send to the whole network (e.g. 192.168.1.255) until the relay is found
  IPAddress ip = WiFi.localIP();
  IPAddress mask = WiFi.subnetMask();
  for (int i = 0; i < 4; i++) {
    broadcastIP[i] = ip[i] | (~mask[i] & 0xFF);
  }
  WiFi.noLowPowerMode();  // keep the radio awake: steadier, faster sends
  udp.begin(BEACON_PORT);  // listen for the relay; we send to UDP_PORT
  wifiReady = true;
  Serial.print("# wifi: joined, address ");
  Serial.println(ip);
  printId();
}

// The relay sends "RELAY" to BEACON_PORT once a second.
void listenForRelay() {
  while (udp.parsePacket() > 0) {
    char buf[8] = { 0 };
    udp.read(buf, sizeof(buf) - 1);
    if (strncmp(buf, "RELAY", 5) == 0) {
      if (!relayKnown || udp.remoteIP() != relayIP) {
        Serial.print("# wifi: found the class grid at ");
        Serial.println(udp.remoteIP());
      }
      relayIP = udp.remoteIP();
      relayKnown = true;
      lastBeacon = millis();
    }
  }
}

void send(const char *msg, int len) {
  // straight to the laptop if we've heard it lately, otherwise everyone
  bool direct = relayKnown && millis() - lastBeacon < 5000;
  udp.beginPacket(direct ? relayIP : broadcastIP, UDP_PORT);
  udp.write((const uint8_t *)msg, len);
  udp.endPacket();
}

void loop() {
  unsigned long started = millis();

  // keep the Wi-Fi up, and show its state on the built-in LED
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, HIGH);
    if (!wifiReady) startSending();
    // every 5 s, report the signal strength (closer to 0 is stronger;
    // below about -75 dBm, readings start getting lost) as "R3F9A21,-62"
    static unsigned long lastSignal = 0;
    if (wifiReady && millis() - lastSignal > 5000) {
      lastSignal = millis();
      char msg[20];
      int n = snprintf(msg, sizeof(msg), "R%s,%ld", boardId, WiFi.RSSI());
      send(msg, n);
    }
  } else if (WiFi.status() != WL_NO_MODULE) {
    if (wifiReady) {
      udp.stop();  // reopened by startSending() after reconnecting
      wifiReady = false;
      relayKnown = false;
      Serial.println("# wifi: lost the connection, reconnecting");
    }
    digitalWrite(LED_BUILTIN, (millis() / 250) % 2);  // blink
    if (millis() - lastWifiTry > 30000) connectWifi();
  }

  // read the sensor
  int raw = analogRead(SENSOR_PIN);
  smoothed = SMOOTHING * smoothed + (1.0 - SMOOTHING) * raw;
  int value = (int)smoothed;

  Serial.println(value);  // just the number, so the Serial Plotter can graph it
  if (wifiReady) {
    listenForRelay();
    char line[20];
    int len = snprintf(line, sizeof(line), "B%s,%d", boardId, value);
    send(line, len);
  }

  // wait out whatever is left of this reading's time slot
  unsigned long spent = millis() - started;
  if (spent < SEND_EVERY) delay(SEND_EVERY - spent);
}
