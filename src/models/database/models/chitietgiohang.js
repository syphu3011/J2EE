"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChiTietGioHang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    ChiTietGioHang.init(
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
            makhachhang: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "KhachHang",
            },
            soluong: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "ChiTietGioHang",
            tableName: "ChiTietGioHang",
            timestamps: false,
        }
    );
    return ChiTietGioHang;
};
