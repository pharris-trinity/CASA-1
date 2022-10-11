const mongoose = require("mongoose");
const { Schema } = mongoose;

const Question = require("./Question")

const QuizSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    questions: {
        type: [Question],
        required: true
    },
    correctAnswers: {
        type: [Number],
        required: true
    },
    incorrectAnswers: {
        type: [Number],
        required: true
    },
    testTakerID: {
        type: Number,
        required: true
    },
    timeStarted: {
        type: Date,
        required: true
    },
    timeFinished: {
        type: Date,
        required: true
    }
})

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;