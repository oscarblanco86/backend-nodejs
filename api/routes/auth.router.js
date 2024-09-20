const express = require('express');
const passport = require('passport');

const router = express.Router();


router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            console.log(req.user);
            res.json(req.user);
        } catch (error) {
            console.log(req.user);
            next(error);
        }
    }
)

module.exports = router;