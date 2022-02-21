
const router = require('express').Router();
const companyRoutes = require('./company-routes');
const employeeRoutes = require('./employee-routes');
const rolesRoutes = require('./roles-routes');

router.use('/company', companyRoutes)
router.use('/employee', employeeRoutes)
router.use('/role', rolesRoutes)

module.exports = router