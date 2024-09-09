const mongoose = require("mongoose")
const mongoosepaginate = require("mongoose-paginate-v2")

const VendorSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    password:{type:String},
    vendorphone: { type: String },
    service: [{ type: String }],
    vendorstatus: { type: String },
    isDel: { type: Boolean, default: false }
}, { timestamps: true, strict: true })

VendorSchema.plugin(mongoosepaginate);

exports.VendorSchema = VendorSchema;