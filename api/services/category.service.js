const { faker } = require('@faker-js/faker');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productAdjective(),
      });
    }
  }
  create() {

  }
  find() {
    // console.log(this);
    return this.categories;
  }
  findOne(id) {
    return this.categories.find(category => category.id === id)
  }
}

module.exports = CategoryService;
