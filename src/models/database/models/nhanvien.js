"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class NhanVien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            NhanVien.belongsTo(models.TrangThaiNhanVien, {
                as: "NhanVien",
                foreignKey: "matrangthai",
            });
            NhanVien.belongsTo(models.TaiKhoan, {
                as: "TaiKhoan",
                foreignKey: "tentaikhoan",
            });
        }
    }
    NhanVien.init(
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
                references: "TrangThaiNhanVien",
            },
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "NhanVien",
            tableName: "NhanVien",
            timestamps: false,
        }
    );
    return NhanVien;
};
