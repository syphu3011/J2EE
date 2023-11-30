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
            mahoadon: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "KhachHang",
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
