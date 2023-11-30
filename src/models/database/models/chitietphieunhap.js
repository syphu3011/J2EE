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
      // ChiTietPhieuNhap.hasOne(models.HangTrongKho)
      ChiTietPhieuNhap.belongsTo(models.SanPham, {as: "SanPham", foreignKey: "masanpham"})
      ChiTietPhieuNhap.belongsTo(models.Mau, {as: "Mau", foreignKey: "mamau"})
      ChiTietPhieuNhap.belongsTo(models.KichCo, {as: "KichCo", foreignKey: "makichco"})
      ChiTietPhieuNhap.belongsTo(models.PhieuNhap, {as: "PhieuNhap", foreignKey: "maphieunhap"})
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