"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            HoaDon.belongsToMany(models.HangTrongKho, {
                as: "HangTrongKho",
                through: "ChiTietHoaDon",
                foreignKey: "mahoadon",
            });
            HoaDon.belongsTo(models.TrangThaiHoaDon, {
                as: "TrangThaiHoaDon",
                foreignKey: "matrangthaihoadon",
            });
            HoaDon.belongsTo(models.NhanVien, {
                as: "NhanVien",
                foreignKey: "manhanvien",
            });
            HoaDon.belongsTo(models.KhachHang, {
                as: "KhachHang",
                foreignKey: "makhachhang",
            });
        }
    }
    HoaDon.init(
        {
            ma: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ngaylap: DataTypes.DATE,
            matrangthaihoadon: {
                type: DataTypes.INTEGER,
                references: "TrangThaiHoaDon",
            },
            manhanvien: {
                type: DataTypes.INTEGER,
                references: "NhanVien",
            },

            makhachhang: {
                type: DataTypes.INTEGER,
                references: "KhachHang",
            },
            diachi: {
                type: DataTypes.STRING,
            },
            tenkhachhang: DataTypes.STRING,
            sodienthoai: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "HoaDon",
            tableName: "HoaDon",
            createdAt: "ngaylap",
            updatedAt: false,
            deletedAt: false
        }
    );
    return HoaDon;
};
