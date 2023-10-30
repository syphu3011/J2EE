"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChiTietQuyen extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
        }
    }
    ChiTietQuyen.init(
        {
            maquyen: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "Quyen",
            },
            machucnang: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: "ChucNang",
            },
        },
        {
            sequelize,
            modelName: "ChiTietQuyen",
            tableName: "ChiTietQuyen",
            timestamps: false,
        }
    );
    return ChiTietQuyen;
};
