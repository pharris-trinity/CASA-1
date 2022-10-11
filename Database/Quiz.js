const mongoose = require("mongoose");
const { Schema } = mongoose;

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
});

const QuizSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    questions: {
        type: [QuestionSchema],
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


const Question = mongoose.model('Question', QuestionSchema);
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = {
    Quiz,
    Question
};