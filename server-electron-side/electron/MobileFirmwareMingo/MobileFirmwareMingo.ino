#include <Arduino.h>
#include <SoftwareSerial.h>
#include <String.h>
#include <math.h>
#include <Adafruit_NeoPixel.h>
#include <Servo.h>

#define INPUT_SIZE 30
#define GB_SIZE 50

SoftwareSerial mySerial(12, 11);

int Ultrasonic = 0;
int LED = 13;
int Grabber = 0;
int LfSensor = 0;
int RfSensor = 0;
int LsSensor = 0;
int RsSensor = 0;


Adafruit_NeoPixel pixels(2, LED, NEO_GRB + NEO_KHZ800);
Servo GrabberS;

char* Buffer = (char*)malloc(GB_SIZE);
int Buffer_Pos = 0;
byte* readChar = (byte*)malloc(2);

void setup() {

  //Buzzer
  pinMode(8, OUTPUT);

  //Wheels
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  
  Serial.begin(19200);
  mySerial.begin(57600);//57600 57000

}



void loop() {
  if(mySerial.available() > 0){
    Serial.println("ABC");
    delay(20);//5
    int size = mySerial.readBytes(readChar, 1);
    readChar[size] = 0;

    if(strcmp(readChar, ";") != 0){
      //If not;
      mySerial.print((char)*readChar);
      Buffer[Buffer_Pos] = *readChar;
      Buffer_Pos = Buffer_Pos + 1; 
    } else {
      //delay(250);
      mySerial.println("\nDone Reading");
      Buffer[Buffer_Pos] =  0;
      Serial.println((char*)Buffer);
      Serial.println(Buffer_Pos);
      Buffer_Pos = 0;
      //Start logic for string;
      char* command = strtok(Buffer, " ");
      Serial.print(command);

      if(strcmp(command,"l") == 0){
        //LED
        command = strtok(0, " ");
        int choice = atoi(command);
        command = strtok(0, " ");
        int r = atoi(command);
        command = strtok(0, " ");
        int g = atoi(command);
        command = strtok(0, " ");
        int b = atoi(command);

        switch(choice){
          case 1:
            pixels.setPixelColor(0,pixels.Color(r,g, b));
            break;
          case 2:
            pixels.setPixelColor(1,pixels.Color(r,g, b));
            break;
          case 0:
            pixels.setPixelColor(0,pixels.Color(r,g, b));
            pixels.setPixelColor(1,pixels.Color(r,g, b));
            break;
        }
        
        pixels.show();

      } else if(strcmp(command,"p") == 0){
        //PIANO
        command = strtok(0, " ");
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
        tone(8, frequency);
      } else if(strcmp(command,"pn")==0){
        noTone(8);
      } else if(strcmp(command,"dy") == 0){
        //DELAY
        command = strtok(0, " ");
        Serial.println(command);
        delay(atoi(command));
      } else if(strcmp(command,"port") ==0){
        //PORT ASSIGNMENT
        command = strtok(0, " ");
        Serial.println(command);
        char * peripheral = command;
        command = strtok(0, " ");
        Serial.println(command);
        int port = atoi(command);

        switch(port){
          case 1:
            if(strcmp(peripheral,"u")==0){
              Ultrasonic = 9;
              LED = 10;
              pixels = Adafruit_NeoPixel(2, LED, NEO_GRB + NEO_KHZ800);
              pixels.begin();
            } else if(strcmp(peripheral,"g")==0){
              Grabber = 9;
              GrabberS.attach(Grabber);
              GrabberS.write(0);
            }
            break;
          case 2:
          if(strcmp(peripheral,"u")==0){
              Ultrasonic = 2;
              LED = 13;
              pixels = Adafruit_NeoPixel(2, LED, NEO_GRB + NEO_KHZ800);
              pixels.begin();
            } else if(strcmp(peripheral,"g")==0){
              Grabber = 2;
              GrabberS.attach(Grabber);
              GrabberS.write(0);
            }
            break;
          case 3:
            if(strcmp(peripheral,"f")==0){
              LfSensor = A0;
              RfSensor = A1;
            } else if(strcmp(peripheral,"s")==0){
              LsSensor = A0;
              RsSensor = A1;
            }
            break;
          case 4:
            if(strcmp(peripheral,"f")==0){
              LfSensor = A3;
              RfSensor = A4;
            } else if(strcmp(peripheral,"s")==0){
              LsSensor = A3;
              RsSensor = A4;
            }
            break;
        }

      } else if(strcmp(command,"ru")==0){
        //char text[25];
        //snprintf(text, "Ultrasonic Value: %d", read_ultrasonic(Ultrasonic));
        //mySerial.println(text);
        mySerial.println(read_ultrasonic(Ultrasonic));
      } else if(strcmp(command,"gr") == 0){
        //GRABBER
        command = strtok(0, "");
        int action = atoi(command);
        if(action == 0){
          close_grabber(50);
        } else if(action == 1){
          open_grabber(50);
        }
      } else if(strcmp(command,"rlf")==0){
        //READ LIGHT FOLLOWER
        command = strtok(0, "");
        int sensor = atoi(command);
        if(sensor == 1){
          mySerial.println(analogRead(LfSensor));
        } else if(sensor == 2){
          mySerial.println(analogRead(RfSensor));
        }
      } else if(strcmp(command,"rls")==0){
        //READ LINE SENSOR
        command = strtok(0, "");
        int sensor = atoi(command);
        if(sensor == 1){
          mySerial.println(analogRead(LsSensor));
        } else if(sensor == 2){
          mySerial.println(analogRead(RsSensor));
        }
      } else if(strcmp(command,"dr") == 0){
        //DRIVE
        command = strtok(0, "");
        char* action = command;
        
        if(strcmp(action, "f")==0){
          digitalWrite(4,HIGH);
          digitalWrite(7,HIGH);
                  analogWrite(5,(int)((50*225)/100));
        analogWrite(6,(int)((50*225)/100));
        } else if(strcmp(action, "b")==0){
          digitalWrite(4,LOW);
          digitalWrite(7,LOW);
                  analogWrite(5,(int)((50*225)/100));
        analogWrite(6,(int)((50*225)/100));
        } else if(strcmp(action, "l")==0){
          digitalWrite(4,LOW);
          digitalWrite(7,HIGH);
                  analogWrite(5,(int)((50*225)/100));
        analogWrite(6,(int)((50*225)/100));
        } else if(strcmp(action, "r")==0){
          digitalWrite(4,HIGH);
          digitalWrite(7,LOW);
                  analogWrite(5,(int)((50*225)/100));
        analogWrite(6,(int)((50*225)/100));
        }
        else if(strcmp(action, "s")==0){
          digitalWrite(4,LOW);
          digitalWrite(7,LOW);
                  analogWrite(5,0);
        analogWrite(6,0);
        }

      } else if(strcmp(command,"drp") == 0){
        //DRIVE
        command = strtok(0, "");
        char* angle = command;
        float ang = atof(angle);
        command = strtok(0, "");
        char* radius = command;
        float rad = atof(radius);

        float xCord = rad * cos(ang);
        float yCord = rad * sin(ang);

        int LSp;
        int RSp;

        if ( xCord > 0){
          LSp = map(yCord,-1, 1, -225, 225);
          RSp = map (xCord, -1, 1, -225, 225);
        } else if ( xCord < 0){

        } else if (xCord == 0){

        }
        

        if (LSp >= 0){
          digitalWrite(4, HIGH);
        } else {
          digitalWrite(4, LOW);
        }

        if (RSp >= 0){
          digitalWrite(7, HIGH);
        } else {
          digitalWrite(7, LOW);
        }

        mySerial.println(LSp);
        Serial.println(LSp);
        mySerial.println(RSp);
        Serial.println(RSp);
        analogWrite(5,(int)(abs(LSp)));
        analogWrite(6,(int)(abs(RSp)));
      }
    }
  }
}

int read_ultrasonic(int ultra){
  pinMode(ultra, OUTPUT);
  digitalWrite(ultra, LOW);
  delayMicroseconds(2);
  digitalWrite(ultra, HIGH);
  delayMicroseconds(10);
  digitalWrite(ultra, LOW);
  pinMode(ultra, INPUT);
  int duration = pulseIn(ultra, HIGH);
  int distance = duration * 0.034 / 2;
  return distance;
}

void open_grabber(float speed) {
  for(int i = 90; i > 0; i--){
    if(i < 0) {
      i = 0;
    }
    GrabberS.write(i);
    delay(90/(speed*1000));
  }
}

void close_grabber(float speed){
  for(int i =0; i < 90; i++){
    if(i > 90) {
      i = 90;
    }
    GrabberS.write(i);
    delay(90/(speed*1000));
  }
}