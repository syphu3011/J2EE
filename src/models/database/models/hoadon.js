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
            HoaDon.hasMany(models.ChiTietHoaDon, {
                as: "TrangThaiHoaDon",
                foreignKey: "mahoadon",
            });
            HoaDon.belongsToMany(models.TrangThaiHoaDon, {
                as: "TrangThaiHoaDon",
                foreignKey: "matrangthaihoadon",
            });
            HoaDon.belongsToMany(models.NhanVien, {
                as: "NhanVien",
                foreignKey: "manhanvien",
            });
            HoaDon.belongsToMany(models.KhachHang, {
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
        },
        {
            sequelize,
            modelName: "HoaDon",
            tableName: "HoaDon",
            timestamps: false,
        }
    );
    return HoaDon;
};
