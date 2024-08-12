const { faker } = require('@faker-js/faker');

const getConnection = require('../libs/postgres');


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
  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM public.tasks');
    // console.log(rta.rows);
    return rta.rows;
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
