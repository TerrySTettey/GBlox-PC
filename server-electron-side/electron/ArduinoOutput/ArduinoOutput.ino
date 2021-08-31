#include <IRremote.h>
int IR_Remote=3;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;

void setup(){

	IrReceiver.begin(IR_Remote, ENABLE_LED_FEEDBACK);
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(10);

}

void loop(){
 	if(IrReceiver.decode()){
		if(IrReceiver.decodedIRData.command==0x46){
  LeftServo.write(101);
  RightServo.write(78);
		}
	if(IrReceiver.decodedIRData.command==0x15){
  LeftServo.write(77);
  RightServo.write(100);
		}
	if(IrReceiver.decodedIRData.command==0x43){
  LeftServo.write(101);
  RightServo.write(100);
		}
	if(IrReceiver.decodedIRData.command==0x44){
  LeftServo.write(77);
  RightServo.write(78);
		}
	if(IrReceiver.decodedIRData.command==0x40){
  LeftServo.write(90);
  RightServo.write(90);
		}

IrReceiver.resume();
}
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
