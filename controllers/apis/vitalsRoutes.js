const router = require('express').Router();
const { Doctor, Patient, Vitals } = require('../../models/index');

// Get all patient vitals
router.get("/", (req, res) => {
  Vitals.findAll().then((data) => res.json(data));
});

// Get one patients vitals
router.get("/:id", (req, res) => {
  Vitals.findOne({ where: { id: req.params.id } }).then((data) =>
    res.json(data)
  );
});

// Update patient vitals EX: http://localhost:3001/api/vitals/1/patient/9/vitals
router.put("/:id/patient/:patient_id/vitals", async (req, res) => {
  try {
    const updatedVitals = await Vitals.update(
      {
        heartRate: req.body.heartRate,
        bloodPressure: req.body.bloodPressure,
        temperature: req.body.temperature,
        patient_id: req.params.patient_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedVitals);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;