# Electron Basic Serial terminal

Proof of concept for both the `serialport` module and a ES6 build of Electron. Big thanks to the [electron-webpack-quick-start](https://github.com/electron-userland/electron-webpack-quick-start). For being a great bootstrap for this project.

Built on Windows 10 using:

- `nvm@1.1.6`
- `node@8.11.1`
- `npm@5.7.1`

**arduino-serial** is a quick basic serial sketch for the Arduino to show the basics of the terminal. It echos the previous input when seeing a '\n' character.

# To fix the development imports

This issue when running `dev` is probably just for windows but if it occurs edit as per the below

Modify `.\node_modules\electron-webpack\out\targets\RendererTarget.js` replacing `.replace(/\\/g, "\\\\")}"` with `.replace(/\\/g, "\\\\\\\\")}"`

https://github.com/electron-userland/electron-webpack/issues/121
