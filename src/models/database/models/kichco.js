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
      KichCo.belongsToMany(models.SanPham, {as: 'SanPham', through: 'MatHang', foreignKey: 'makichco',uniqueKey: 'makichco'})
    }
  }
  KichCo.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KichCo',
    tableName: 'KichCo',
    timestamps: false
  });
  return KichCo;
};