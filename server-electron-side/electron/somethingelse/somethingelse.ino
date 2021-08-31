int Right_Line_Follower_Receiver = A3;
int Left_Line_Follower_Receiver = A2;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;
int ForkliftDegrees;

void setup(){
	pinMode(Right_Line_Follower_Receiver, INPUT);
	pinMode(Left_Line_Follower_Receiver, INPUT);
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(10);
  LeftServo.write(90);
  RightServo.write(90);
  ForkliftServo.write(90);
  ForkliftDegrees = 90;

}

void loop(){
  //0.006 -> 0.01 -> 0.032
   raise_fork(0.032);
   delay(2000);
   lower_fork(0.032);
   delay(2000);

}

void raise_fork(float speed){
  for(int i = 90; i > 0; i--){
    if(i < 0) {
      i = 0;
    }
    ForkliftServo.write(i);
    //delay((1/2)*(1000/(speed*90)));
    delay(90/(speed*1000));
  }
}

/*

void set_fork(float speed, int angle){
  int nangle = map(angle, 0, 90, 90, 0); 
  for(int i = ; i > 0; i--){
    if(i < 0) {
      i = 0;
    }
    ForkliftServo.write(i);
    delay(90/(speed*1000));
  }
}

*/

void lower_fork(float speed){
  for(int i = 0; i < 90; i++){
    if(i > 90) {
      i = 90;
    }
    ForkliftServo.write(i);
    delay(90/(speed*1000));
  }
}
