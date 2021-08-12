#include <Servo.h>

int read_ultrasonic(int trigger, int echo);

void setup(){
  pinMode(13,OUTPUT); //Pin 13 Setup
}
void loop(){
<<<<<<< Updated upstream

  ServoA.write(45);
=======
  digitalWrite(13,HIGH); //Digital Pin 13 is HIGH
>>>>>>> Stashed changes
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