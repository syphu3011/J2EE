'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhaCungCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NhaCungCap.belongsToMany(models.SanPham, {as: 'SanPham', through: 'ChiTietCungCap', foreignKey: 'manhacungcap'})
      NhaCungCap.belongsTo(models.TrangThaiNhaCungCap, {as: 'TrangThai', foreignKey: "matrangthaincc"})
      // NhaCungCap.hasMany(models.ChiTietCungCap,{as: 'ChiTietCungCap', foreignKey: "manhacungcap"})
    }
  }
  NhaCungCap.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING,
    diachi: DataTypes.STRING,
    dienthoai: DataTypes.STRING,
    matrangthaincc: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NhaCungCap',
    tableName: 'NhaCungCap',
    timestamps: false
  });
  NhaCungCap.up
  return NhaCungCap;
};