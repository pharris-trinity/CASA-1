const mongoose = require('mongoose');
const {Schema} = mongoose;

const ValidationCodeSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    validationType: { //True is coach, false is mentor
        type: Boolean,
        required: true
    }
});

const Validation = mongoose.model('Validation', ValidationCodeSchema);
module.exports = Validation