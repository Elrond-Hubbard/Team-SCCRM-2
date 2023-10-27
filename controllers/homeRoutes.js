const router = require("express").Router();
const path = require("path");
const authCheck = require("../utils/helpers");
const { Doctor, Patient, Vitals } = require("../models/index");

// Get login page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Get home page
router.get("/home", authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
});

// TEST ENDPOINT: IGNORE THIS
router.get("/patsim", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "patsim.html"));
});

module.exports = router;
