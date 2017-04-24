const electron = require("electron");
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;

var mainWindow;
var sysTray;
app.on('ready', function(){
    // please test on other OSes
    var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow({
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

    sysTray = new Tray('assets/icon.png');

    const contextMenu = Menu.buildFromTemplate([
      {label: 'Quit', type: 'normal', role: 'quit'}
    ]);
    sysTray.setToolTip('Wrong neighborhood...');
    sysTray.setContextMenu(contextMenu);
});
