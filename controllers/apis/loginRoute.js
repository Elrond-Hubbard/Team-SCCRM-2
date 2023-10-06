const router = require('express').Router()
const { Doctor } = require('../../models/index')

router.post('/', async (req, res) => {
    console.log(req.body.physicianID)
    return
})

module.exports = router;