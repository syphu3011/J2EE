'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MatHang.init({
    masanpham: DataTypes.INTEGER,
    mamau: DataTypes.INTEGER,
    makichco: DataTypes.INTEGER,
    madonvi: DataTypes.INTEGER,
    matrangthaisanpham: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MatHang',
    tableName: 'MatHang',
    timestamps: false
  });
  return MatHang;
};