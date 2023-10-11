'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KichCo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KichCo.init({
    ma: DataTypes.INTEGER,
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KichCo',
    tableName: 'KichCo',
    timestamps: false
  });
  return KichCo;
};