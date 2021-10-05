var example_codes = []

function example(header, level, blocks, description, devices,xml) {
  this.header = header;
  this.level = level;
  this.blocks = blocks;
  this.description = description;
  this.devices = devices;
  this.xml = xml;
}

const PoliceFlashLight = new example(
    "Police Flash Light",
    3,
    "Movement, LEDs, Loops, Math",
    "This example is like the 'Random Walk' example in Mode 4, but this time the movements aren't so random! That's because the 'random number generator seed' causes the same sequence of random numbers to appear, depending on the range of integers given. Run this program multiple times to see that you will get the same sequence of actions every time.",
    ["Mingo", "Arduino", "Mello"],
    undefined
)

const TrafficLight = new example(
    "Traffic Light",
    1,
    "Loops, LEDS, Math",
    "This example simulates a simple traffic light. It consists of 3 LEDs; red, amber and green.",
    ["Mingo", "Arduino"],
    undefined
)

example_codes.push(PoliceFlashLight);
example_codes.push(TrafficLight);
export default example_codes