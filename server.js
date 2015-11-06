var fs = require('fs');
var express = require('express');
var host = '127.0.0.1';
var port = 6001;

var app = express();
app.use(express.static('terrain'));

app.listen(port);
console.log("listening on " + port);
