'use strict';

const { USER_TABLE } = require('../models/user.model');
const {
  CustomerSchema,
  CUSTOMER_TABLE,
} = require('./../models/customer.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.drop(USER_TABLE);
  },
};
