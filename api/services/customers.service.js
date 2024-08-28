const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {

  }
  async create(data) {
    // const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    //   {
    //   ...data,
    //   userId: newUser.id
    // }
  });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return costumer;
  }
  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    const rta = await customer.update(changes);
    return rta;
  }
  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    await customer.destroy();
    return { rta:true };
  }
}

module.exports = CustomerService;
