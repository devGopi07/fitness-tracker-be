var express = require("express");
var router = express.Router();
const { dbUrl } = require("../common/dbConfig");
const { DatasModel } = require("../schemas/datasSchema");
const mongoose = require("mongoose");
const { validate } = require("../common/auth");
const jwt = require("jsonwebtoken");

mongoose.connect(dbUrl);

/* GET home page. */

//createWorkout
router.post("/createWorkout", async (req, res) => {
  try {
    let tokenn = await jwt.decode(req.body.email);
    console.log(tokenn.email);

    req.body.email = tokenn.email;
    let data = await DatasModel.create(req.body);
    res.status(200).send({ message: "Workout Created Successfully", data });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//getAllWorkouts
router.post("/getAllWorkouts", async (req, res) => {
  try {
    let tokenn = await jwt.decode(req.body.email);
    console.log(tokenn.email);
    req.body.email = tokenn.email;

    let data = await DatasModel.find({ email: req.body.email });
    res
      .status(200)
      .send({ message: "Workout Datas Fetched Successfully", data });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//deleteWorkout
router.delete("/deleteWorkout/:id", async (req, res, next) => {
  try {
    let user = await DatasModel.findOne({ _id: req.params.id });
    if (user) {
      let data = await DatasModel.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: "Workout Deleted Successfully", data });
    } else {
      res.status(403).send({ message: "User Doesn't Exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Errors", error });
  }
});

module.exports = router;
