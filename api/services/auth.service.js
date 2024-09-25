const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./../services/users.service');
const service = new UserService();

class AuthService{
    async getUser(email,password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boome.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    async signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return {
            user,
            token
        };
    }

    async sendMail(user) {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
              auth: {
                  user: config.mail,
                  pass: config.mailPass
              },
          });
        const info = await transporter.sendMail({
            from: '"My Store" <ariel.welch@ethereal.email>', // sender address
            to: "ariel.welch@ethereal.email", // list of receivers
            subject: "Pass Recovery from my store app", // Subject line
            text: `Password recovery my store app this is the user data ${user}`, // plain text body
            html: `<b>My store</b><br><p>${user.email}</p><br><p>${user.password}`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    }
}

module.exports = AuthService;