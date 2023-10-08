'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrangThaiNhaCungCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrangThaiNhaCungCap.hasMany(models.NhaCungCap, {as: 'NhaCungCap', foreignKey: 'matrangthaincc'})
    }
  }
  TrangThaiNhaCungCap.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TrangThaiNhaCungCap',
    tableName: 'TrangThaiNhaCungCap',
    timestamps: false
  });
  return TrangThaiNhaCungCap;
};