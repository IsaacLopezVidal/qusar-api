// exports.topsecret = (req, res) => {
//     let message = req.query.message || req.body.message || 'Repositorio Hola Top Secret!';
//     res.status(200).send(message);
//   };
var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello world! desde repositorio");
});
exports.api=app;