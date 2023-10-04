const Doctor = require("./Doctor");
const Patient = require("./Patient");
const Vitals = require("./Vitals");

Patient.belongsTo(Doctor, { foreignKey: "doctor_id" });
Doctor.hasMany(Patient, { foreignKey: "doctor_id" });

Vitals.belongsTo(Patient, { foreignKey: "patient_id" });
Patient.hasMany(Vitals, { foreignKey: "patient_id" });

module.exports = { Doctor, Patient, Vitals };
