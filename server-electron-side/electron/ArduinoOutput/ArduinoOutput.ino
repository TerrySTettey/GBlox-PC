 
int runOnce;
 
void setup(){
	pinMode(6, OUTPUT);
	pinMode(4, OUTPUT);
	pinMode(5, OUTPUT);
 
runOnce = 0;
}

void loop(){
	if(runOnce == 0){
  for (int i = 0;i<2;i++) {
    digitalWrite(6, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    
    delay(1000);
    digitalWrite(6, HIGH);
    	digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
    
    delay(1000);
    digitalWrite(4, HIGH);
    digitalWrite(6, LOW);
    digitalWrite(5, LOW);
    
    delay(1000);
  };
  digitalWrite(4, LOW);
  digitalWrite(6, LOW);
  digitalWrite(5, LOW);

runOnce = 1;}
}
