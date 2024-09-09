const Joi = require("joi");


module.exports = {
    createEditCenter: Joi.object({
        title: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        seo_url: Joi.string().required(),
        meta_title: Joi.string().required(),
        meta_keyword: Joi.string().required(),
        meta_description: Joi.string().required(),
        meta_section: Joi.string().required(),
        head_css: Joi.string().required(),
        footer_css: Joi.string().required(),
        head_js: Joi.string().required(),
        footer_js: Joi.string().required(),
        order_no: Joi.number().required(),
        status: Joi.string().required(),
        remark: Joi.string().required(),
    })
}