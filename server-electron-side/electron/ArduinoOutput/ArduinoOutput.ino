#include <SoftwareSerial.h>
SoftwareSerial hc06(13,12);
char read_bluetooth();
char current = "";
#include <Servo.h>
Servo LeftServo;
Servo RightServo;

void setup(){
  hc06.begin(9600);
  Serial.begin(9600);
  LeftServo.attach(9);
  RightServo.attach(8);}
void loop(){
  Serial.println("Before");
  if (current=="g") {
    LeftServo.write(99);
    RightServo.write(84);
  } else {
    //LeftServo.write(90);
    //RightServo.write(90);
  }
}
char read_bluetooth(){
  if (hc06.available() && hc06.read()== 'g'){
    Serial.write('g');
    current = 'g';
  }
}
