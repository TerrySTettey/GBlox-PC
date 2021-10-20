const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { ipcMain, dialog } = require('electron')
const serialport = require('serialport');
const SerialPort = serialport.SerialPort;
const Readline = serialport.parsers.Readline;
const parser = new Readline();
var fs = require('fs')
var COMPORT = null;
var Upload_Status = null;
var serial_monitor;
var serial_monitor_results = "";
const { execSync, exec } = require('child_process');
const { shell } = require('electron');
var loaded_path = "";
var win = null;
//Creation of Application Window
function createWindow() {
    win = new BrowserWindow({
        width: 1400,
        height: 800,
        minHeight: 713, //678
        minWidth: 1284, //1271
        maxWidth: 1933, //1920
        maxHeight: 1115, //1080
        maximizable: true,
        title: "GBlox",
        autoHideMenuBar: true,
        /*frame:false,*/
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    //win.removeMenu()
    win.setTitle("Arduino From Scratch")
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' })
    }
}
//When the app is ready to launch...
app.whenReady().then(() => {
    createWindow()
})
//When all the windows of the app are closed...
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
//On 'activate' ...
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

//Load function
async function loadFile() {
    var ourdata = "nil";
    const { filePaths, canceled } = await dialog.showOpenDialog({
        defaultPath: "project.xml",
        buttonLabel: "Load Project",
        title: "Load Project",
        filters: [
            { name: 'Project File', extensions: ['txt', 'xml'] }
        ]
    });

    console.log("File Path: " + filePaths[0])
    loaded_path = filePaths[0];
    if (filePaths[0] && !canceled) {
        try {
            ourdata = fs.readFileSync(filePaths[0], 'utf8')
            console.log('The file has been loaded!')
            console.log(String("Data from Load: " + ourdata.toString()))
        } catch (err) {
            throw err;
        }
    }
    return ourdata;
}
//Save Function
async function saveFile(data) {
    const { filePath, canceled } = await dialog.showSaveDialog({
        defaultPath: "project.xml",
        buttonLabel: "Save Project",
        title: "Save Project As...",
        filters: [
            { name: 'Project File', extensions: ['txt', 'xml'] }
        ]
    });

    if (filePath && !canceled) {
        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}
//Function to write settings of the application to the settings.txt file
async function writeSystemSettings(data) {
    var filePath = path.resolve(__dirname, "settings.txt");
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
    })
}
//Function to retrieve settings of the application
async function retrieveSystemSettings(cb) {
    var settings = "nil";
    var filePath = path.resolve(__dirname, "settings.txt");
    try {
        settings = fs.readFileSync(filePath, "utf8")
        settings = settings.split(`\n`)
    }
    catch (e) {
    }
    cb(settings)
}

async function sendMail() {
    
}

//Function to constantly retrieve available USB COMPORTs
async function COMPORT_CONSTANT(cb) {

    var ports = []   //Array for all available COM ports connected via USB
    try {
        var comport = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", { encoding: "utf-8" }) //Check system registry for all available serial ports
        comport = comport.split(`\n`)   //Split all values by new line and put them in an array
        var temp_ports = [] //Temporary ports value
        for (var i = 0; i < comport.length; i++) {  //Cycle through all the values
            if (comport[i].includes("\\Device\\Serial") == true) {      //Check if the COMPORT is connected via US
                temp_ports.push(comport[i].split("REG_SZ    ")[1].split("\r")[0]);  //Remove all unwanted data leaving only the COMPORT number
            }
        }
        if (temp_ports !== []) {
            ports = temp_ports  //If a comport is found, push it into main ports array
        }
    }
    catch (e) {
    }
    cb(ports) //callback for main ports
}
//Function which identifies the COM Port that Arduino is connected to...
function CHECK_COMPORT(cb) {
    try {
        COMPORT = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", { encoding: "utf-8" })
        COMPORT = COMPORT.split(`\n`)
        var temp_ports = []
        for (var i = 0; i < COMPORT.length; i++) {
            if (COMPORT[i].includes("\\Device\\Serial") == true) {
                temp_ports.push(COMPORT[i].split("REG_SZ    ")[1].split("\r")[0]);
            }
        }
        if (temp_ports !== []) {
            COMPORT = temp_ports
        }
    }
    catch (e) {
        COMPORT = "No Arduino Detected";
    }
    cb(COMPORT);
}

