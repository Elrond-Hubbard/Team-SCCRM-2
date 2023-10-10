const Patient = require("../models/Patient");

const newPatientForm = {}

const createNewPatient = () => Patient.create(newPatientForm)

module.exports = createNewPatient