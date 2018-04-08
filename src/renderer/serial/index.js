const serialport = require('serialport');


class SerialSession {
  constructor() {
    this._session = null;
    this._connectionOpen = false;

    this.settings = {
      baudRate: 9600
    };

    this.__events = {

    };

    this.ports = [];

    serialport.list((err, ports) => {
      if (!err) {
        ports.forEach((port) => {
          this.ports.push(port.comName)
        })
      }

      if (this.ports.length >= 1) {
        this.set('comName', this.ports[0])
      }

      this.__callEvent('ready', true);
    })
  }

  isOpen() {
    return this._connectionOpen;
  }

  close() {
    if (this._connectionOpen) {
      this._session.close();
      this._session = null;
    }
  }

  set(key, value) {
    this.settings[key] = value
  }

  on(event, callback) {
    if (typeof event === "string") {
      this.__events[event] = callback
    }
  }

  __callEvent(event, args) {
    if (this.__events[event]) {
      this.__events[event](args)
    }
  }

  send(data) {
    this._session.write(data + '\n', err => {
      if (err) {
        return console.error('Error on write: ', err.message);
      } else {
        console.log('message written');
      }
    });
  }

  startSession(err) {
    if ((!this._session || !this._connectionOpen) && this.settings.comName) {
      this._session = new serialport(this.settings.comName, { baudRate: this.settings.baudRate });

      this._session.on('open', () => {
        this._connectionOpen = true;
        this.__callEvent('open', true);
      });
      this._session.on('data', this._readIncomingData.bind(this));
      this._session.on('close', () => {
        this._connectionOpen = false;
        this.__callEvent('close', true);
      });
      this._session.on('error', () => console.log('Serial port error: ' + error));
    } else {
      err('Unable to start a new session')
    }
  }

  _readIncomingData(bytes) {
    let data = "";

    bytes.forEach((char) => {
      data += String.fromCharCode(char);
    });

    this.__callEvent('data', data);
  }
}

export default SerialSession;
