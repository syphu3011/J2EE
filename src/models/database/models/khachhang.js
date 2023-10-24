"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class KhachHang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            KhachHang.belongsTo(models.TrangThaiKhachHang, {
                as: "TrangThaiKhachHang",
                foreignKey: "matrangthai",
            });
            KhachHang.belongsTo(models.TaiKhoan, {
                as: "TaiKhoan",
                foreignKey: "tentaikhoan",
            });
            KhachHang.belongsToMany(models.MatHang, {
                as: "MatHang",
                through: "ChiTietGioHang",
                foreignKey: "makhachhang"
            })
        }
    }
    KhachHang.init(
        {
            ma: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten: DataTypes.STRING,
            ngaysinh: DataTypes.DATE,
            sodienthoai: DataTypes.INTEGER,
            socccd: DataTypes.INTEGER,
            tentaikhoan: {
                type: DataTypes.STRING,
                references: "TaiKhoan",
            },
            matrangthai: {
                type: DataTypes.INTEGER,
                references: "TrangThaiKhachHang",
            },
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "KhachHang",
            tableName: "KhachHang",
            timestamps: false,
        }
    );
    return KhachHang;
};
