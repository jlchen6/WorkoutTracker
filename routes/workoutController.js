const mongojs = require("mongojs");
var db = require("../models");
var path = require("path");

module.exports = function (app) {
    // Set up route to get all workouts
    app.get("/api/workouts", function (req, res) {
        // Select all workouts from the database
        db.Workout.find({})
            // populate the "exercises" field with data from the Exercise document
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            })
    });

    // Set up route to get all workouts within a certain range?
    // Unsure of the exact range wanted. For now, just returning all workouts
    app.get("/api/workouts/range", function (req, res) {
        // Select all workouts from the database
        db.Workout.find({})
            // populate the "exercises" field with data from the Exercise document
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err)
            })
    })

    // Route to add a new workout
    app.post("/api/workouts", function (req, res) {
        // Adds a new workout to the Workout document using data from req.body
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err)
            })
    });

    // route to add a new exercise to the given workout
    app.put("/api/workouts/:id", function (req, res) {
        console.log(req.body);
        // Creates a new exercise using the data from req.body
        db.Exercise.create(req.body)
            .then((dbExercise) => {
                // Adds the newly created exercise to the Workout with the given id.
                return db.Workout.findOneAndUpdate({ _id: mongojs.ObjectId(req.params.id) },
                    {
                        // Adds the new exercise to the exercises field
                        $push: { exercises: dbExercise._id },
                        // increments the totalDuration by the duration of the new exercise
                        $inc: {totalDuration: dbExercise.duration}
                    })
            })
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.log(err)
                res.json(err);
            })
    });

    // HTML routes
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};
