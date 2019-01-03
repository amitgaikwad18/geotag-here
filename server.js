var express  = require('express');
var app      = express();                               
var morgan = require('morgan');            
var bodyParser = require('body-parser');    
var cors = require('cors');
var path = require('path');
 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.use(express.static(path.resolve(__dirname, "www")));
// app.set('port', process.env.PORT || 5000);
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', function () {
  console.log('Express server listening on port ' + PORT);
});