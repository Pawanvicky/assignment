const mongoose = require("mongoose");

//Schema to store the user details in the database
const exam = mongoose.Schema({
    examName: {
        type: "String",
        required: true
    }
});

module.exports = mongoose.model("Examination", exam);
