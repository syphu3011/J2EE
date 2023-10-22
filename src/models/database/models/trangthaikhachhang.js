"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TrangThaiKhachHang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TrangThaiKhachHang.hasMany(models.KhachHang, {
                as: "KhachHang",
                foreignKey: "matrangthai",
            });
        }
    }
    TrangThaiKhachHang.init(
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
            modelName: "TrangThaiKhachHang",
            tableName: "TrangThaiKhachHang",
            timestamps: false,
        }
    );
    return TrangThaiKhachHang;
};
