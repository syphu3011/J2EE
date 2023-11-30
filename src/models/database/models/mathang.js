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
      MatHang.belongsToMany(models.PhieuNhap, {as: 'PhieuNhap', through: 'ChiTietPhieuNhap', foreignKey: 'masanpham', uniqueKey: 'masanpham'});
      MatHang.belongsToMany(models.PhieuNhap, {as: 'MauNhap', through: 'ChiTietPhieuNhap', foreignKey: 'mamau', uniqueKey: 'mamau'});
      MatHang.belongsToMany(models.PhieuNhap, {as: 'KichThuocNhap', through: 'ChiTietPhieuNhap', foreignKey: 'makichco', uniqueKey: 'makichco'});
      MatHang.belongsToMany(models.KhachHang, {as: 'SanPhamGioHang', through: 'ChiTietGioHang', foreignKey: 'masanpham'})
      MatHang.belongsToMany(models.KhachHang, {as: 'MauGioHang', through: 'ChiTietGioHang', foreignKey: 'mamau'})
      MatHang.belongsToMany(models.KhachHang, {as: 'KichCoGioHang', through: 'ChiTietGioHang', foreignKey: 'makichco'})
      MatHang.belongsTo(models.TrangThaiSanPham, {as: 'TrangThaiSanPham', foreignKey: 'matrangthaisanpham'})
      MatHang.belongsTo(models.Mau, {as: 'Mau', foreignKey: 'mamau'})
      MatHang.belongsTo(models.KichCo, {as: 'KichCo', foreignKey: 'makichco'})
    }
  }
  MatHang.init({
    mamau: {
      type: DataTypes.INTEGER,
    },
    masanpham: {
      type: DataTypes.INTEGER,
    },
    makichco: {
      type: DataTypes.INTEGER,
    },
    giaban: DataTypes.INTEGER,
    matrangthaisanpham: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MatHang',
    tableName: 'MatHang',
    timestamps: false
  });
  return MatHang;
};