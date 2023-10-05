const sequelize = require("../config/connection");
const seedDoctor = require('./doctorData');
const seedPatient = require('./patientData');
const seedVitals = require('./vitalsData');

const seedAll = async () => {
  await sequelize.sync();
  await seedDoctor();
  await seedPatient();
  await seedVitals();
  console.log('DATABASE SEEDED')
  process.exit(0);
}

seedAll();

  