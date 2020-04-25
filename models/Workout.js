const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema to define a Workout document
const WorkoutSchema = new Schema({
    // What day the user did the exercise. Defaults to the current date
    day: {
        type: Date,
        default: Date.now
    },
    // What exercises the user did for this workout. An array of Exercises. 
    // References the Exercise document in the same database.
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
    // The total duration of all exercises in this workout.
    totalDuration: {
        type: Number,
        default: 0
    }

})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;