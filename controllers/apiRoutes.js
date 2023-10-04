const router = require("express").Router();
const { Doctor, Patient, Vitals } = require("../models/index");

// Get all doctors
router.get("/doctor", (req, res) => {
  Doctor.findAll().then((data) => res.json(data));
});

// Get one doctor
router.get("/doctor/:id", (req, res) => {
  Doctor.findOne({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});

// Get all of current doctor's patients
router.get("/doctor/:id/patient", (req, res) => {
  Patient.findAll({ where: { doctor_id: req.params.id } }).then((data) =>
    res.json(data)
  );
});

// Get one patient for current doctor
router.get("/doctor/:id/patient/:patient_id", (req, res) => {
  Patient.findOne({
    where: {
      doctor_id: req.params.id,
      id: req.params.patient_id,
    },
    include: [Vitals]
  }).then((data) => res.json(data));
});

module.exports = router;
