const authRouter = require("express").Router();
const User = require("../model/user");

// Code to register a new user
authRouter.post("/register", async (req, res) => {
  //Check for same email address
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email address already exist. Please register with a different email id");

  //Register a new user
  const userDetails = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    balance: (Math.random()* 100000).toFixed(2),
    account: Math.floor(Math.random()* 10000000000)
  });

  //Save the new user in mongoDB
  try {
    res.send(await userDetails.save());
  } catch (err) {
    res.send({ message: err });
  }
});

// Code to login a user
authRouter.post("/login", async (req, res) => {
  //Check for unregistered email
  console.log(req.body);
  const emailRegistered = await User.findOne({ email: req.body.email });
  if (!emailRegistered) return res.send("Email address not found");

  //Check password
  if (!(req.body.password === emailRegistered.password)) {
    return res.send("You have entered a wrong password");
  }

  //Show the output for correct login
  res.send("Login Successfully");
});

//Show the details of the entire user from the database.
authRouter.get("/userDetails", async (req, res) => {
  //Get the details from the database
  const userDetails = await User.find();
  res.send(userDetails);
});

authRouter.patch('/update/:id', async(req, res) => {
  try {
    res.send(await User.updateOne({_id: req.params.id}, {$set:{balance: req.body.balance}}));
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = authRouter;
