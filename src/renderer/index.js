require("module").globalPaths.push(__dirname + "/node_modules");
require("source-map-support/source-map-support.js").install();

const electron = require('electron');
let { Menu } = electron.remote;

require('./main.css');
document.getElementById('app').innerHTML = `
<div id="screenTerminal">
  <p id="terminalOutput">
  </p>
</div>
<div id="screenFooter">
  <form onsubmit="event.preventDefault()">
    <button id="terminalSubmit">Send</button>
    <div style="overflow: hidden;">
      <label for="terminalInput"></label><input id="terminalInput" type="text">
    </div>
  </form>
</div>`;

import { TerminalInput, TerminalOutput } from './components/terminal/terminal';
import SerialSession from './serial';

let input = new TerminalInput(document.getElementById('terminalInput'));
let output = new TerminalOutput( document.getElementById('terminalOutput'));

let session = new SerialSession();

session.on('data', (data) => {output.add(data)});
session.on('open', () => {output.add("--------------------\nConnected . . . \n--------------------\n")});
session.on('close', () => {input.disable();output.add("--------------------\nDisconnected . . . \n--------------------\n")});

document.getElementById('terminalSubmit').addEventListener('click', () => {
  if (session.isOpen()) {
    output.add('<span style="color: red">' + input.getValue() + '</span>\n');
    session.send(input.getValue());

    input.clear();
    output.moveTo();
  }
});

let menuTemplate = [
  {
    label: 'Connect',
    click: () => {
      input.enable();
      session.startSession((err) => {
        console.error(err);
        alert(err);
        input.disable();
      });
    }
  },
  {
    label: 'Disconnect',
    click: () => {
      session.close();
    }
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Baud Rate',
        submenu: [
          {
            label: '9600',
            click: () => {
              session.set('baudRate', 9600)
            }
          },
          {
            label: '115200',
            click: () => {
              session.set('baudRate', 115200)
            }
          }
        ]
      }
    ]
  }
];

session.on('ready', () => {
  let portOptions = [];
  session.ports.forEach((port) => {
      portOptions.push({
        label: port,
        click() {
          session.set('comName', port)
        }
      });
    });

  menuTemplate[2].submenu.push({
    label: 'Serial Port',
    submenu: portOptions
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
});

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
