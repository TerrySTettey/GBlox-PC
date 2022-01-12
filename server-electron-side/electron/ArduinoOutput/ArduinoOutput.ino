

    
    

#include <Adafruit_NeoPixel.h>
    Adafruit_NeoPixel pixels(2, 10, NEO_GRB + NEO_KHZ800);

    
int sample_variable;
 
void setup(){
	Serial.begin(9600);


    
    


    
 
}

void loop(){
   	Serial.println((read_ultrasonic( 9)));
  if ((read_ultrasonic( 9)) == 25) {
    
                pixels = Adafruit_NeoPixel(2, 10, NEO_GRB + NEO_KHZ800);
                pixels.begin();
                pixels.setPixelColor(0,pixels.Color(255, 0 , 0));
                pixels.setPixelColor(1,pixels.Color(255, 0 , 0));
                pixels.show();
                
  } else {
    
                pixels = Adafruit_NeoPixel(2, 10, NEO_GRB + NEO_KHZ800);
                pixels.begin();
                pixels.setPixelColor(0,pixels.Color(0, 255 , 0));
                pixels.setPixelColor(1,pixels.Color(0, 255 , 0));
                pixels.show();
                
  }

} 
 

    int read_ultrasonic(int ultra){
        pinMode(ultra, OUTPUT);
        digitalWrite(ultra, LOW);
        delayMicroseconds(2);
        digitalWrite(ultra, HIGH);
        delayMicroseconds(10);
        digitalWrite(ultra, LOW);
        pinMode(ultra, INPUT);
        int duration = pulseIn(ultra, HIGH);
        int distance = duration * 0.034 / 2;
        return distance;
      }
    


    
