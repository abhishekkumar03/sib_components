## Installing and Running

To start, make sure you're in the `react-code-base` folder in command-line.

```sh
# Install Node Modules
npm install

# If you want to edit the react code, this rebuilds
gulp watch
```

If you want to edit the React code, you'll have to re-build the `assets/js/dependencies/bundle.js` file with Webpack, it will also change ES6 code to ES5 compaitible code so that browser can understand. To rebuild with webpack, type:

```sh
gulp watch
```