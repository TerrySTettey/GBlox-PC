const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const {ipcMain} = require('electron')

const {execFile} = require('child_process');

//var result = execSync(path.resolve(__dirname.replace('\\','//'),'pyduino_test.exe')).toString();
//console.log(result);

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

ipcMain.on("open-tube", function (){
    const wint = new BrowserWindow({
        width: 1400,
        height: 800,
        //frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //preload: path.join(__dirname, 'preload.js')
            enableRemoteModule: true,
        }

    });
    wint.loadUrl("http://www.youtube.com")
    
})
/*
const {PythonShell} = require('python-shell')

PythonShell.run(path.join(__dirname, 'python_arduino.py'), null, function(res) {
    //console.log(res)
    console.log('finished')
});

*/


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