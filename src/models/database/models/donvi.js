'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonVi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DonVi.hasMany(models.SanPham, {as:"SanPham", foreignKey: "madonvi"})
    }
  }
  DonVi.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DonVi',
    tableName: 'DonVi',
    timestamps: false,
  });
  return DonVi;
};