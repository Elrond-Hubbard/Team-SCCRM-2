const router = require('express').Router()
const { Doctor } = require('../../models/index')

router.post('/', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy( () => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;