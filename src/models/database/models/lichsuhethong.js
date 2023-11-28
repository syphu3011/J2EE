'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LichSuHeThong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  LichSuHeThong.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    noidung: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LichSuHeThong',
    tableName: 'LichSuHeThong',
    createdAt: 'thoigian',
    updatedAt: false,
    deletedAt: false
  });
  return LichSuHeThong;
};