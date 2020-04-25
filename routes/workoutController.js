const mongojs = require("mongojs");
var db = require("../models");
var path = require("path");

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            })
    });

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err)
            })
    })

    app.post("/api/workouts", function (req, res) {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.put("/api/workouts/:id", function (req, res) {
        console.log(req.body);
        db.Exercise.create(req.body)
            .then((dbExercise) => {
                return db.Workout.findOneAndUpdate({ _id: mongojs.ObjectId(req.params.id) },
                    {
                        $push: { exercises: dbExercise._id },
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
