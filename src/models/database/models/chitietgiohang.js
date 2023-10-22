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
            ChiTietGioHang.belongsTo(models.Mathang, {
                as: "MatHang",
                foreignKey: "mamathang",
            });
            ChiTietGioHang.belongsTo(models.KhachHang, {
                as: "KhachHang",
                foreignKey: "makhachHang",
            });
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
            soluong: DataTypes.INTEGER
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
