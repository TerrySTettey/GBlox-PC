const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { ipcMain, dialog } = require('electron')
const serialport = require('serialport');
const SerialPort = serialport.SerialPort;
const Readline = require('@serialport/parser-readline')
var fs = require('fs')
var COMPORT = null;
var Upload_Status = null;
var serial_monitor;
const { execSync, exec } = require('child_process');

//When save button is pressed...
ipcMain.on("save-file", function (event, xml_data) {
    saveFile(xml_data)
})

//When load button is pressed...
ipcMain.on("load-file", async function (event) {
    var data = await loadFile()
    event.returnValue = data;
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

//Creation of Application Window
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    win.removeMenu()
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

//Function which identifies the COM Port that Arduino is connected to...
function CHECK_COMPORT(cb) {
    try{
        COMPORT = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", { encoding: "utf-8" })  //,(error, stdout, stderr) => {
            console.log(COMPORT);
            if (COMPORT.includes('COM') == 1) {
                COMPORT = COMPORT.split("    ")[3].split("\r")[0];
                
            }
            else {
                COMPORT = "No Arduino Detected";
            }
    }
    catch(e) {
        COMPORT = "No Arduino Detected";
    }
    cb(COMPORT);
}

//Function which compiles and tries to upload code to the connected Arduino...
async function VERIFYCODE(cb) {
    var VERIFICATION = null;
    var output = "";
    console.log("INSIDE VER2")
    if (COMPORT != "No Arduino Detected") {
        VERIFICATION = exec(path.resolve(__dirname, "./arduino-1.8.15/arduino_debug --upload ") + path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino") + " --port " + COMPORT, (error, stdout, stderr) => {
            console.log("INSIDE VERIFYCODE")
            if (error) {
                output += error;
                console.log(output);
                cb("Upload Failed : Error in Code")
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

async function readSerialPort(cb){
    serial_monitor =new serialport(COMPORT, {
        baudRate: 9600,
        parser: new serialport.parsers.Readline('\r')
    });
    serial_monitor.on('data', function(data) {
        console.log('data received: ' + data);
        cb(data);
    });
}

// function checkSerialPort(){
//     serialport.list().then(ports => {
//         ports.forEach(function(port) {
//             //console.log(port.path)
//             COMPORT = port.path;
//         })
//     })
//     return COMPORT;
// }

ipcMain.handle("serialport_retreive", async function (event){
    try{
        console.log("Opening SerialMonitor\n");
        CHECK_COMPORT(function (res){
            console.log(res);
            event.sender.send('arduino_comport',res);
        });
        readSerialPort(function (res){
            console.log(res)
            event.sender.send('serialport_monitor',res);
        });
    }
    catch (e) {
        console.log(e);
    }
})

ipcMain.handle("serialport_close", function (event){
    try {
        console.log("Close SerialMonitor\n");
        if (typeof serial_monitor != "undefined"){
            serial_monitor.close(function (err){
                console.log("Closed SerialMonitor",err);
            });
        }
    }
    catch (e) {
        console.log(e);
    }
})

//When the upload button is pressed...
ipcMain.handle("upload-code", async function (event, jsCode) {
    try {
        fs.writeFileSync(path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino"), jsCode)
        CHECK_COMPORT(function (res){
            event.sender.send('arduino_comport',res);
        });
        VERIFYCODE(function (res) {
            //console.log("IT IS FINISHED");
            event.sender.send('arduino_upload_status', res);
        });
    }
    catch (e) {
        console.log(e)
    }
})

ipcMain.handle("check-comport", async function (event, jsCode) {
    try{
        CHECK_COMPORT(function (res){
            event.sender.send('arduino_comport',res);
        });
    }
    catch(e){
        console.log(e);
    }
})
