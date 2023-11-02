'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietCungCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ChiTietCungCap.belongsTo(models.SanPham, {as: 'SanPham', foreignKey: "ma"})
      // ChiTietCungCap.belongsTo(models.NhaCungCap, {as: 'NhaCungCap', foreignKey: "ma"})
    }
  }
  ChiTietCungCap.init({
    masanpham: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'SanPham'
    },
    manhacungcap: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'NhaCungCap'
    }
  }, {
    sequelize,
    modelName: 'ChiTietCungCap',
    tableName: 'ChiTietCungCap',
    timestamps: false,
  });
  return ChiTietCungCap;
};