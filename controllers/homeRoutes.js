const router = require("express").Router();
const path = require('path')
const { Doctor, Patient, Vitals } = require("../models/index");

// Get homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Get login page
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
});

// TEST ENDPOINT: IGNORE THIS
router.get("/patsim", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "patsim.html"));
});

module.exports = router;
