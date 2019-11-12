// require library modules
const express = require("express"); // server
const dotenv = require("dotenv"); // environment variables loader
const bodyParser = require("body-parser"); // body parser for body form data
const fileupload = require("express-fileupload"); // file parser for file form data
const path = require("path"); // require for manage path
const cors = require("cors"); // cors is used to manage file encoding type

// require database connection helper module
const connectDB = require("./config/db");

// require cloud connection helper module
const connectCloud = require("./config/cloud");

// require routes
const product = require("./routes/api/product");

// load environment variables
dotenv.config({ path: "./config/config.env" });

// connect to Database
connectDB();

// connect to cloud
connectCloud();

// create node as server
const app = express();

// use body-parser to parse form data as json object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use express-fileupload to parse file form data as json object
app.use(fileupload({ useTempFiles: true }));
app.use(cors());

// use routes
app.use("/api/product", product);

// production level module
const env = process.env.NODE_ENV;
if (env.localeCompare("production") === 1) {
  // only run this portion in production level i.e. after deployment
  express.static(path.join(__dirname, "../frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

// run the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
