const Doctor = require("../models/Doctor");

const doctordata = [
  {
    fullName: "sBunde",
    password: "1",
  },
  {
    fullName: "cDehaan",
    password: "2",
  },
  {
    fullName: "cGilliand",
    password: "3",
  },
  {
    fullName: "rHochman",
    password: "4",
  },
  {
    fullName: "eHubbard",
    password: "5",
  },
];

const seedDoctor = () => Doctor.bulkCreate(doctordata);

module.exports = seedDoctor;
