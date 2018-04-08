const electron = require('electron');
const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');

import { format as formatUrl } from 'url'

const isDev = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  let window = new BrowserWindow({
    width: 810,
    height: 600,
    show: false
  });

  if (isDev) window.webContents.openDevTools();

  window.on('ready-to-show', () => {
    window.show();
  });


  if (isDev) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus()
    })
  });

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createWindow()
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createWindow()
});
