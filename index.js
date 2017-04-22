const electron = require("electron");
const app = electron.app;
const path = require('path');
const url = require('url');

const browserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready', function(){
    mainWindow = new browserWindow({
      width: 200,
      height: 200,
      transparent: true,
      frame: false
    });

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'main.html'),
      protocol: 'file',
      slashes: true,
    }));
});
