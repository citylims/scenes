var fs = require('fs');
var express = require('express');
var host = '127.0.0.1';
var port = 6001;
var app = express();

app.use('/terrain', express.static('terrain'));
app.use('/universe', express.static('particle_universe'))

app.listen(port);
console.log("listening on " + port);
