// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

// create the express app
app = express();

// create middleware to handle the serving the app
app.use(serveStatic(path.join(__dirname, 'dist')));

console.log('X');

// Check OneSignal SDK files and make sure they are not redirected to index file
app.get("manifest.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/manifest.json"));
});
app.get("OneSingalSDKWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSingalSDKWorker.js"));
});
app.get("OneSignalSDKUpdaterWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSignalSDKUpdaterWorker.js"));
});
// Check OneSignal SDK files and make sure they are not redirected to index file
app.get("/manifest.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/manifest.json"));
});
app.get("/OneSingalSDKWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSingalSDKWorker.js"));
});
app.get("/OneSignalSDKUpdaterWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSignalSDKUpdaterWorker.js"));
});
// Check OneSignal SDK files and make sure they are not redirected to index file
app.get("/dist/manifest.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/manifest.json"));
});
app.get("/dist/OneSingalSDKWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSingalSDKWorker.js"));
});
app.get("/dist/OneSignalSDKUpdaterWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "/dist/OneSignalSDKUpdaterWorker.js"));
});
// Catch all other routes and redirect to the index file
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
});

// Create default port to serve the app on
const port = process.env.PORT || 5000;
app.listen(port);

// Log to feedback that this is actually running
console.log('server started at port '+ port);
