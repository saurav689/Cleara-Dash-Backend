const router = require("express").Router();
const {auth} = require("../middleware/auth")
const vendorController = require("../controllers/vendor.controller");

router.post("/", auth,vendorController.createEditVendor); 

router.post("/list", auth,vendorController.vendorList);

router.get("/byid/:id", auth, vendorController.getVendorById);

router.delete("/:id",auth, vendorController.deleteVendor);

router.get("/dropdown",auth,vendorController.vendorDropDown);


module.exports = router