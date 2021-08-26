#include <IRremote.h>
int IR_Remote=3;
IRrecv IrReceiver (IR_Remote);
decode_results results;
#include <Servo.h>
Servo LeftServo;
Servo RightServo;
Servo ForkliftServo;

void setup(){
	IrReceiver.enableIRIn();
	LeftServo.attach(9);
	RightServo.attach(8);
	ForkliftServo.attach(11);

}

void loop(){
   	if(IrReceiver.decode(&results)){
  		if(results.value==FF629D){  LeftServo.write(101);
    RightServo.write(78);

  		}
  	}	if(IrReceiver.decode(&results)){
  		if(results.value==FFA857){  LeftServo.write(77);
    RightServo.write(100);

  		}
  	}	if(IrReceiver.decode(&results)){
  		if(results.value==FF22DD){  LeftServo.write(77);
    RightServo.write(78);

  		}
  	}	if(IrReceiver.decode(&results)){
  		if(results.value==FFC23D){  LeftServo.write(101);
    RightServo.write(100);

  		}
  	}	if(IrReceiver.decode(&results)){
  		if(results.value==FF02FD){  LeftServo.write(90);
    RightServo.write(90);

  		}
  	}
}
