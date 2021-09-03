float mello;
int US_Trigger = 11;
int US_Echo = 10;


void setup(){
	Serial.begin(9600);
	pinMode(11, OUTPUT);
	pinMode(10, INPUT);

}

void loop(){
   	Serial.println((read_ultrasonic(11,10)));

}

int read_ultrasonic(int trigger, int echo){
        digitalWrite(trigger, LOW);
        delayMicroseconds(2);
        digitalWrite(trigger, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigger, LOW);
        int duration = pulseIn(echo, HIGH);
        int distance = duration * 0.034 / 2;
        return distance;
    }