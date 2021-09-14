var DeviceList = []

function device(device_name, compiler, microcontroller, peripherals_used, peripherals_pins){
    this.device_name =device_name;
    this.compiler=compiler;
    this.microcontroller = microcontroller;
    this.peripherals_used = peripherals_used;
    this.peripherals_pins = peripherals_pins;
}

const Mello_Bot = new device("Mello", "Arduino",
"Arduino Nano", 
[`Ultrasonic Sensor`, `Wheel Servo Motor A`, `Wheel Servo Motor B`, `Forklift Servo Motor C`, `Light Follower A`, `Light Follower B`, `Line Follower A`, `Line Follower B`,`Infrared Receiver`, `Bluetooth Receiver`, `RGB Led`, `Buzzer`],
[[`Ultrasonic`,[11,10]],[`Light Follower`,[`A0`,`A1`]],[`Line Follower`,[`A2`,`A3`]],[`Servo`,[9,8,10]],[`IR_Remote`,3],[`Bluetooth`,[12,13]],[`RGB Led`,[6,4,5]], [`Buzzer`, 7]])


