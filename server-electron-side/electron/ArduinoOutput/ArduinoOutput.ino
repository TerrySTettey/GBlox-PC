int Right_Line_Follower_Receiver = A3;
int Left_Line_Follower_Receiver = A2;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;
int forkangle = 90;;

void setup(){
	pinMode(Right_Line_Follower_Receiver, INPUT);
	pinMode(Left_Line_Follower_Receiver, INPUT);
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(10);

}

void loop(){
   raise_fork(1);
   delay(2000);
   lower_fork(1);
   delay(2000);

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
