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
    questions: {
        type: [QuestionSchema],
        required: true
    },
    answers: {
        type: [Number],
        required: true
    },
    authorID: {
        type: Schema.Types.ObjectId, ref: 'authorID',
        required: true
    }
})

const TakenQuizSchema = new Schema({
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
        type: Schema.Types.ObjectId,
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
const TakenQuiz = mongoose.model('TakenQuiz', TakenQuizSchema);
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = {
    Quiz,
    TakenQuiz,
    Question
};