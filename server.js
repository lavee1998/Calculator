const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const calculatorRoutes = express.Router();
let Number = require("./models/number.model");
require("dotenv").config();

const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const numberRouter = require("./routes/number");

app.use("/number", numberRouter);


//for heroku
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
