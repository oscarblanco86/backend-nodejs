const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
// const { or } = require('sequelize');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            // console.log(req.user.sub);
            const user = req.user;
            const orders = await service.findByUser(user.sub);
            // console.log(user.sub);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;