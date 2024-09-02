const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category']
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset
    }
    const products = await models.Product.findAll(
      options
    //   {
    //   include: ['category'],
    //   offset: 0,
    //   limit: 10
    // }
    );
    return products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('producto not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');

    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto not found');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto not found');
    } else {
      this.products.splice(index,1);
      return {message: true};
    }
  }
}

module.exports = ProductService;
