'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhieuNhap.belongsTo(models.NhaCungCap, {as: "NhaCungCap", foreignKey: "manhacungcap"})
      PhieuNhap.belongsToMany(models.MatHang, {as: "MatHang", through: "ChiTietPhieuNhap", foreignKey: "maphieunhap", uniqueKey: "maphieunhap"})
      PhieuNhap.belongsToMany(models.MatHang, {as: "MatHangKho", through: "HangTrongKho", foreignKey: "maphieunhap" ,uniqueKey: "maphieunhap"})
      
      PhieuNhap.belongsTo(models.NhanVien, {as: "NhanVien", foreignKey: "manhanvien"})
      PhieuNhap.hasMany(models.ChiTietPhieuNhap, {as: "ChiTietPhieuNhap", foreignKey: "maphieunhap"})
      PhieuNhap.hasMany(models.HangTrongKho, {as: "HangTrongKho", foreignKey: "maphieunhap"})
    }
  }
  PhieuNhap.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ngaynhap: DataTypes.DATE,
    manhacungcap: {
      type: DataTypes.INTEGER,
      references: "NhaCungCap",
      referencesKey: "ma"
    },
    manhanvien: {
      type: DataTypes.INTEGER,
      // references: "NhanVien",
      // referencesKey: "ma"
    },
    ghichu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PhieuNhap',
    tableName: 'PhieuNhap',
    createdAt: 'ngaynhap',
    updatedAt: false,
    deletedAt: false
  });
  return PhieuNhap;
};