const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {

  }
  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Costumer.findAll();
    return rta;
  }
  async findOne(id) {
    const costumer = await models.Costumer.findByPk(id);
    if (!costumer) {
      throw boom.notFound('Costumer not found');
    }
    return costumer;
  }
  async update(id, changes) {
    const costumer = await models.Costumer.findByPk(id);
    const rta = await costumer.update(changes);
    return rta;
  }
  async delete(id) {
    const costumer = await models.Costumer.findByPk(id);
    await costumer.destroy();
    return { rta:true };
  }
}

module.exports = CustomerService;
