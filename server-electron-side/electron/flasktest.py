#Uploads the code in around 3 seconds. The issue is bringing the output live to the JS for the progress bar but hopefully we will find a way around it...maybe...

import subprocess   #to use the powershell of the laptop to run the arduino-cli.exe and hence its commands
from http.server import BaseHTTPRequestHandler, HTTPServer
import http.client

conn = http.client.HTTPConnection("127.0.0.1",8080)
board_availability = 0
startupinfo = subprocess.STARTUPINFO()
startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW

def upload_code():
    subprocess.check_output('arduino-cli core install arduino:avr')  # makes sure arduino avr is installed in the folder
    subprocess.Popen('arduino-cli compile -b arduino:avr:uno ArduinoOutput -v', stdout=subprocess.PIPE,stderr=subprocess.STDOUT,stdin=subprocess.PIPE)  # compiles Blink.ino inside Blink Folder. We are gonna have to get JS to save the file into whatever folder we want
    global upload_status
    upload_status = str(subprocess.Popen(('arduino-cli upload -p' + COM_PORT + ' --fqbn arduino:avr:uno ArduinoOutput -v'),stdout=subprocess.PIPE, stderr=subprocess.STDOUT,stdin=subprocess.PIPE))  # uploads compiled file to the arduino

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
        content_len = int(self.headers.get('content-length'))
        if content_len:
            post_body = self.rfile.read(content_len)
            post_body_text = post_body.decode("utf-8")
            print(post_body_text)
            sketch = open(".\ArduinoOutput\ArduinoOutput.ino","wb")
            sketch.write(post_body)
            sketch.close()
            sketch = open(".\ArduinoOutput\ArduinoOutput.ino","r")
            test_sketch = sketch.read()
            print(test_sketch)
            boardlist = str(subprocess.check_output('arduino-cli board list'))  # Checks if an arduino is connected to the computer
            if "USB" in boardlist:
                x = boardlist.split("\\n")
                res = [i for i in x if "USB" in i]
                board_availability = 1
                COMPORT = res[0]
                end_of_COM = COMPORT.find("Serial")
                global COM_PORT
                COM_PORT= COMPORT[0:end_of_COM - 1]
                print(COM_PORT)  # Just to triple check if the COM port is the true one. For Debugging purposes
                # subprocess.check_output('arduino-cli core install arduino:avr')  # makes sure arduino avr is installed in the folder
                # subprocess.Popen('arduino-cli compile -b arduino:avr:uno ArduinoOutput -v',stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.PIPE)  # compiles Blink.ino inside Blink Folder. We are gonna have to get JS to save the file into whatever folder we want
                # upload_status = str(subprocess.Popen(('arduino-cli upload -p' + COM_PORT + ' --fqbn arduino:avr:uno ArduinoOutput -v'),stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.PIPE))  # uploads compiled file to the arduino
                upload_code()
                if "Error during Upload" in upload_status:
                    print("Code did not upload")
                    self.send_response(402)
                    self.send_header('Content-type', 'text/html')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                else:
                    print("Code Uploaded successfully...")
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()

            else:
                print("No Arduino Connected")
                #self.send_response(400)
                self.send_response(401)
                self.send_header('Content-type', 'text/html')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                board_availability = 0

def main():
    print("Server is Available at 127.0.0.1 on port 8080")
    HTTPServer(("127.0.0.1", 8080), HandleRequests).serve_forever()

if __name__ == '__main__':
    main()