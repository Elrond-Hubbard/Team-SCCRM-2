const Patient = require("../models/Patient");

const patientdata = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 35,
        weight: 175,
        comment: "",
        doctor_id: 1
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        age: 28,
        weight: 150,
        comment: "",
        doctor_id: 2
      },
      {
        firstName: "Michael",
        lastName: "Johnson",
        age: 42,
        weight: 200,
        comment: "",
        doctor_id: 3
      },
      {
        firstName: "Emily",
        lastName: "Brown",
        age: 31,
        weight: 140,
        comment: "",
        doctor_id: 4
      },
      {
        firstName: "David",
        lastName: "Lee",
        age: 50,
        weight: 190,
        comment: "",
        doctor_id: 5
      },
      {
        firstName: "Sarah",
        lastName: "Wilson",
        age: 26,
        weight: 135,
        comment: "",
        doctor_id: 1
      },
      {
        firstName: "Matthew",
        lastName: "Anderson",
        age: 38,
        weight: 180,
        comment: "",
        doctor_id: 2
      },
      {
        firstName: "Olivia",
        lastName: "Taylor",
        age: 29,
        weight: 155,
        comment: "",
        doctor_id: 3
      },
      {
        firstName: "Christopher",
        lastName: "Martinez",
        age: 45,
        weight: 205,
        comment: "",
        doctor_id: 4
      },
      {
        firstName: "Ava",
        lastName: "Garcia",
        age: 33,
        weight: 160,
        comment: "",
        doctor_id: 5
      },
      {
        firstName: "Ethan",
        lastName: "Harris",
        age: 27,
        weight: 145,
        comment: "",
        doctor_id: 1
      },
      {
        firstName: "Sophia",
        lastName: "Clark",
        age: 39,
        weight: 185,
        comment: "",
        doctor_id: 2
      },
      {
        firstName: "Liam",
        lastName: "Miller",
        age: 30,
        weight: 155,
        comment: "",
        doctor_id: 3
      },
      {
        firstName: "Mia",
        lastName: "Davis",
        age: 47,
        weight: 210,
        comment: "",
        doctor_id: 4
      },
      {
        firstName: "Noah",
        lastName: "Wilson",
        age: 32,
        weight: 165,
        comment: "",
        doctor_id: 5
      }
]

const seedPatient = () => Patient.bulkCreate(patientdata);

module.exports = seedPatient;