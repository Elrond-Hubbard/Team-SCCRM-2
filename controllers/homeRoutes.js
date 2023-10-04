const router = require("express").Router();
const { Doctor, Patient, Vitals } = require("../models/index");

// Get homepage
router.get("/home", (req, res) => {
  res.send("HOMEPAGE");
});

// Get login page
router.get("/login", (req, res) => {
  res.send("LOGIN");
});

module.exports = router;
