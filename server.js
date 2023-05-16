var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var http = require("http");
var path = require("path");
var cors = require("cors");
// var jwt = require("jsonwebtoken");

/*Internal dependencies*/
var config = require("./config");

/*Express Server config*/

/*API routes*/
const api = require("./routes/route");


var port = process.env.PORT || 3000;
// mongoose.connect(config.database, { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*Enable cors origin*/
var corsOptions = {

    origin: "http://localhost:8000/",
    optionsSuccessStatus: 200
  };
  app.use(cors());

  
  /* use morgan to log requests to the console & file */
  app.use(morgan("dev"));
  //var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {flags: 'a'})
  //app.use(morgan('combined', {stream: accessLogStream}))
  
  /* static path to dist/src */
  app.use(express.static(path.join(__dirname, "dist")));
  
  app.use("/api", api);
  
  app.get("/", function(req, res) {
    res.send("END POINT URL : localhost:3000/api");
  });
  
  var server = http.createServer(app);
  
  server.listen(port, () => console.log(`API running on localhost:${port}`));
  
  server.timeout = 5400000;
  