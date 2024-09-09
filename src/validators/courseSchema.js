const Joi = require("joi");

module.exports = {
    createCourse: Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        seo_url: Joi.string().required(),
        redirect_url: Joi.string().required(),
        course_category: Joi.string().required(),
        image: Joi.string().required(),
        cover_image: Joi.string().required(),
        pdf_file: Joi.string().required(),
        order_no: Joi.number().required(),
        status: Joi.string().allow("Active", "Inactive").required(),
        popular: Joi.string().required(),
        description: Joi.string().required(),
        course_content: Joi.array().items(
            Joi.object({
                heading: Joi.string().allow(""),
                value: Joi.string().allow("")
            })
        ).optional(),
        course_topic: Joi.array().items(
            Joi.object({
                heading: Joi.string().allow(""),
                value: Joi.string().allow("")
            })
        ).optional(),
        seo_title: Joi.string().required(),
        meta_keyword: Joi.string().required(),
        meta_description: Joi.string().required(),
        meta_section: Joi.string().required(),
        head_css: Joi.string().required(),
        footer_css: Joi.string().required(),
        head_js: Joi.string().required(),
        footer_js: Joi.string().required(),
        contact_email: Joi.string().email().required(),
    })
}