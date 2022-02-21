const mongoose = require('../db-con');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deleted: {
        type: Number,
        default: 0
    }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;