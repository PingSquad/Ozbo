const electron = require("electron");
const path = require('path');
const url = require('url');

const app = electron.app;
const browserWindow = electron.BrowserWindow;
const tray = electron.Tray;
const menu = electron.Menu;

var mainWindow;
var sysTray;
app.on('ready', function(){
    // please test on other OSes
    var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    mainWindow = new browserWindow({
      width: width,
      height: height,
      resizable: false,
      transparent: true,
      frame: false,
      fullscreen: false,
      fullscreenable: false,
      alwaysOnTop: true,
      show: false  // fix startup flicker
    });
    mainWindow.once('ready-to-show', () => {
      mainWindow.show()  // fix startup flicker
    });

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'html', 'main.html'),
      protocol: 'file',
      slashes: true,
    }));

    sysTray = new tray('assets/icon.png');

    const contextMenu = menu.buildFromTemplate([
      {label: 'Quit', type: 'normal', role: 'quit'}
    ]);
    sysTray.setToolTip('Wrong neighborhood...');
    sysTray.setContextMenu(contextMenu);
});
