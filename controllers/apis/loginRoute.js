const router = require('express').Router()
const { Doctor } = require('../../models/index')

router.post('/', async (req, res) => {
    try {
        // attempt to find a matching username
        const userMatch = await Doctor.findOne({where: {loginID: req.body.physicianID}})
        if (!userMatch) {
            res.status(401).json({message: 'You have entered an incorrect email/password.'});
            return;
        }
        // use password authorization function on model to return true/false
        const passwordMatch = await userMatch.passwordAuth(req.body.password)
        if (!passwordMatch) {
            res.status(401).json({message: 'You have entered an incorrect email/password.'});
            return;
        }
        // we should have a matching username/password at this point. Now to add session data to stay logged in
        await req.session.save(() => {
            req.session.physician_id = userMatch;
            req.session.logged_in = true;
            req.session.doctorId = userMatch.id;
            res.status(200).json({user: userMatch, message: 'You are logged in!'})
        })

    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;