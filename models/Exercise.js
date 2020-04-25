const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number,
        default: 0
    }

})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;