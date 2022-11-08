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
    members: {
        type: [Schema.Types.ObjectId], ref: 'Members',
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
    }
})

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;