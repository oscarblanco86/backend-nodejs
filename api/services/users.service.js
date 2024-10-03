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
    rta.forEach((user) => {
      delete user.dataValues.password;
    });
    return rta;
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
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
    const user = await models.User.findByPk(id);
    const rta = await user.update({
      ...changes,
    });
    return rta;
  }
  async delete(id) {
    const user = await models.User.findByPk(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
