const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {

  }
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete  newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    // delete rta.dataValues.password;
    rta.forEach((user) => {
      // console.log(user);
      delete user.dataValues.password;
    });
    return rta;
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
      // include: ['customer']
    });
    // delete rta.dataValues.password;
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    // delete user.dataValues.password;
    return user;
  }
  async update(id, changes) {
    const hash = await bcrypt.hash(changes.password, 10);
    const user = await models.User.findByPk(id);
    const rta = await user.update({
      ...changes,
      password: hash
    });
    return rta;
  }
  async updateRecovery(id, changes) {
    // const hash = await bcrypt.hash(changes.password, 10);
    const user = await models.User.findByPk(id);
    const rta = await user.update({
      ...changes,
    });
    return rta;
  }
  async delete(id) {
    const user = await models.User.findByPk(id);
    // console.log(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
