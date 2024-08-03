const { faker } = require('@faker-js/faker');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName()
      });
    }
  }
  create(body) {
    this.push(body);
  }
  find() {
    return this.users;
  }
  findOne(id) {
    return this.users.find(user => user.id === id);
  }
  update() {

  }
  delete() {

  }
}

module.exports = UserService;
