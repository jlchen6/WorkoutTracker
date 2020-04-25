const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for the Exercise document.
const ExerciseSchema = new Schema({
    // The type of exercise. Currently should only be "cardio" or "resistance"
    type: {
        type: String,
        required: true
    },
    // The name of the exercise
    name: {
        type: String,
        required: true
    },
    // How long the user did this exercise
    duration: {
        type: Number,
        default: 0
    },
    // weight, reps, and sets only apply if the type is "resistance"
    // weight: how much weight the user lifted/used
    weight: {
        type: Number,
        default: 0
    },
    // reps: How many times the user did the exercise per set
    reps: {
        type: Number,
        default: 0
    },
    // set: how many sets of reps of this exercise the user did
    sets: {
        type: Number,
        default: 0
    },
    // Distance is a field that applies only if the type is "cardio"
    // Distance: How far the user went on their cardio exercise
    distance: {
        type: Number,
        default: 0
    }

})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;