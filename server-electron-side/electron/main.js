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

//Creation of Application Window
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        minHeight: 713,
        minWidth: 1284,
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
//When save button is pressed...


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

async function writeSystemSettings(data) {
    var filePath = path.resolve(__dirname, "settings.txt");
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log("Settings Updated")
    })
}

async function retrieveSystemSettings(cb) {
    var settings = "nil";
    var filePath = path.resolve(__dirname, "settings.txt");
    try {
        settings = fs.readFileSync(filePath, "utf8")
        settings = settings.split(`\n`)
    }
    catch (e) {
        console.log(e)
    }
    cb(settings)
}


async function COMPORT_CONSTANT(cb) {
    var ports = ["No Board Detected"]
    try {
        var comport = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", { encoding: "utf-8" })
        comport = comport.split(`\n`)
        var temp_ports = []
        for (var i = 0; i < comport.length; i++) {
            if (comport[i].includes("\\Device\\Serial") == true) {
                temp_ports.push(comport[i].split("REG_SZ    ")[1].split("\r")[0]);
            }
        }
        if (temp_ports !== []) {
            ports = temp_ports
        }
    }
    catch (e) {
    }
    cb(ports)
}
//Function which identifies the COM Port that Arduino is connected to...
function CHECK_COMPORT(cb) {
    try {
        COMPORT = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", { encoding: "utf-8" })  //,(error, stdout, stderr) => {
        if (COMPORT.includes('COM') == 1) {
            COMPORT = COMPORT.split("    ")[3].split("\r")[0];
        }
        else {
            COMPORT = "No Arduino Detected";
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
        VERIFICATION = exec(path.resolve(__dirname, "./arduino-1.8.15/arduino_debug --upload ") + path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino") + " --port " + COMPORT, (error, stdout, stderr) => {

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

async function readSerialPort(cb) {
    // console.log(serial_monitor)
    if (typeof serial_monitor === "undefined") {
        serial_monitor = new serialport(COMPORT, {
            baudRate: 9600,
            parser: new serialport.parsers.Readline('\r\n'),
        });
        console.log("Parsing Data for the first time")

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
ipcMain.on("save-file", function (event, xml_data) {
    saveFile(xml_data)
})

//When load button is pressed...
ipcMain.on("load-file", async function (event) {
    var data = await loadFile()
    event.returnValue = data;
})

ipcMain.handle("load-settings", async function (event) {
    try {
        retrieveSystemSettings(function (res) {
            event.sender.send("current-settings", res)
        })
    }
    catch (e) {
        console.log(e)
    }
})

ipcMain.handle("write-settings", async function (event, settings) {
    writeSystemSettings(settings)
})

ipcMain.handle("serialport_retreive", async function (event) {
    try {
        console.log("Opening SerialMonitor\n");
        CHECK_COMPORT(function (res) {
            console.log(res);
        });
        readSerialPort(function (res) {
            event.sender.send('serialport_monitor', res);
        });
    }
    catch (e) {
        console.log(e);
    }
})
ipcMain.handle("check_comport_constant", async function (event) {
    var result = []
    try {
        COMPORT_CONSTANT(function (res) {
            result = res
            event.sender.send('comport_constant', result)
        });;

    }
    catch (e) { console.log(e) }

})

ipcMain.handle("serialport_write", async function (event, value) {
    serial_monitor.write(value, function (err) {
        serial_monitor_results += `\nSent ${value} to Arduino\n`;
    });
})

ipcMain.handle("serialport_close", function (event) {
    try {
        console.log("Closing SerialMonitor\n");
        serial_monitor.close(function (err) {
            console.log(`Closed Serial Monitor ` + err);
        });
    }
    catch (e) {
        console.log(e);
    }
})

//When the upload button is pressed...
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
        console.log(e)
    }
})

ipcMain.on("check-comport", async function (event, jsCode) {
    try {
        CHECK_COMPORT(function (res) {
            // event.sender.send('arduino_comport', res);
            return res;
        });
    }
    catch (e) {
        console.log(e);
    }
})
