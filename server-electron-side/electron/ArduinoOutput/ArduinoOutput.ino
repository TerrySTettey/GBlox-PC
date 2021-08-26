int Right_Line_Follower_Receiver = A3;
int Left_Line_Follower_Receiver = A2;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;

void setup(){
	pinMode(Right_Line_Follower_Receiver, INPUT);
	pinMode(Left_Line_Follower_Receiver, INPUT);
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(11);

}

void loop(){
   ForkliftServo.write(0);

}
