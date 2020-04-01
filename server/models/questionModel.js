const mongoose = require("mongoose");

//Schema to store the user details in the database
const question = mongoose.Schema({
    examId: {
        type: "String",
        required: true
    },
    quesDesc: {
        type: "String",
        required: true
    },
    option1: {
        type: "String",
        required: true
    },
    option2: {
        type: "String",
        required: true
    },
    option3: {
        type: "String",
        required: true
    },
    option4: {
        type: "String",
        required: true
    },
    answer: {
        type: "String",
        required: true
    }
});

module.exports = mongoose.model("QuestionBank", question);
