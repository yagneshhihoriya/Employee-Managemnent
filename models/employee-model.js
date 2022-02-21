const mongoose = require('../db-con');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref:'Roles'
    },
    joiningDate: {
        type: Date,
    },
    department: {
        type: String
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref:'Company'
    }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;