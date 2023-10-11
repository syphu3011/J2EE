'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mau extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mau.init({
    ma: DataTypes.INTEGER,
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mau',
    tableName: 'Mau',
    timestamps: false
  });
  return Mau;
};