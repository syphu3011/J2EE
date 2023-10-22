'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietPhieuNhaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      masanpham: {
        type: Sequelize.INTEGER
      },
      mamau: {
        type: Sequelize.INTEGER
      },
      makichco: {
        type: Sequelize.INTEGER
      },
      soluong: {
        type: Sequelize.INTEGER
      },
      gianhap: {
        type: Sequelize.INTEGER
      },
      ghichu: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietPhieuNhaps');
  }
};