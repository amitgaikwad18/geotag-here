var express  = require("express");
var app      = express();                               
var morgan = require("morgan");            
var bodyParser = require("body-parser");    
var cors = require("cors");
var path = require("path");
 
app.use(morgan("dev"));                                        
app.use(bodyParser.urlencoded({"extended":"true"}));            
app.use(bodyParser.json());                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/plots', (req, res, next) => {

  res.status(201).json({
    message: 'Plot Added Successfully'
  });

});

app.get('/api/plots', (req, res, next) => {

  const plots = [
    {
      id: "123123123",
      plotName: "First Plot"
    },
    {
      id: "3453453453450",
      plotName: "Second Plot  "
    }
  ];

  res.status(200).json({
    message: "Plots Fetched Successfully!",
    plots: plots
  });
}); 
 
app.use(express.static(path.resolve(__dirname, "www")));
// app.set('port', process.env.PORT || 5000);
const port = process.env.PORT || 5000;

// http.createServer(app , function() {}).listen(port);
app.listen(port ,function () {
  console.log("Express server listening on port " + port);
});