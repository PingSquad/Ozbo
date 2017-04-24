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
    mainWindow = new browserWindow({
      transparent: true,
      frame: false,
      fullscreen: true
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
