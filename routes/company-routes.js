const router = require('express').Router();
const companyCtrl = require('../controllers/company-controller');

router.get('/', (req, res) => {
    return companyCtrl.getAllCompany(req, res)
})

router.post('/', (req, res) => {
    return companyCtrl.addCompany(req, res)
})

router.put('/', (req, res) => {
    return companyCtrl.updateCompany(req, res)
})

router.delete('/', (req, res) => {
    return companyCtrl.deleteCompany(req, res)
})
module.exports = router