const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();


router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(await service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    async (req, res, next) => {
        try {
            const user = req.body;
            const mail = await service.sendRecovery(user);
            res.json(mail);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/change-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            const mail = await service.changePassword(token,newPassword);
            console.log(mail);
            res.json(mail);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;