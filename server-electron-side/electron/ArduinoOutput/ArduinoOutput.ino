#include <Servo.h>;

int US_Trigger = 12;
int US_Echo = 11;
int Servo_Pin = 10;
int LED_Pin = 13;
int Buzzer_Pin = 9;

Servo ServoA;
int read_ultrasonic(int trigger, int echo);

void setup(){
  ServoA.attach(Servo_Pin);
  pinMode(LED_Pin, OUTPUT);
  pinMode(US_Trigger, OUTPUT);
  pinMode(US_Echo, INPUT);
  pinMode(Buzzer_Pin, OUTPUT);
}

void loop(){

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