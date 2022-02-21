const mongoose = require('../db-con');

const RolesSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
});

const Roles = mongoose.model("Roles", RolesSchema);

module.exports = Roles;