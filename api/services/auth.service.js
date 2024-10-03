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
            throw boom.unauthorized();
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

    async sendRecovery(user) {
        const mail = await service.findByEmail(user.email);
        if (!mail) {
            throw boom.unauthorized();
        }
        console.log("mail en sendrecovery",mail);
        const payload = { sub: mail.dataValues.id };
        console.log("payload en sendrecovery",payload);
        const token = jwt.sign(payload, config.jwtRecovSecret, {expiresIn: '15min'});
        console.log("token: ",token);
        await service.updateRecovery(mail.dataValues.id, {recoveryToken: token});
        const link = `http://frontend.com/recovery?token=${token}`;
        const info = {
            from: config.smtpEmail, 
            to: `${user.email}`, 
            subject: "Pass Recovery from my store app", 
            text: `Password recovery my store app this is the user data ${user}`, 
            html: `<style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .content {
                            font-family:arial;
                            margin:20px;
                            padding:20px;
                            background-color:beige; 
                            border-radius:10px; 
                            width:400px; 
                            height:400px;
                        } 
                        h1 {
                            text-align:center; 
                            color:gray;
                        }
                    </style>
                    <body>
                        <div class="content">
                            <h1>My store</h1>
                            <hr>
                            <br>
                            <p>This is a recovery email generated</p>
                            <p>Your email is: ${user.email}</p>
                            <br>
                            <!-- <p>Your temporary password: ${user.password}</p>-->
                            <p>
                                Your recovery
                                <a href="${link}">link</a>
                            </p>
                            <br>
                            <p>In case you have difficulties enter the following link: </p> 
                            <p>${link}</p>
                        </div>
                    </body>`, 
          }
        const rta = await this.sendMail(info);
        return rta;
    }

    async sendMail(infoMail) {
        const transporter = nodemailer.createTransport({
            host: config.mailServer,
            port: 465,
              auth: {
                  user: config.mail,
                  pass: config.mailPass
              },
          });
        await transporter.sendMail(infoMail);
        return { message: 'mail sent' }
    }


    async changePassword(token,newPassword) {
        try {
            const payload = jwt.verify(token, config.jwtRecovSecret);
            const user = await service.findOne(payload.sub);

            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            await service.update(user.id, {recoveryToken: null, password: newPassword});
            return { message: 'password changed'};
        } catch (error) {
            throw boom.unauthorized();
        }
    }
}
module.exports = AuthService;