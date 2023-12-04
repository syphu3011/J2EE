"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChiTietHoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ChiTietHoaDon.belongsTo(models.SanPham, {as: "SanPham", foreignKey: "masanpham"})
            ChiTietHoaDon.belongsTo(models.Mau, {as: "Mau", foreignKey: "mamau"})
            ChiTietHoaDon.belongsTo(models.KichCo, {as: "KichCo", foreignKey: "makichco"})
            ChiTietHoaDon.belongsTo(models.PhieuNhap, {as: "PhieuNhap", foreignKey: "maphieunhap"})
        }
    }
    ChiTietHoaDon.init(
        {
            masanpham: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: 'SanPham',
                // referencesKey: 'ma'
            },
            makichco: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: 'KichCo',
                // referencesKey: 'ma' 
            },
            mamau: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                // references: 'Mau',
                // referencesKey: 'ma' 
            },
            maphieunhap: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mahoadon: {
                type: DataTypes.INTEGER,
            },
            soluong: DataTypes.INTEGER,
            gia: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ChiTietHoaDon",
            tableName: "ChiTietHoaDon",
            timestamps: false,
        }
    );
    return ChiTietHoaDon;
};
