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
  // Сжимаем HTTP ответы, тело которых длиннее одного байта
  threshold: 25,
  // Сжимаем HTTP ответы независимо от их mime-типа
  filter: function(res, req) {
    //if (res.headers('Content-Type') === 'image/webp') {
    if (req.getHeader('Content-type') === 'image/webp') {
      return true;
    } 
    // else {
    //   //return false;
    //   return compression.filter(req, res)
    // }
  }
})); 
//app.use(express.static(__dirname + '/dist'));
app.use(expressStaticGzip(__dirname + '/dist', {enableBrotli: true, orderPreference: ['br', 'gz']}));
//app.use(express.static(__dirname + '/public'));
app.use(expressStaticGzip(__dirname  + '/public', {enableBrotli: true, orderPreference: ['br', 'gz']}));
// app.use(expressStaticGzip(__dirname  + '/public', {
//   enableBrotli: true, 
//   //immutable: true,
//   orderPreference: ['br', 'gz'], 
//   setHeaders: (res) => {
//     res.setHeader('Content-Encoding', 'br');
//     res.setHeader('Cache-Control', 'public, max-age=31536000');
//   },
// }));
//app.use(compression()); ----not work------


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

https.createServer(httpsOptions, app).listen(port);
console.log("server started on port " + port);