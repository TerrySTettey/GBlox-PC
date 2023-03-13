
#include <Adafruit_NeoPixel.h>
    Adafruit_NeoPixel pixels(2, 10, NEO_GRB + NEO_KHZ800);
    
int sample_variable;
 
void setup(){

//Clearing LEDs Initially
    pixels.begin();
    pixels.setPixelColor(0,pixels.Color(0,0,0));
    pixels.setPixelColor(1,pixels.Color(0,0,0));
    pixels.show();
    pixels = Adafruit_NeoPixel(2, 13, NEO_GRB + NEO_KHZ800);
    pixels.begin();
    pixels.setPixelColor(0,pixels.Color(0,0,0));
    pixels.setPixelColor(1,pixels.Color(0,0,0));
    pixels.show();
    
 
}

void loop(){
   
              pixels = Adafruit_NeoPixel(2, 13, NEO_GRB + NEO_KHZ800);
              pixels.begin();
              pixels.setPixelColor(0,pixels.Color(45,30, 35));
              pixels.setPixelColor(1,pixels.Color(45,30, 35));
              pixels.show();
              

} 
 

    
