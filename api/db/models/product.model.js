const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class Product extends Model {
  static associate() {
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timeStamp: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
