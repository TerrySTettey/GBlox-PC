#include <Servo.h>
Servo LeftServo;
Servo RightServo;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
void setup(){
	LeftServo.attach(9);
	RightServo.attach(8);	LeftServo.attach(9);
	RightServo.attach(8);	LeftServo.attach(9);
	RightServo.attach(8);	LeftServo.attach(9);
	RightServo.attach(8);	LeftServo.attach(9);
	RightServo.attach(8);
}
void loop(){
  LeftServo.write(180);
  RightServo.write(0);
  delay(6000);
  LeftServo.write(90);
  RightServo.write(90);LeftServo.write(90);
  RightServo.write(90);
  delay(3000);
  LeftServo.write(90);
  RightServo.write(90);LeftServo.write(0);
  RightServo.write(0);
  delay(3000);
  LeftServo.write(90);
  RightServo.write(90);LeftServo.write(180);
  RightServo.write(180);
  delay(5000);LeftServo.write(90);
  RightServo.write(90);
  delay(5000);
}
