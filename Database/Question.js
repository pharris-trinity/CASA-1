const mongoose = require("mongoose");
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    }
})

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;