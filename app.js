const express = require("express");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const bodyParser = require("body-parser");
const mainRoute = require("./routes/route");
const connectToMongo = require("./database");
const fileUpload = require("express-fileupload");
connectToMongo();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Api is working perfectly.",
  });
});
const Port = 3000;
app.listen(Port, () => {
  console.log(`Port is active at localhost:${Port}`);
});

app.use(
  "/api",
  mainRoute,
);
