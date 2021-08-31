  #include <Servo.h>
  Servo LeftServo;
  Servo RightServo;
  Servo ForkliftServo;
  int ForkliftDegrees;

void setup(){


  LeftServo.attach(9);
  RightServo.attach(8);
  ForkliftServo.attach(10);
  LeftServo.write(90);
  RightServo.write(90);
  ForkliftServo.write(90);
  ForkliftDegrees = 90;


}

void loop(){
   raise_fork(0.006);
  lower_fork(0.006);

}


  void raise_fork(float speed){
    for(float i = 90; i > 0; i=i-0.01){
      if(i < 0) {
        i = 0;
      }
    ForkliftServo.write(i);
    delay(1000/(speed*90));
    }
  }

  void lower_fork(float speed){
    for(float i = 0; i < 90; i=i-0.01){
      if(i > 90) {
        i = 90;
      }
    ForkliftServo.write(i);
    delay(1000/(speed*90));
    }
  }
