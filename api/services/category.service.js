const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {
    this.categories = [];
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }
  findOne(id) {
    return this.categories.find(category => category.id === id)
  }
}

module.exports = CategoryService;
