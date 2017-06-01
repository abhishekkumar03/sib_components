## Installing and Running

1. Create a package.json with details or use npm init command to create package.
2. run npm install https://github.com/{user_name}/{repo_name}/tarball/master
3. run gulp command to publish your app

# If you want to edit the react code

If you want to edit the React code, you'll have to re-build the `assets/js/bundle.js` file with Webpack, it will also change ES6 code to ES5 compaitible code so that browser can understand. To rebuild with webpack, you need to use gulp command.
