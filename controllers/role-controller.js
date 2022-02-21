const httpCodes = require('http-status-codes').StatusCodes;
const Roles = require('../models/roles-model');
const logger = require('../error-handler');

exports.getAllRoles = async (req, res) => {
    try {
        let result = await Roles.find()
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            data: result
        })
    } catch (error) {
        return logger.handleError(req, res, error)
    }
}