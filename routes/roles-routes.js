const router = require('express').Router();
const rolesCtrl = require('../controllers/role-controller');

router.get('/', (req, res) => {
    return rolesCtrl.getAllRoles(req, res)
})

router.post('/', (req, res) => {
    return rolesCtrl.addroles(req, res)
})

router.put('/', (req, res) => {
    return rolesCtrl.updateroles(req, res)
})

router.delete('/', (req, res) => {
    return rolesCtrl.deleteUser(req, res)
})
module.exports = router