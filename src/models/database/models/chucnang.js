"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChucNang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // ChucNang.belongsToMany(models.Quyen, {
            //     as: "Quyen",
            //     through: "ChiTietQuyen",
            //     foreignKey: "maquyen",
            // });
        }
    }
    ChucNang.init(
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
            modelName: "ChucNang",
            tableName: "ChucNang",
            timestamps: false,
        }
    );
    return ChucNang;
};
