const router = require("express").Router();
const { Doctor, Patient, Vitals } = require("../../models/index");

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
        systolic: req.body.systolic,
        diastolic: req.body.diastolic,
        heartRate: req.body.heartRate,
        respRate: req.body.respRate,
        bodyTemp: req.body.bodyTemp,
        O2: req.body.O2,
        patient_id: req.body.patient_id,
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

router.post("/", async (req, res) => {
  try {
    const newVitals = await Vitals.create({
      systolic: req.body.systolic,
      diastolic: req.body.diastolic,
      heartRate: req.body.heartRate,
      respRate: req.body.respRate,
      bodyTemp: req.body.bodyTemp,
      O2: req.body.O2,
      patient_id: req.body.patient_id,
    });
    res.status(200).json(newVitals);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});

module.exports = router;
