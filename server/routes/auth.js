const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  console.log("Register Called", req.body);
  // Lets validate the data
  const {error} = registerValidation(req.body);
  if (error) console.log("error =>", error);
  if (error) return res.send(error.details[0].message);
  
  // Check if the user is already in the DB
  const emailExist = await User.findOne({ email: req.body.email });
  if(emailExist) return res.send('Email already exists');

  // Check if the username is available
  const usernameExist = await User.findOne({ username: req.body.username });
  if(usernameExist) return res.send('Username already taken, Choose Another!');

  // Check if the username is available
  const contactExist = await User.findOne({ contact: req.body.contact });
  if(contactExist) return res.send('Invalid Entry!');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // Create a new user
  const user = new User({
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    userrole: req.body.userrole,
    status: req.body.status  
  });
  try {
    res.status(200);
    const savedUser = await user.save();
    res.send({user: savedUser});
  } catch(err) {
    res.send({ message: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  // Lets validate the data
  const {error} = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);
  
  // Check if the Username exists in the DB
  const user = await User.findOne({ username: req.body.username });
  if(!user) return res.send('User Name not found!');
 
  // Password verification
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.send('Invalid Password!');

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(user);

});

module.exports = router;