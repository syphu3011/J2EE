"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TrangThaiHoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TrangThaiHoaDon.hasMany(models.MatHang, {
                as: "HoaDon",
                foreignKey: "matrangthaihoadon",
            });
        }
    }
    TrangThaiHoaDon.init(
        {
            ma: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "TrangThaiHoaDon",
            tableName: "TrangThaiHoaDon",
            timestamps: false,
        }
    );
    return TrangThaiHoaDon;
};
