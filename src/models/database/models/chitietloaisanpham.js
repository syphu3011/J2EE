'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietLoaiSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChiTietLoaiSanPham.init({
    masanpham: {type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'SanPham', 
      // referencesKey: 'ma' 
    },
    maloai: {type: DataTypes.INTEGER,
      // primaryKey: true,
      // references: 'Loai', 
      // referencesKey: 'ma' 
    }
  }, {
    sequelize,
    modelName: 'ChiTietLoaiSanPham',
    tableName: 'ChiTietLoaiSanPham',
    timestamps: false,
  });
  return ChiTietLoaiSanPham;
};