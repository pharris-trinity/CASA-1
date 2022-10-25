const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
    national_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mentor: {
        type: Schema.Types.ObjectId, ref: 'Mentor',
        required: false
    },
    members:{
        type: [Schema.Types.ObjectId], ref: 'Members',
        require: true
    },
    coach: {
        type: Schema.Types.ObjectId, ref: 'Coach',
        required: false
    }
})

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;