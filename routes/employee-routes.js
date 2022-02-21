const router = require('express').Router();
const employeeCtrl = require('../controllers/employee-controller');

router.get('/', (req, res) => {
    return employeeCtrl.getAllEmployee(req, res)
})

router.post('/', (req, res) => {
    return employeeCtrl.addEmployee(req, res)
})

router.put('/', (req, res) => {
    return employeeCtrl.updateEmployee(req, res)
})

router.delete('/', (req, res) => {
    return employeeCtrl.deleteUser(req, res)
})
module.exports = router