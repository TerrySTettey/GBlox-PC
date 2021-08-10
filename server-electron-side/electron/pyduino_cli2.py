#Uploads the code in around 3 seconds. The issue is bringing the output live to the JS for the progress bar but hopefully we will find a way around it...maybe...

import subprocess   #to use the powershell of the laptop to run the arduino-cli.exe and hence its commands
from http.server import BaseHTTPRequestHandler, HTTPServer

def upload_to_board():
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

class HandleRequests(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        self.wfile.write("received get request")

    def do_POST(self):
        self._set_headers()
        content_len = int(self.headers.get('content-length'))
        if content_len:
            post_body = self.rfile.read(content_len)
            print(post_body.decode("utf-8"))
            sketch = open(".\ArduinoOutput\ArduinoOutput.ino","wb")
            sketch.write(post_body)
            sketch.close()
            upload_to_board()

def main():
    print("Server is Available at 127.0.0.1 on port 8080")
    HTTPServer(('127.0.0.1', 8080), HandleRequests).serve_forever()

if __name__ == '__main__':
    main()