//Function which compiles and tries to upload code to the connected Arduino...
async function VERIFYCODE(cb) {
    var VERIFICATION = null;
    var output = "";

    if (COMPORT != "No Arduino Detected") {
        VERIFICATION = exec(path.resolve(__dirname, "./arduino-1.8.15/arduino_debug --upload ") + path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino") + " --port " + COMPORT[0], (error, stdout, stderr) => {

            if (error) {
                output += error;
                const mainerror = output.split("Fail to get the Vid Pid information from the builder response code=404")[1].split(`exit status`)[0].replaceAll("ArduinoOutput:", "");
                console.log(mainerror);
                cb(`Upload Failed : Error in Code\n\n  ${mainerror}`)
            }
            else {
                cb("Upload Successful")
            }
        })
    }
    else {
        cb("No Arduino Detected");
    }
}

//Function to read the serial port of the device via COMPORT
async function readSerialPort(cb) {
    if (typeof serial_monitor === "undefined") {
        serial_monitor = new serialport(COMPORT[0], {
            baudRate: 9600,
            parser: new serialport.parsers.Readline('\r\n'),
        });
        serial_monitor.pipe(parser);
        parser.on('data', function (data) {
            serial_monitor_results += data;
            cb(serial_monitor_results);
        });
    }
    else {
        serial_monitor.open();
        serial_monitor_results = "";
    }
}

//ipc call for "save-file" which is responsible for saving the XML data of a workspace to a directory chosen by the user
ipcMain.on("save-file", function (event, xml_data) {
    saveFile(xml_data)
})

//ipc call for "load-file" which is responsible for loading the desired XML data from the directory chosen by the user
ipcMain.on("load-file", async function (event) {
    var data = await loadFile()
    event.returnValue = data;
})
ipcMain.on("send-file-mail", async function (event) {
    sendMail();
})
//ipc call for "load-settings" which is responsible for loading the current settings.txt file and sending it back to react for use
ipcMain.handle("load-settings", async function (event) {
    try {
        retrieveSystemSettings(function (res) {
            event.sender.send("current-settings", res)
        })
    }
    catch (e) {
    }
})
//ipc call for "load-settings" which is responsible for writing to the current settings.txt file with new settings
ipcMain.handle("write-settings", async function (event, settings) {
    writeSystemSettings(settings)
})

//ipc call for "check_comport_constant" which is responsible for constantly checking the available comports for react use
ipcMain.handle("check_comport_constant", async function (event) {
    var result = []
    try {
        COMPORT_CONSTANT(function (res) {
            result = res
            event.sender.send('comport_constant', result)
        });;

    }
    catch (e) { }

})

//ipc call for "serialport_retreive" which checks for an available COMPORT and reads the serial data being transmitted.
ipcMain.handle("serialport_retreive", async function (event) {
    try {
        CHECK_COMPORT(function (res) {
        });
        readSerialPort(function (res) {
            event.sender.send('serialport_monitor', res);
        });
    }
    catch (e) {
    }
})

//ipc call for "serialport_write" which sends a value via serial communication to the existing COMPORT
ipcMain.handle("serialport_write", async function (event, value) {
    serial_monitor.write(value, function (err) {
        serial_monitor_results += `\nSent ${value} to Arduino\n`;
    });
})

ipcMain.handle("serialport_close", function (event) {
    try {
        serial_monitor.close(function (err) {
        });
    }
    catch (e) {
    }
})

//ipc call for "upload-code" which checks for an available COMPORT and attempts to uplaod arduino code to the device
ipcMain.handle("upload-code", async function (event, jsCode) {
    try {
        fs.writeFileSync(path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino"), jsCode)
        CHECK_COMPORT(function (res) {
            event.sender.send('arduino_comport', res);
        });
        VERIFYCODE(function (res) {
            event.sender.send('arduino_upload_status', res);
        });
    }
    catch (e) {
    }
})
try {
    setInterval(() => {
        var result = []

        COMPORT_CONSTANT(function (res) {
            result = res
            win.webContents.send('comport_constant', result)
        });;
    }, 3000)
}
catch (e) { }