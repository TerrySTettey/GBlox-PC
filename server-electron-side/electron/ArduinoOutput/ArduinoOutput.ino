#include <SoftwareSerial.h>
SoftwareSerial hc06(13,12);
char read_bluetooth();

void setup(){
  hc06.begin(9600);
  pinMode(6, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);

}

void loop(){
   if ((read_bluetooth()=="r")) {
    digitalWrite(6, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
  } else if ((read_bluetooth()=="g")) {
    digitalWrite(6, LOW);
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
  } else if ((read_bluetooth()=="b")) {
    digitalWrite(6, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, HIGH);
  }

}
 char read_bluetooth(){
  if (hc06.available()<0){
    return (hc06.read());
  }
}
