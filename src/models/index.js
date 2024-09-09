const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { UserSchema } = require("./user")
const {VendorSchema}  = require("./vendor")

const dbModels = {
    User: mongoose.model(models.User, UserSchema),
    Vendor:mongoose.model(models.Vendor,VendorSchema)
}


module.exports = dbModels