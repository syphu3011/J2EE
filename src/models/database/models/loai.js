'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loai.belongsToMany(models.SanPham, {as: 'SanPham', through: 'ChiTietLoaiSanPham', foreignKey: 'maloai'})
      Loai.hasMany(models.Loai, {as: 'loaicon', foreignKey: 'ma'})
      Loai.belongsTo(models.Loai, {as: 'loaicha', foreignKey: 'maloaicha'})
    }
  }
  Loai.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ten: DataTypes.STRING,
    anhminhhoa: DataTypes.STRING,
    mota: DataTypes.STRING,
    maloaicha: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Loai',
    tableName: 'Loai',
    timestamps: false
  });
  return Loai;
};