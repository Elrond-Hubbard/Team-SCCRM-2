const Doctor = require("../models/Doctor");

const doctordata = [
  {
    fullName: "sBunde",
    loginID: "1111",
    password: "1",
  },
  {
    fullName: "cDehaan",
    loginID: "2222",
    password: "2",
  },
  {
    fullName: "cGilliand",
    loginID: "3333",
    password: "3",
  },
  {
    fullName: "rHochman",
    loginID: "4444",
    password: "4",
  },
  {
    fullName: "eHubbard",
    loginID: "5555",
    password: "5",
  },
];

const seedDoctor = () => Doctor.bulkCreate(doctordata, {
  individualHooks: true,
  returning: true
});

module.exports = seedDoctor;
