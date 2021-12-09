#include <Arduino.h>
#include <AltSoftSerial.h>
#include <SoftwareSerial.h>
#include <String.h>
#include <math.h>

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
    //mySerial.println("received");
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
        //mySerial.println(command);
        Serial.println(command);
        digitalWrite(6, atoi(command));
        command = strtok(0, " ");
        //mySerial.println(command);
        Serial.println(command);
        digitalWrite(4, atoi(command));
        command = strtok(0, " ");
        //mySerial.println(command);
        Serial.println(command);
        digitalWrite(5, atoi(command));
    }

    if(strcmp(command,"piano") == 0){
        command = strtok(0, " ");
        //mySerial.println(command);
        Serial.println(command);
        char * Note = command;
        command = strtok(0, " ");
        //mySerial.println(command);
        Serial.println(command);
        int octave = atoi(command);

        //Starting from C1's frequency of 32.70
        int interval = 0;
        if (strcmp(Note, "C")==0){
          interval = 0;
        } else if (strcmp(Note, "C#")==0){
          interval = 1;
        } else if (strcmp(Note, "D")==0){
          interval = 2;
        } else if (strcmp(Note, "D#")==0){
          interval = 3;
        } else if (strcmp(Note, "E")==0){
          interval = 4;
        } else if (strcmp(Note, "F")==0){
          interval = 5;
        } else if (strcmp(Note, "F#")==0){
          interval = 6;
        } else if (strcmp(Note, "G")==0){
          interval = 7;
        } else if (strcmp(Note, "G#")==0){
          interval = 8;
        } else if (strcmp(Note, "A")==0){
          interval = 9;
        } else if (strcmp(Note, "A#")==0){
          interval = 10;
        } else if (strcmp(Note, "B")==0){
          interval = 11;
        }

        double frequency = 32.70 * pow(2,(interval+12*(octave-1))/12.000);
        Serial.println((interval+12*(octave-1)));
        Serial.println(frequency);
        tone(7, frequency, 1000);
    }
  }
}