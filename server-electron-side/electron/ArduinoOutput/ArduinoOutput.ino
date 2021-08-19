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
  if ((read_ultrasonic(US_Trigger,US_Echo)) < 50) {

    tone(Buzzer_Pin,(1047));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1175));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1319));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1568));
    delay(50);
    noTone(Buzzer_Pin);
    digitalWrite(LED_Pin,(HIGH));
    delay(3000);} else {

    tone(Buzzer_Pin,(1568));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1397));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1319));
    delay(50);
    noTone(Buzzer_Pin);
    tone(Buzzer_Pin,(1047));
    delay(50);
    noTone(Buzzer_Pin);
    digitalWrite(LED_Pin,(LOW));
    delay(3000);}

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