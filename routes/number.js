const router = require("express").Router();
let Number = require("../models/number.model");
const path = require("path");

router.route("/").get((req, res) => {
  Number.find()
    .then((number) => res.json(number))
    .catch((err) => {res.status(400).json("Error: " + err)});
});

router.route("/:id").get((req, res) => {
  Number.findOne({ id: req.params.id })
    .then((number) => res.json(number))
    .catch((err) => {res.status(400).json("Error: " + err)});
});

router.route("/update/:id").post((req, res) => {
  Number.findOne({ id: req.params.id })
    .then((number) => {
      number.value = req.body.value;

      number
        .save()
        .then(() => res.json("Number updated!"))
        .catch((err) => {res.status(400).json("Error: " + err)});
    })
    .catch((err) => {res.status(400).json("Error: " + err)});
});

router.route("/add").post((req, res) => {
  const id = req.body.id;
  const value = req.body.value;

  const newNumber = new Number({ id, value });

  newNumber
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => {res.status(400).json("Error: " + err)});
});

module.exports = router;
