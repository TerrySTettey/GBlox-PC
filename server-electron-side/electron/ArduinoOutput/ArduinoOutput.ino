int sample_variable;
float testVariable;
 
void setup(){
 
}

void loop(){
   testVariable = 0;
  while ((testVariable) <= 5) {
    tone(8, 330);
    delay(100);
    noTone(8);testVariable = ((testVariable) + 1);
    
    delay(1000);
  }
  tone(8, 392);
  delay(1000);
  noTone(8);
} 
 