const HelperUtils = require("../utils/helper");
exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return (HelperUtils.errorRes(res, "Access Denied No Token Found", {}, 401));
        let payload = await HelperUtils.jwtVerify(token)
        if (!payload) return (HelperUtils.errorRes(res, "Invalid Auth token", {}, 401));
        req.user = payload
        next()
    } catch (error) {
        console.log(error);
        return HelperUtils.errorRes(res, "Invalid Token", {}, 401)
    }
}

exports.superAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        // console.log('token',token);
        if (!token) return (HelperUtils.errorRes(res, "Access Denied No Token Found", {}, 401));
        let payload = await HelperUtils.jwtVerify(token)
        // console.log("payload",payload)
        if (!payload) return (HelperUtils.errorRes(res, "Invalid Auth token", {}, 401));
        if(payload.role == 'Super Admin'){
            req.user = payload
            next()
        }
        else{
            return (HelperUtils.errorRes(res, "Access Denied For Super Admin", {}, 401));
        }
        
    } catch (error) {
        console.log(error);
        return HelperUtils.errorRes(res, "Invalid Token", {}, 401)
    }
}