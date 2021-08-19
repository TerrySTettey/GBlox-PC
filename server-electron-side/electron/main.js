const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const {ipcMain, dialog} = require('electron')
var fs = require('fs')
var COMPORT = null;
var VER = null;
var REGKEY_TEST = null;
var Upload_Status = null;

const {execFile, execSync, exec} = require('child_process');

//var result = execSync(path.resolve(__dirname.replace('\\','//'),'pyduino_test.exe')).toString();
//console.log(result);

/*
execFile(path.resolve(__dirname,'./debugSh.bat'), function(error, stdout, stderr) {
    console.log("Executing .exe")
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if(stderr) {
        console.log(`stderr: ${stderr.message}`);
        return;
    }
    console.log(`stdout: ${stdout.message}`);
})
*/


/*
const {PythonShell} = require('python-shell')

PythonShell.run(path.join(__dirname, 'python_arduino.py'), null, function(res) {
    //console.log(res)
    console.log('finished')
});

*/

ipcMain.on("save-file", function (event, xml_data){
    saveFile(xml_data)
})

ipcMain.on("load-file", async function (event){

    console.log("Electron main.js recieved load-file")
    var data = await loadFile()
    console.log("Electron main js sending out return-load")
    //event.reply("return-load",data)
    event.returnValue = data;
})

async function loadFile(){
    var ourdata = "nil";
    const { filePaths, canceled } = await dialog.showOpenDialog({
        defaultPath: "project.xml",
        buttonLabel: "Load Project",
        title: "Load Project",
        filters: [
            {name: 'Project File', extensions: ['txt','xml']}
        ]
      });
    console.log("File Path: "+filePaths[0])
    if (filePaths[0] && !canceled) {
        console.log("The Calm before the Storm...")
        try{
            ourdata = fs.readFileSync(filePaths[0], 'utf8')
            console.log('The file has been loaded!')
            console.log(String("Data from Load: " + ourdata.toString()))
        }catch(err) {
            throw err;
        }
        /*
        await fs.readFile(filePaths[0],"utf8",(err,data) => {
          if (err) throw err;
          console.log('The file has been loaded!')
          console.log(String("Data from Load: " + data.toString()))
          ourdata = data;
        });
        */
    }
    return ourdata;
}


function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        //frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //preload: path.join(__dirname, 'preload.js')
            enableRemoteModule: true,
        }
    })

    //win.loadFile('index.html')
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    win.removeMenu()
    win.setTitle("Arduino From Scratch")

    if(isDev){
        win.webContents.openDevTools({mode: 'detach'})
    }
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})

async function saveFile(data){
    const { filePath, canceled } = await dialog.showSaveDialog({
        defaultPath: "project.xml",
        buttonLabel: "Save Project",
        title: "Save Project As...",
        filters: [
            {name: 'Project File', extensions: ['txt','xml']}
        ]
      });

    if (filePath && !canceled) {
        fs.writeFile(filePath, data, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
    }
}

function CHECK_COMPORT(){
    COMPORT = execSync("REG QUERY HKLM\\HARDWARE\\DEVICEMAP\\SERIALCOMM", {encoding: "utf-8"})  //,(error, stdout, stderr) => {
    console.log(COMPORT);
    if (COMPORT.includes('COM')==1){
        COMPORT = COMPORT.split("    ")[3].split("\r")[0];
    }
    else{
        COMPORT = "No Arduino Detected";
    }
 }

async function VERIFYCODE(cb){
    var VERIFICATION = null;
    var output = "";
    console.log("INSIDE VER2")
    if(COMPORT != "No Arduino Detected"){
        VERIFICATION = exec(path.resolve(__dirname,"./arduino-1.8.15/arduino_debug --upload ")+path.resolve(__dirname,"./ArduinoOutput/ArduinoOutput.ino")+" --port "+COMPORT,(error, stdout, stderr) => {
            console.log("INSIDE VERIFYCODE")
            if (error) {
                output += error;
                console.log(output);
                cb("Upload Failed : Error in Code")
            }
            else{
                cb("Upload Successful")
            }
            //return VERIFICATION;
        }
        )
    }
    else{
        cb("No Arduino Detected");
    }
}

ipcMain.handle("upload-code",async function(event,jsCode){
    try{
        fs.writeFileSync(path.resolve(__dirname, "./ArduinoOutput/ArduinoOutput.ino"), jsCode)
        CHECK_COMPORT();
        VERIFYCODE(function(res) {
            console.log("IT IS FINISHED");
            event.sender.send('return_arduino',res);
        });
        //var VER = await VERIFYCODE();
        //console.log(VER)
    }
    catch(e){
        console.log(e)
    }
    
    // VER.stdout.on("data",function(data){
    //     console.log("Hey this is our data" + data);
    //     
    // })
    
})

ipcMain.on("upload-status",function(event){
    var uploadstat = check_upload_status();
    event.returnValue = uploadstat;

});

function check_upload_status(){
    return Upload_Status
}