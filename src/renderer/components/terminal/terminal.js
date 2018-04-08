class TerminalInput {
  constructor(textInput) {
    this._input = textInput;

    this._input.disabled = true;
  }

  getValue() {
    return this._input.value;
  }

  clear() {
    this._input.value = "";
  }

  enable() {
    this._input.disabled = false;
  }

  disable() {
    this._input.disabled = true;
  }
}

class TerminalOutput {
  constructor(textOutput) {
    this._output = textOutput;
  }

  add(text) {
    let adjustText = this._output.scrollTop === (this._output.scrollHeight - this._output.clientHeight);
    this._output.innerHTML += text.replace(/\n/g, '<br />');
    if (adjustText) this.moveTo();
  }

  moveTo(location=-1) {
    if (location <= -1) {
      this._output.scrollTop = this._output.scrollHeight;
    } else {
      this._output.scrollTop = location;
    }
  }
}

module.exports = {
  TerminalInput,
  TerminalOutput
};
