const httpCodes = require('http-status-codes').StatusCodes;
const Employee = require('../models/employee-model');
const Company = require('../models/company-model');
const errorHandler = require('../error-handler');
const Roles = require('../models/roles-model');
const moment = require('moment');

exports.getAllEmployee = async (req, res) => {
    try {
        let result = await Employee.find().select({ __v: 0 }).populate('company', { name: 1 }).populate('role')
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            data: result
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.addEmployee = async (req, res) => {
    try {
        let { company, role, name, joiningDate, department } = req.body
        let companyData = await Company.findOne({ name: { $regex: new RegExp(company, 'i') } })
        if (!companyData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'no company with given name'
            })
        }

        let roleData = await Roles.findOne({ role: { $regex: new RegExp(role, 'i') } })
        if (!roleData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'given role not exist'
            })
        }
        joiningDate = moment(joiningDate, 'DD-MM-YYYY', true)
        if (!joiningDate.isValid()) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'invalid date format: expected format:DD-MM-YYYY'
            })
        }
        await new Employee({
            company: companyData._id, role: roleData._id, name, joiningDate, department
        }).save()
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "employee is added"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        let { _id, company, role, name, joiningDate, department } = req.body

        let employee = await Employee.findById(_id)
        if (!employee) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: "no employee found with id"
            })
        }
        let companyData = await Company.findOne({ name: { $regex: new RegExp(company, 'i') } })
        if (!companyData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'no company with given name'
            })
        }
        joiningDate = moment(joiningDate, 'DD-MM-YYYY')
        if (!joiningDate.isValid()) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'invalid date format: expected format:DD-MM-YYYY'
            })
        }
        let roleData = await Roles.findOne({ role })
        if (!roleData) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'given role not exist'
            })
        }

        await Employee.findByIdAndUpdate(_id, { company:companyData._id, role:roleData._id, name, joiningDate, department })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            data: 'employee data updated'
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.query.id

        let user = await Employee.findById(id)
        if (!user) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: "no employee found with id"
            })
        }
        await Employee.deleteOne({ _id: id })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "employee is deleted"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}