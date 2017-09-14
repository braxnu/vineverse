'use strict';

var express = require('express');
var app = express();

app.use(express.static('dist/client'));

app.use(function (err, req, res, next) {
  console.log(err.message);
  console.log(err.stack);

  res.status(500).send({
    message: err.message
  });
});

app.listen(4000, function () {
  return console.log('you talk!');
});