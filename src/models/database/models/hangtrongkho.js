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
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "SanPhamKho", foreignKey: "masanpham", constraints: false})
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "MauKho", foreignKey: "mamau",constraints: false} )
            HangTrongKho.belongsTo(models.ChiTietPhieuNhap, {as: "KichCoKho", foreignKey: "makichco", constraints: false})
            HangTrongKho.belongsTo(models.SanPham, {as: "SanPham", foreignKey: "masanpham"})
            HangTrongKho.belongsTo(models.Mau, {as: "Mau", foreignKey: "mamau"})
            HangTrongKho.belongsTo(models.KichCo, {as: "KichCo", foreignKey: "makichco"})
            HangTrongKho.belongsTo(models.PhieuNhap, {as: "PhieuNhap", foreignKey: "maphieunhap"})
            HangTrongKho.belongsTo(models.TrangThaiSanPham, {as: 'TrangThaiSanPham', foreignKey: 'matrangthai'}) 
        }
    }
    HangTrongKho.init(
        {
            masanpham: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: "MatHang",
            },
            maphieunhap: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: "MatHang",
            },
            mamau: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: "MatHang",
            },
            makichco: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: "MatHang",
            },
            soluong: DataTypes.INTEGER,
            gianhap:DataTypes.INTEGER,
            giaban: DataTypes.INTEGER,
            matrangthai: DataTypes.INTEGER,
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
