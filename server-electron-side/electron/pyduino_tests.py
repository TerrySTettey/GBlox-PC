#Uploads the code in around 3 seconds. The issue is bringing the output live to the JS for the progress bar but hopefully we will find a way around it...maybe...


import subprocess   #to use the powershell of the laptop to run the arduino-cli.exe and hence its commands

boardlist = str(subprocess.check_output('arduino-cli board list'))      #Checks if an arduino is connected to the computer
if "COM" in boardlist:
    COM_PORT_index = boardlist.index("COM")     #finds where the COM Port number is in the string
    COM_PORT = boardlist[COM_PORT_index:(COM_PORT_index + 4)]       #Gets the specific port
    print(COM_PORT)     #Just to triple check if the COM port is the true one. For Debugging purposes
    subprocess.Popen('arduino-cli core install arduino:avr')        #makes sure arduino avr is installed in the folder
    subprocess.check_output('arduino-cli compile -b arduino:avr:uno ArduinoOutput -v')      #compiles Blink.ino inside Blink Folder. We are gonna have to get JS to save the file into whatever folder we want
    subprocess.check_output('arduino-cli upload -p'+COM_PORT+' --fqbn arduino:avr:uno ArduinoOutput')  #uploads compiled file to the arduino
else:
    print("No Arduino Connected")
