const router = require("express").Router();
const loginRoutes = require("./loginRoute");
const apiRoutes = require("./doctorRoutes");

router.use("/login", loginRoutes);
router.use("/doctor", apiRoutes);

module.exports = router;