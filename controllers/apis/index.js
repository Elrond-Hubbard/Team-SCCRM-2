const router = require("express").Router();
const loginRoutes = require("./loginRoute");
const doctorRoutes = require("./doctorRoutes");
const patientRoutes = require("./patientRoutes");

router.use("/login", loginRoutes);
router.use("/doctor", doctorRoutes);
router.use("/patient", patientRoutes);

module.exports = router;