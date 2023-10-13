const router = require("express").Router();
const path = require('path')
const authCheck = require('../../utils/helpers')
const { Doctor, Patient, Vitals } = require("../../models/index");

// Get all patients using path /api/patient
router.get("/", authCheck, (req, res) => {
    Patient.findAll().then((data) => res.json(data));
  });
  
  // Get one patient using api/patient/:id
  router.get("/:id", authCheck, (req, res) => {
    Patient.findOne({ where: { id: req.params.id }, include: [Vitals] }).then((data) =>
      res.json(data)
    );
  });
  
  // Create new patient using api/patient
  router.post("/", async (req, res) => {
    try {
      const newPatientData = req.body

      const newPatient = await Patient.create({
        firstName: newPatientData.firstName,
        lastName: newPatientData.lastName,
        age: newPatientData.age,
        weight: newPatientData.weight,
        doctor_id: newPatientData.doctor_id,
        systolic: newPatientData.systolic,
        diastolic: newPatientData.diastolic,
        heartRate: newPatientData.heartRate,
        bodyTemp: newPatientData.bodyTemp,
        O2: newPatientData.O2,
      });

      // const newVitals = await Vitals.create({
      //   patient_id: newPatient.id,
      //    firstName: newPatientData.firstName,
      //    lastName: newPatientData.lastName,
      //    age: newPatientData.age,
      //    weight: newPatientData.weight,
      //    doctor_id: newPatientData.doctor_id,
      //    systolic: newPatientData.systolic,
      //    diastolic: newPatientData.diastolic,
      //    heartRate: newPatientData.heartRate,
      //    bodyTemp: newPatientData.bodyTemp,
      //    O2: newPatientData.O2,
    // })
      res.status(200).json(newPatient);
      // res.status(200).json(newVitals);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
  // Update patient info using api/patient/:id
  router.put("/:id", async (req, res) => {
    try {
      const updatedPatient = await Patient.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          weight: req.body.weight,
          doctor_id: req.body.doctor_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(updatedPatient);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // Delete patient using api/patient/:id
  router.delete("/:id", async (req, res) => {
    try {
      const deletedPatient = await Patient.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deletedPatient);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
