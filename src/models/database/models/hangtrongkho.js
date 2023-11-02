"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HangTrongKho extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "SanPhamKho", foreignKey: "masanpham"})
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "MauKho", foreignKey: "mamau"})
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "KichCoKho", foreignKey: "makichco"})
        }
    }
    HangTrongKho.init(
        {
            masanpham: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "MatHang",
            },
            maphieunhap: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "MatHang",
            },
            mamau: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "MatHang",
            },
            makichco: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "MatHang",
            },
            soluong: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "HangTrongKho",
            tableName: "HangTrongKho",
            timestamps: false,
        }
    );
    return HangTrongKho;
};
