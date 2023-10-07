const router = require("express").Router();
const loginRoutes = require("./loginRoute");
const doctorRoutes = require("./doctorRoutes");
const patientRoutes = require("./patientRoutes");
const vitalsRoutes = require("./vitalsRoutes");

router.use("/login", loginRoutes);
router.use("/doctor", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/vitals", vitalsRoutes);

module.exports = router;