const httpCodes = require('http-status-codes').StatusCodes;
const Company = require('../models/company-model');
const errorHandler = require('../error-handler');


exports.getAllCompany = async (req, res) => {
    try {
        let result = await Company.find({ deleted: 0 }).select({ _id: 1, name: 1 })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            data: result
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.addCompany = async (req, res) => {
    try {
        let { name } = req.body
        let companyData = await await Company.findOne({ name: { $regex: new RegExp(name, 'i') } })
        if (companyData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                message: 'company with given name already exists'
            })
        }

        await new Company({ name }).save()
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "company is inserted"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.updateCompany = async (req, res) => {
    try {
        let { name, _id } = req.body

        let companyData = await await Company.findOne({ name: { $regex: new RegExp(name, 'i') }, deleted: 0 })
        companyData = companyData ? companyData.length > 0 ? companyData : [companyData] : []
        let isExist = companyData.some(ele => ele._id != _id)

        if (isExist) {
            return res.status(httpCodes.BAD_REQUEST).json({
                message: 'company with given name already exists'
            })
        }

        await Company.findByIdAndUpdate({ _id }, { name }, { upsert: false })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "company is updated"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}


exports.deleteCompany = async (req, res) => {
    try {
        let name = req.query.company

        let companyData = await Company.findOne({ name: { $regex: new RegExp(name, 'i') } })
        if (!companyData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                message: 'company with given name does not exists'
            })
        }

        await Company.findByIdAndUpdate({ _id: companyData._id }, { deleted: 1 }, { upsert: false })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "company is deleted"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}