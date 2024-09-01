const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model')

function setupModels(sequelize) {
  // Initialize models
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  // Set up associations
  User.associate(sequelize.models);
  Product.associate(sequelize.models); // Assuming Product may have associations
  Category.associate(sequelize.models); // Assuming Category may have associations
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;
