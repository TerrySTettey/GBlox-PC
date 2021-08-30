#include <SoftwareSerial.h>
SoftwareSerial hc06(13,12);
char bdata = 'a';
int Right_Line_Follower_Receiver = A3;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;
int Left_Line_Follower_Receiver = A2;

void setup(){
	hc06.begin(9600);
	pinMode(6, OUTPUT);
	pinMode(4, OUTPUT);
	pinMode(5, OUTPUT);
	pinMode(Right_Line_Follower_Receiver, INPUT);
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(10);
	pinMode(Left_Line_Follower_Receiver, INPUT);

}

void loop(){
   while (hc06.available()>0){
  	bdata = hc06.read();
  }
  if ((bdata=='g')) {
    digitalWrite(4, HIGH);
    digitalWrite(6, LOW);
    digitalWrite(5, LOW);
    if (map(analogRead(Right_Line_Follower_Receiver),0,500,0,1)==1) {
      LeftServo.write(101);
      RightServo.write(90);
    } else if (map(analogRead(Left_Line_Follower_Receiver),0,500,0,1)==1) {
      RightServo.write(78);
      LeftServo.write(90);
    } else {
      LeftServo.write(77);
      RightServo.write(78);
    }
  } else if ((bdata=='r')) {
    digitalWrite(6, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    LeftServo.write(90);
    RightServo.write(90);
  } else if ((bdata=='b')) {
    digitalWrite(5, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(6, LOW);
    LeftServo.write(101);
    RightServo.write(100);
  }

}

void raise_fork(int speed){
	for(int i = 90; i > 0; i--){
	if(i < 0) {
	i = 0;
}
ForkliftServo.write(i);
delay(1000/(speed*90));
}
}

void lower_fork(int speed){
	for(int i = 0; i < 90; i++){
	if(i > 90) {
	i = 90;
}
ForkliftServo.write(i);
delay(1000/(speed*90));
}
}
