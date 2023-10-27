const sequelize = require("../config/connection");
const seedDoctor = require("./doctorData");
const seedPatient = require("./patientData");
const seedVitals = require("./vitalsData");

const seedAll = async () => {
  await sequelize.sync();
  await seedDoctor();
  await seedPatient();
  await seedVitals();
  console.log("DATABASE SEEDED");
  process.exit(0);
};

seedAll();

//Patient data to be parsed for doctors to see, doctors will not see all info, only parsed data//
// Array of patient data with assigned street addresses, phone numbers, and emails
// const patients = [
//     {
//       firstName: "John",
//       lastName: "Doe",
//       age: 35,
//       weight: 175,
//       comment: "",
//       doctor_id: 1,
//       address: "123 Main Street, Cityville, CA",
//       phoneNumber: "555-123-4567",
//       email: "john.doe@gmail.com",
//     },
//     {
//       firstName: "Jane",
//       lastName: "Smith",
//       age: 28,
//       weight: 150,
//       comment: "",
//       doctor_id: 2,
//       address: "456 Elm Avenue, Townsville, NY",
//       phoneNumber: "555-987-6543",
//       email: "jane.smith@yahoo.com",
//     },
//     {
//       firstName: "Michael",
//       lastName: "Johnson",
//       age: 42,
//       weight: 200,
//       comment: "",
//       doctor_id: 3,
//       address: "789 Oak Street, Villageton, TX",
//       phoneNumber: "555-555-5555",
//       email: "michael.johnson@outlook.com",
//     },
//     {
//       firstName: "Emily",
//       lastName: "Brown",
//       age: 31,
//       weight: 140,
//       comment: "",
//       doctor_id: 4,
//       address: "101 Maple Lane, Hamletville, FL",
//       phoneNumber: "555-111-2222",
//       email: "emily.brown@example.com",
//     },
//     {
//       firstName: "David",
//       lastName: "Lee",
//       age: 50,
//       weight: 190,
//       comment: "",
//       doctor_id: 5,
//       address: "246 Pine Road, Cityville, CA",
//       phoneNumber: "555-333-4444",
//       email: "david.lee@gmail.com",
//     },
//     {
//       firstName: "Sarah",
//       lastName: "Wilson",
//       age: 26,
//       weight: 135,
//       comment: "",
//       doctor_id: 1,
//       address: "777 Oak Avenue, Townsville, NY",
//       phoneNumber: "555-777-8888",
//       email: "sarah.wilson@yahoo.com",
//     },
//     {
//       firstName: "Matthew",
//       lastName: "Anderson",
//       age: 38,
//       weight: 180,
//       comment: "",
//       doctor_id: 2,
//       address: "555 Elm Street, Villageton, TX",
//       phoneNumber: "555-222-3333",
//       email: "matthew.anderson@outlook.com",
//     },
//     {
//       firstName: "Olivia",
//       lastName: "Taylor",
//       age: 29,
//       weight: 155,
//       comment: "",
//       doctor_id: 3,
//       address: "222 Pine Avenue, Hamletville, FL",
//       phoneNumber: "555-444-5555",
//       email: "olivia.taylor@example.com",
//     },
//     {
//       firstName: "Christopher",
//       lastName: "Martinez",
//       age: 45,
//       weight: 205,
//       comment: "",
//       doctor_id: 4,
//       address: "444 Maple Road, Cityville, CA",
//       phoneNumber: "555-666-7777",
//       email: "christopher.martinez@gmail.com",
//     },
//     {
//       firstName: "Ava",
//       lastName: "Garcia",
//       age: 33,
//       weight: 160,
//       comment: "",
//       doctor_id: 5,
//       address: "333 Oak Lane, Townsville, NY",
//       phoneNumber: "555-999-0000",
//       email: "ava.garcia@yahoo.com",
//     },
//     {
//       firstName: "Ethan",
//       lastName: "Harris",
//       age: 27,
//       weight: 145,
//       comment: "",
//       doctor_id: 1,
//       address: "999 Elm Road, Villageton, TX",
//       phoneNumber: "555-000-1111",
//       email: "ethan.harris@outlook.com",
//     },
//     {
//       firstName: "Sophia",
//       lastName: "Clark",
//       age: 39,
//       weight: 185,
//       comment: "",
//       doctor_id: 2,
//       address: "777 Pine Street, Hamletville, FL",
//       phoneNumber: "555-123-4567",
//       email: "sophia.clark@example.com",
//     },
//     {
//       firstName: "Liam",
//       lastName: "Miller",
//       age: 30,
//       weight: 155,
//       comment: "",
//       doctor_id: 3,
//       address: "888 Oak Road, Cityville, CA",
//       phoneNumber: "555-987-6543",
//       email: "liam.miller@gmail.com",
//     },
//     {
//       firstName: "Mia",
//       lastName: "Davis",
//       age: 47,
//       weight: 210,
//       comment: "",
//       doctor_id: 4,
//       address: "666 Maple Avenue, Townsville, NY",
//       phoneNumber: "555-555-5555",
//       email: "mia.davis@yahoo.com",
//     },
//     {
//       firstName: "Noah",
//       lastName: "Wilson",
//       age: 32,
//       weight: 165,
//       comment: "",
//       doctor_id: 5,
//       address: "123 Elm Lane, Villageton, TX",
//       phoneNumber: "555-111-2222",
//       email: "noah.wilson@outlook.com",
//     },
//     // Add more patient objects here with the same structure
//   ];

//   console.log(patients); //
