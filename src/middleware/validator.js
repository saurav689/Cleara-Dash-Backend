const HelperUtils = require('../utils/helper')

module.exports = (type, schema) => (req, res, next) => {
    if (!schema || !schema.validate) {
        return res.send(response.error('Invalid schema', {}, 500))
    }

    console.log('validation payload: ', type, req[type])

    const { error } = schema.validate(req[type])
    if (error) return res.send(HelperUtils.validation(HelperUtils.JoiParseError(error)))
    next()
}
