'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietPhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChiTietPhieuNhap.init({
    masanpham: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'SanPham',
      // referencesKey: 'ma'
    },
    makichco: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'KichCo',
      // referencesKey: 'ma' 
    },
    mamau: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'Mau',
      // referencesKey: 'ma' 
    },
    soluong: DataTypes.INTEGER,
    gianhap: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChiTietPhieuNhap',
    tableName: 'ChiTietPhieuNhap',
    timestamps: false
  });

  return ChiTietPhieuNhap;
};