const Vitals = require("../models/Vitals");

const vitalsdata = [];

// A random number is generated within a defined range
function rng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// edit i < x to change number of generated entries
for (let i = 0; i < 45; i++) {
  const entry = {
    systolic: rng(90, 140),
    diastolic: rng(60, 90),
    heartRate: rng(60, 100),
    respRate: rng(12, 20),
    bodyTemp: parseFloat((Math.random() * (97.0 - 99.0) + 97.0).toFixed(1)),
    O2: rng(90, 100),
    patient_id: rng(1, 15),
  };
  vitalsdata.push(entry);
}

const seedVitals = () => Vitals.bulkCreate(vitalsdata);

module.exports = seedVitals;
