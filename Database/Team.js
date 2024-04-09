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
    school: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    rotc: {
        type: Boolean,
        required: true
    },
    mentor: {
        type: Schema.Types.ObjectId, ref: 'Mentor',
        required: false
    },
    members: {
        type: [Schema.Types.ObjectId], ref: 'Members',
        require: false
    },
    alternates: {
        type: [Schema.Types.ObjectId], ref: 'Users',
        require: false
    },
    coach: {
        type: Schema.Types.ObjectId, ref: 'Coach',
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    performance: {
        type: [[Number]],
        required: false
    }
})

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;