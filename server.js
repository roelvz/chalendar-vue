// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

// create the express app
app = express();

// create middleware to handle the serving the app
app.use(serveStatic(path.join(__dirname, 'dist')));

// Check OneSignal SDK files and make sure they are not redirected to index file
app.get("*manifest.json", (req, res) => {
  console.log('manifest');
  res.sendFile(path.resolve(__dirname, "public", "manifest.json"));
});
app.get("*OneSingalSDKWorker.js", (req, res) => {
  console.log('OneSingalSDKWorker');
  res.sendFile(path.resolve(__dirname, "public", "OneSingalSDKWorker.js"));
});
app.get("*OneSignalSDKUpdaterWorker.js", (req, res) => {
  console.log('OneSignalSDKUpdaterWorker');
  res.sendFile(path.resolve(__dirname, "public", "OneSignalSDKUpdaterWorker.js"));
});
// Catch all other routes and redirect to the index file
app.get('*', function (req, res) {
  console.log('*');
  console.log(__dirname);

  res.sendFile(__dirname + '/dist/index.html')
});

// Create default port to serve the app on
const port = process.env.PORT || 5000;
app.listen(port);

// Log to feedback that this is actually running
console.log('server started at port '+ port);
