#include <Arduino.h>
#include <AltSoftSerial.h>
#include <SoftwareSerial.h>
#include <String.h>

#define INPUT_SIZE 30

//AltSoftSerial mySerial;
SoftwareSerial mySerial(13, 12);

void setup() {
  pinMode(6, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  Serial.begin(19200);
  mySerial.begin(115200);

}

void loop() {
  
  if(mySerial.available() > 0){
    mySerial.println("received");
    Serial.println("received");
    char input[INPUT_SIZE + 1];
    byte size = mySerial.readBytes(input, INPUT_SIZE);

    input[size] = 0;
    // strtok(string*, "characters") = splits string by characters
    // strto(0, "characters") = goes to the next 
    char* command = strtok(input, " ");
    mySerial.println(command);
    if(strcmp(command,"led") == 0){
        command = strtok(0, " ");
        mySerial.println(command);
        Serial.println(command);
        digitalWrite(6, atoi(command));
        command = strtok(0, " ");
        mySerial.println(command);
        Serial.println(command);
        digitalWrite(4, atoi(command));
        command = strtok(0, " ");
        mySerial.println(command);
        Serial.println(command);
        digitalWrite(5, atoi(command));
    }
  }
}