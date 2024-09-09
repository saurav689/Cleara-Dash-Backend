const helperUtils = require("../utils/helper")
const { ERROR_MSG } = require("../utils/const");
const db = require("../utils/mongooseMethods")
const models = require("../utils/modelName")
const constants = require("../utils/const")
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createEditVendor = async (req, res) => {
    console.log("req body",req.body);
    const {email} = req?.body?.email
    try {
        console.log("email",req.body.email);
        if (!req?.body?._id){
            //check same availability of vendor
            let vendor = await db.findOne({ collection: models.Vendor, query: { email: req?.body?.email} })
            if (vendor) {
                res.send(helperUtils.error("Vendor already available", {}));
                return
            }
            const salt = await bycrypt.genSalt(10);
            req.body.password = await bycrypt.hash(req.body.password, salt);
            req.body.email = req?.body?.email.toLowerCase();
            //create new vendor
            let input = {
                collection: models.Vendor,
                document: req.body
            }
            let newVendor = await db.insertOne(input)
            res.send(helperUtils.success("Vendor created successfully", newVendor))
            return
        } else {
            //first vendor available in system
            let vendor = await db.findOne({
                collection: models.Vendor,
                query: { _id: req.body._id }
            });
            if (!vendor) {
                res.send(helperUtils.error("vendor Not Found", {}));
                return;
            }
            let updateVendor = await db.findOneAndUpdate({
                collection: models.Vendor,
                query: { _id: req.body._id },
                update: req.body,
                options: { new: true }
            })
            res.send(helperUtils.success("Successfully updated", updateVendor));
            return
        }
        res.send(helperUtils.success("Vendor created Successfully"));
        return;
    } catch (error) {
        helperUtils.errorRes(res, "Internal Server Error", {}, 400)
        return
    }
}

exports.getVendorById = async (req, res) => {
    try {
        let vendorObj = await db.findOne({
            collection: models.Vendor,
            query: { _id: req.params.id },
        })
        res.send(helperUtils.success("Vendor gets successfully", vendorObj));
        return
    } catch (error) {
        return res.send(helperUtils.error(ERROR_MSG, error.message));
    }
}

exports.vendorList = async (req, res) => {
    try {
        let query = {isDel: false}
        if (req.body.search) {
            query.$or = [
              { fname: { $regex: req.body.search, $options: 'i' } },
              { email: { $regex: req.body.search, $options: 'i' } }
            ];
          }
        let result = await db.paginate({
            collection: models.Vendor,
            query: query,
            options: {
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { _id: 1 }
            }
        })
        res.send(helperUtils.success("Get Vendor list Successfully", result));
        return
    } catch (error) {
        res.send(helperUtils.error(ERROR_MSG, error.message));
        return;
    }
}

exports.deleteVendor = async (req, res) => {
    console.log("vendor is not defined",res)
    try {
        let vendor = await db.findOne({
            collection: models.Vendor,
            query: { _id: req.params.id }
        });
        if (!vendor) {
            res.send(helperUtils.error("Vendor Not Found", {}));
            return;
        }
        await db.deleteOne({
            collection: models.Vendor,
            query: { _id: req.params.id },

        })
        res.send(helperUtils.success("Vendor deleted successfully", {}));
        return
    } catch (error) {
        return res.send(helperUtils.error(ERROR_MSG, error.message));

    }
}

exports.vendorDropDown = async (req, res) => {
    try {
        let query = {};
        if(req.user.role !== "Super Admin"){
            let user = await db.findOne({
              collection: models.User,
              query: { _id:req.user._id },
              project: "cityname",
            })
            if(!user?.cityname){
              res.send(helperUtils.error(ERROR_MSG, "Staff not exist"))
              return;
            }
            query._id =  user?.cityname;
          }
        let cities = await db.find({
            collection: models.City,
            query: query,
            options:{
                sort: { cityname : 1 }
            }
        })
        if (!cities) {
            return res.status(400).send(helperUtils.error("No Record Found", {}, 400))
        }
        cities = cities.map(city => ({
            label: city.cityname,
            value: city._id
        }));
        res.send(helperUtils.success("Successfully get category list", cities))
        return;
    } catch (error) {
        return res.send(helperUtils.error(ERROR_MSG, error.message));
    }
}