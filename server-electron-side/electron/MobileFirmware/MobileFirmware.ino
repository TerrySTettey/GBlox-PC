#include <Arduino.h>
#include <SoftwareSerial.h>
#include <String.h>
#include <math.h>
#include <Servo.h>

#define INPUT_SIZE 30
#define GB_SIZE 50

Servo LServo;
Servo RServo;

//AltSoftSerial mySerial;
SoftwareSerial mySerial(13, 12);

int US_Trigger = 11;
int US_Echo = 10;


char* Buffer = (char*)malloc(GB_SIZE);
int Buffer_Pos = 0;
byte* readChar = (byte*)malloc(2);

void setup() {

  //Setup LED Pins
  pinMode(6, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);

  //Setup Ultrasonic
  pinMode(11, OUTPUT);
	pinMode(10, INPUT);

  //Setup Light Follwer and Line Follower
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A3, INPUT);

  //Setup Servos
  LServo.attach(9);
  RServo.attach(8);
  LServo.write(90);
  RServo.write(90);

  Serial.begin(19200);
  mySerial.begin(57600);//57600 57000

}

void loop() {

  if(mySerial.available() > 0){
    delay(8);//5
    int size = mySerial.readBytes(readChar, 1);
    readChar[size] = 0;

    if(strcmp(readChar, ";") != 0){
      //If not ;
      mySerial.print((char)*readChar);
      Buffer[Buffer_Pos] = *readChar;
      Buffer_Pos = Buffer_Pos + 1;
      delay(10);     
    } else {
      mySerial.println("\nDone Reading");
      Buffer[Buffer_Pos] =  0;
      Serial.println((char*)Buffer);
      Serial.println(Buffer_Pos);
      Buffer_Pos = 0;
      //Start logic for string;

      char* command = strtok(Buffer, " ");
      Serial.print(command);

    
      if(strcmp(command,"l") == 0){
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
      } else if(strcmp(command,"p") == 0){
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
      } else if(strcmp(command,"dr") == 0){
          command = strtok(0, " ");
          //mySerial.println(command);
          Serial.println(command);
          char * Direction = command;
          command = strtok(0, " ");
          //mySerial.println(command);
          Serial.println(command);
          int duration = atoi(command);

        if (strcmp(Direction, "f")==0){
          if (duration >= 0){
            LServo.write(101);
            RServo.write(78);
            delay(duration);
            LServo.write(90);
            RServo.write(90);
          } else {
            LServo.write(101);
            RServo.write(78);
          }
        } else if (strcmp(Direction, "b")==0){
          if (duration >= 0){
            LServo.write(77);
            RServo.write(100);
            delay(duration);
            LServo.write(90);
            RServo.write(90);
          } else {
            LServo.write(77);
            RServo.write(100);
          }
        } else if (strcmp(Direction, "s")==0){
          if (duration >= 0){
            LServo.write(90);
            RServo.write(90);
            delay(duration);
          } else {
            LServo.write(90);
            RServo.write(90);
          }
        } else if (strcmp(Direction, "rl")==0){
          if (duration >= 0){
            LServo.write(77);
            RServo.write(78);
            delay(duration);
            LServo.write(90);
            RServo.write(90);
          } else {
            LServo.write(77);
            RServo.write(78);
          }
        } else if (strcmp(Direction, "rr")==0){
          if (duration >= 0){
            LServo.write(101);
            RServo.write(100);
            delay(duration);
            LServo.write(90);
            RServo.write(90);
          } else {
            LServo.write(101);
            RServo.write(100);
          }
        }
      } else if(strcmp(command,"dm") == 0){
          command = strtok(0, " ");
          //mySerial.println(command);
          Serial.println(command);
          char * motor = command;
          command = strtok(0, " ");
          //mySerial.println(command);
          Serial.println(command);
          char * direction = command;

        if (strcmp(motor, "l")==0){
          if (strcmp(direction, "f")==0){
            LServo.write(101);
          } else if (strcmp(direction, "b")==0){
            LServo.write(77);
          } else if (strcmp(direction, "s")==0){
            LServo.write(90);
          }
        } else if (strcmp(motor, "r")==0){
          if (strcmp(direction, "f")==0){
            RServo.write(78);
          } else if (strcmp(direction, "b")==0){
            RServo.write(100);
          } else if (strcmp(direction, "s")==0){
            RServo.write(90);
          }
        } 
      } else if(strcmp(command,"ru") == 0){
        mySerial.println(read_ultrasonic(11, 10));
      } else if(strcmp(command,"rllf") == 0){
        mySerial.println(analogRead(A0));
      } else if(strcmp(command,"rrlf") == 0){
        mySerial.println(analogRead(A1));
      } else if(strcmp(command,"rlln") == 0){
        mySerial.println(analogRead(A2));
      } else if(strcmp(command,"rrln") == 0){
        mySerial.println(analogRead(A3));
      } else if(strcmp(command,"dy") == 0){
        command = strtok(0, " ");
        Serial.println(command);
        delay(atoi(command));
      }
    }
  }
}

int read_ultrasonic(int trigger, int echo){
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
  int duration = pulseIn(echo, HIGH);
  int distance = duration * 0.034 / 2;
  return distance;
}