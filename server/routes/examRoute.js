const examRouter = require("express").Router();
const Examination = require("../models/examModel");

// Code to register a new user
examRouter.post("/addExam", async (req, res) => {

  //Register a new user
  const examDetails = new Examination({
    examName: req.body.examName
  });

  //Save the new user in mongoDB
  try {
    res.send(await examDetails.save());
  } catch (err) {
    res.send({ message: err });
  }
});

//Show the details of the entire user from the database.
examRouter.get("/examDetails", async (req, res) => {
  //Get the details from the database
  const examDetails = await Examination.find();
  res.send(examDetails);
});



module.exports = examRouter;
