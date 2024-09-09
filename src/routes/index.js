const router = require("express").Router();
const adminroutes = require("./admin");
const vendoRoutes = require("./vendor");

router.use("/admin", adminroutes);
router.use("/vendor",vendoRoutes);
module.exports = router;