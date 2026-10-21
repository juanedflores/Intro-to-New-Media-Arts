// Reads the Nano 33 IoT's built-in accelerometer and prints
// x,y,z (in g's) to the Serial port, one line at a time.
// Install the library first: Tools > Manage Libraries > "Arduino_LSM6DS3"

#include <Arduino_LSM6DS3.h>

void setup() {
  Serial.begin(115200);
  if (!IMU.begin()) {
    Serial.println("Failed to start the IMU!");
    while (true);
  }
}

void loop() {
  float x, y, z;

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);

    Serial.print(x);
    Serial.print(",");
    Serial.print(y);
    Serial.print(",");
    Serial.println(z);
  }

  delay(20);
}
