#include <elapsedMillis.h>

const String deviceName = "MEGA";

elapsedMillis timeElapsed;

String inputString = "";         // a String to hold incoming data
unsigned int interval = 1000;

void setup() {
  // initialize serial:
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
}

void loop() {
  if (timeElapsed > interval) {
    Serial.println("You are connected to an arduino");
    timeElapsed = 0;
  }
  
  if (Serial.available() > 0) {
     char inChar = (char) Serial.read();
     inputString += inChar;
     
     if (inChar == '\n') {
      Serial.print(deviceName + ": " + inputString);
      inputString = "";
     }
  }
}
