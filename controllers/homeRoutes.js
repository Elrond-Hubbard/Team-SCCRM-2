const router = require("express").Router();
const path = require('path')
const { Doctor, Patient, Vitals } = require("../models/index");

// Get homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Get login page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
});

module.exports = router;
