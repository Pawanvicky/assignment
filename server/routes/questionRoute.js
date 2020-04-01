const quesRouter = require("express").Router();
const Question = require("../models/questionModel");

// Code to register a new user
quesRouter.post("/addQuestion", async (req, res) => {

  //Register a new user
  const quesDetails = new Question({
    examId: req.body.examId,
    quesDesc: req.body.quesDesc,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
  });

  //Save the new user in mongoDB
  try {
    res.send(await quesDetails.save());
  } catch (err) {
    res.send({ message: err });
  }
});

//Show the details of the entire user from the database.
quesRouter.get("/quesDetails/:id", async (req, res) => {
  //Get the details from the database
  const quesDetails = await Question.find({examId: req.params.id});
  res.send(quesDetails);
});



module.exports = quesRouter;
