const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression'); 
const path = require('path');

const port = 3000 || 8080;
const app = express();
const https = require( "https" );
const fs = require( "fs" );

const httpsOptions = {
    key: fs.readFileSync("cert.key"),
    cert: fs.readFileSync("cert.crt") 
};

app.use(compression({
  threshold: 25,
  filter: function(res, req) {
    if (req.getHeader('Content-type') === 'image/webp') {
      return true;
    } 
  }
})); 
app.use(expressStaticGzip(__dirname + '/dist', {enableBrotli: true, orderPreference: ['br', 'gz']}));
app.use(expressStaticGzip(__dirname  + '/public', {enableBrotli: true, orderPreference: ['br', 'gz']}));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

https.createServer(httpsOptions, app).listen(port);
console.log("server started on port " + port);