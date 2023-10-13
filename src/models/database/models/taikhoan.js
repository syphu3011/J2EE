"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChiTietGioHang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ChiTietGioHang.init(
        {
            mamathang: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "MatHang",
            },
            makhachhang: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "KhachHang",
            },
        },
        {
            sequelize,
            modelName: "ChiTietGioHang",
            tableName: "ChiTietGioHang",
            timestamps: false,
        }
    );
    return ChiTietGioHang;
};
