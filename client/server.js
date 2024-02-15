const express = require('express');
const path = require('path');
const port = 3000 || 8080;
const app = express();
const https = require( "https" );  // для организации https
const fs = require( "fs" );

const httpsOptions = {
    key: fs.readFileSync("cert.key"), // путь к ключу
    cert: fs.readFileSync("cert.crt") // путь к сертификату
};
// serve static assets normally
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

https.createServer(httpsOptions, app).listen(port);
console.log("server started on port " + port);