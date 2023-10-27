const Doctor = require("../models/Doctor");

const doctordata = [
  {
    fullName: "Steven Bunde",
    loginID: "1111",
    password: "1",
  },
  {
    fullName: "Chris DeHaan",
    loginID: "2222",
    password: "2",
  },
  {
    fullName: "Campbell Gilliland",
    loginID: "3333",
    password: "3",
  },
  {
    fullName: "Rachel Hochman",
    loginID: "4444",
    password: "4",
  },
  {
    fullName: "Michael Marsolo",
    loginID: "5555",
    password: "5",
  },
];

const seedDoctor = () =>
  Doctor.bulkCreate(doctordata, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedDoctor;
