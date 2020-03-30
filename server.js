//Import all the dependency package
const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require("./backEnd/route/auth");

//Use the packages
const app = express();
dotEnv.config();

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use("/api/user", authRouter);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Database is connected");
  }
);

//Start a server
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
