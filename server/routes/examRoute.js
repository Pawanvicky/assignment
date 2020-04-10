const examRouter = require("express").Router();
const Examination = require("../models/examModel");

// Code to register a new exam
examRouter.post("/addExam", async (req, res) => {

  //Check for same exam 
  const examExist = await Examination.findOne({ examName: req.body.examName });
  if (examExist) return res.send("This exam already exist. Please add a different exam");


  //Register a new exam
  const examDetails = new Examination({
    examName: req.body.examName
  });

  //Save the new exam in mongoDB
  try {
    res.send(await examDetails.save());
  } catch (err) {
    res.send({ message: err });
  }
});

//Show the details of the entire exam from the database.
examRouter.get("/examDetails", async (req, res) => {
  //Get the details from the database
  const examDetails = await Examination.find();
  res.send(examDetails);
});

//Delete a exam
examRouter.delete('/:id', async(req, res) => { 
  try {
    res.send(await Examination.deleteOne({_id: req.params.id}));
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = examRouter;
