const electron = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;

let mainWindow;
let sysTray;


/**
 * Creates main window for app. Full transparent screen.
 * Will be made clickthroughable later
 */
function createWindow() {
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    resizable: false,
    transparent: true,
    frame: false,
    fullscreen: false,
    fullscreenable: false,
    alwaysOnTop: true,
    show: false,  // fix startup flicker
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();  // fix startup flicker
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'html', 'main.html'),
    protocol: 'file',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;  // cleanup stuff for later?
  });
};

/**
 * Creates Sys Tray icon / menubar for mac
 */
function createSysTrayMenu() {
  sysTray = new Tray('assets/icon.png');

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Quit', type: 'normal', role: 'quit'},
  ]);
  sysTray.setToolTip('Wrong neighborhood...');
  sysTray.setContextMenu(contextMenu);
};


app.on('ready', () => {
    // please test on other OSes
    createWindow();
    createSysTrayMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {  // imitate Mac OS X app behavior
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {  // imitate Mac OS X app behavior
    createWindow();
  }
});
