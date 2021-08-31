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
    for(int i = 90; i > 0; i--){
      if(i < 0) {
        i = 0;
      }
    ForkliftServo.write(i);
    delay(90/(speed*1000));
    }
  }

  void lower_fork(float speed){
    for(int i = 0; i < 90; i++){
      if(i > 90) {
        i = 90;
      }
    ForkliftServo.write(i);
    delay(90/(speed*1000));
    }
  }
