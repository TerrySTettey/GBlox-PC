#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;

int runOnce;

void setup(){
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(10);

runOnce = 0;
}

void loop(){
	if(runOnce == 0){
  LeftServo.write(90);
  RightServo.write(90);
  int count;
  count = 5;
  while ((count) > 0) {

    tone(7,1047);
    delay(1000);
    noTone(7);raise_fork(1);

    tone(7,1568);
    delay(1000);
    noTone(7);
    delay(500);lower_fork(1);

    tone(7,2093);
    delay(1000);
    noTone(7);
    delay(1000);
    tone(7,1568);
    delay(1000);
    noTone(7);count = ((count) - 1);
  }

runOnce = 1;}
}

void raise_fork(float speed){
	for(int i = 90; i > 0; i--){
	if(i < 0) {
	i = 0;
}
ForkliftServo.write(i);
delay(1000/(speed*90));
}
}

void lower_fork(float speed){
	for(int i = 0; i < 90; i++){
	if(i > 90) {
	i = 90;
}
ForkliftServo.write(i);
delay(1000/(speed*90));
}
}
