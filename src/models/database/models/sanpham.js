'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SanPham.belongsToMany(models.Loai, {as: 'Loai',through: 'ChiTietLoaiSanPham', foreignKey: 'masanpham'})
      SanPham.belongsToMany(models.NhaCungCap, {as: 'NhaCungCap', through: 'ChiTietCungCap', foreignKey: 'masanpham'})
      SanPham.belongsToMany(models.Mau, {as: 'Mau', through: 'MatHang', foreignKey: 'masanpham'})
      SanPham.belongsToMany(models.KichCo, {as: 'KichCo', through: 'MatHang', foreignKey: 'masanpham'})
      SanPham.hasMany(models.MatHang, {as: 'MatHang', foreignKey: 'masanpham'})
      SanPham.belongsTo(models.DonVi, {as: 'DonVi', foreignKey: 'madonvi'})
    }
  }
  SanPham.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING,
    anhminhhoa: DataTypes.STRING,
    mota: DataTypes.STRING,
    madonvi: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SanPham',
    tableName: 'SanPham',
    timestamps: false
  });
  return SanPham;
};