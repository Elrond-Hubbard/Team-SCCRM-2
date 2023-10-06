const router = require("express").Router();
const loginRoutes = require("./loginRoute");
const doctorRoutes = require("./doctorRoutes");

router.use("/login", loginRoutes);
router.use("/doctor", doctorRoutes);

module.exports = router;