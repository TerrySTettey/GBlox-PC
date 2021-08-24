#include <Servo.h>

int read_ultrasonic(int trigger, int echo);

void setup(){
  pinMode(4,OUTPUT); //Pin 4 Setup
}
void loop(){
  digitalWrite(4,HIGH); //Digital Pin 4 is HIGH
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