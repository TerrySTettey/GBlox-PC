int sample_variable;
 
int runOnce;
 
void setup(){
 
runOnce = 0;
}

void loop(){
	if(runOnce == 0){
  tone(8, 1047);
  delay(1000);
  noTone(8);tone(8, 1245);
  delay(1000);
  noTone(8);tone(8, 1568);
  delay(1000);
  noTone(8);
runOnce = 1;}
}
