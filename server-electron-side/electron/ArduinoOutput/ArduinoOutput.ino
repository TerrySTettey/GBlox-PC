

    #include <melody.h>
    MelodyPlayer mPlayer;
    int buzz = 8;
    
int sample_variable;
 
int runOnce;
 
void setup(){


    
 
runOnce = 0;
}

void loop(){
	if(runOnce == 0){
  
              int silentNight[] = {
  
                  // Silent Night, Original Version
                  // Score available at https://musescore.com/marcsabatella/scores/3123436
                
                  NOTE_G4,-4, NOTE_A4,8, NOTE_G4,4,
                  NOTE_E4,-2, 
                  NOTE_G4,-4, NOTE_A4,8, NOTE_G4,4,
                  NOTE_E4,-2, 
                  NOTE_D5,2, NOTE_D5,4,
                  NOTE_B4,-2,
                  NOTE_C5,2, NOTE_C5,4,
                  NOTE_G4,-2,
                
                  NOTE_A4,2, NOTE_A4,4,
                  NOTE_C5,-4, NOTE_B4,8, NOTE_A4,4,
                  NOTE_G4,-4, NOTE_A4,8, NOTE_G4,4,
                  NOTE_E4,-2, 
                  NOTE_A4,2, NOTE_A4,4,
                  NOTE_C5,-4, NOTE_B4,8, NOTE_A4,4,
                  NOTE_G4,-4, NOTE_A4,8, NOTE_G4,4,
                  NOTE_E4,-2, 
                  
                  NOTE_D5,2, NOTE_D5,4,
                  NOTE_F5,-4, NOTE_D5,8, NOTE_B4,4,
                  NOTE_C5,-2,
                  NOTE_E5,-2,
                  NOTE_C5,4, NOTE_G4,4, NOTE_E4,4,
                  NOTE_G4,-4, NOTE_F4,8, NOTE_D4,4,
                  NOTE_C4,-2,
                  NOTE_C4,-1,
                };
              mPlayer.play_melody(144, silentNight,sizeof(silentNight)/sizeof(silentNight[0]));
runOnce = 1;}
}


    void SirenA(){
        for(int hz = 440; hz < 1000; hz+=25){
          tone(buzz, hz, 50);
          delay(5);
        }
        // Whoop down
        for(int hz = 1000; hz > 440; hz-=25){
          tone(buzz, hz, 50);
          delay(5);
        }
      }
      
      void SirenB(){
        for(int hz = 440; hz < 1000; hz++){
          tone(buzz, hz, 50);
          delay(5);
        }
        for(int hz = 1000; hz > 440; hz--){
          tone(buzz, hz, 50);
          delay(5);
          }
      }
    
