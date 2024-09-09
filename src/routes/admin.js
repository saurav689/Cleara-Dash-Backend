const router = require("express").Router();
const adminController = require("../controllers/admin.controller");


router.post("/", adminController.createAdmin)

router.post("/login", adminController.adminlogin)

router.post("/staff/login/admin", adminController.StaffLogin)



module.exports = router