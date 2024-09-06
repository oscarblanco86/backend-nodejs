const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data, {
      include: ['customer'],
    });
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: ['customer'],
    });
    return orders;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }
  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    const rta = await order.update(changes);
    return rta;
  }
  async delete(id) {
    const order = await models.Order.findByPk(id);
    await order.destroy();
    return { rta: true };
  }
}

module.exports = OrderService;
