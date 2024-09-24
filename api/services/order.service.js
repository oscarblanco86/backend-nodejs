const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    try {
      console.log('Data received for order creation:', data);
      const customer = await models.Customer.findByPk(data.customerId);
    if (!customer) {
      throw boom.badRequest('Customer does not exist');
    }
      const newOrder = await models.Order.create(data, {
        include: ['customer'],
      });
      return newOrder;
    } catch (error) {
      console.error(error);
      throw boom.badRequest('Failed to create order');
    }
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findByUser(userId) {
    // console.log("find by user",userId);
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
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
