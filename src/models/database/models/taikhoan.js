"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TaiKhoan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TaiKhoan.hasOne(models.NhanVien, {
                as: "NhanVien",
                foreignKey: "tentaikhoan",
            });

            TaiKhoan.hasOne(models.KhachHang, {
                as: "KhachHang",
                foreignKey: "tentaikhoan",
            });

            TaiKhoan.belongsTo(models.Quyen, {
                as: "Quyen",
                foreignKey: "maquyen",
            });
        }
    }
    TaiKhoan.init(
        {
            tentaikhoan: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            matkhau: {
                type: DataTypes.STRING,
            },
            maquyen: {
                type: DataTypes.INTEGER,
                references: "Quyen",
            },
            private_key: {
                type: DataTypes.STRING,
            },
            public_key: {
                type: DataTypes.STRING,
            }
        },
        {
            sequelize,
            modelName: "TaiKhoan",
            tableName: "TaiKhoan",
            timestamps: false,
        }
    );
    return TaiKhoan;
};
