"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TrangThaiNhanVien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ChucNang.hasMany(models.NhanVien, {
                as: "NhanVien",
                foreignKey: "matrangthai",
            });
        }
    }
    TrangThaiNhanVien.init(
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
            modelName: "TrangThaiNhanVien",
            tableName: "TrangThaiNhanVien",
            timestamps: false,
        }
    );
    return TrangThaiNhanVien;
};
