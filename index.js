//Import all the dependency package
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


//Import Routes
const authRoute = require('./server/routes/auth');
const examRouter = require("./server/routes/examRoute");
const quesRouter = require("./server/routes/questionRoute");
const adminRoute = require("./server/routes/admin");

dotenv.config();

// Connecting to  the Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false 
  },
  console.log('Database Connected Successfully')
);

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

//Route Middlewares
app.use('/api/user', authRoute);
app.use("/api/exam", examRouter);
app.use("/api/question", quesRouter);
app.use("/api/admin", adminRoute);

app.listen(8000, () => console.log('Server up and running'));