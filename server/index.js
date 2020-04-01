//Import all the dependency package
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const adminRoute = require('./routes/admin');

dotenv.config();

//Connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log('DB Connected')
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
app.use('/api/posts', postRoute);
app.use('/api/admin', adminRoute);

app.listen(8000, () => console.log('Server up and running'));