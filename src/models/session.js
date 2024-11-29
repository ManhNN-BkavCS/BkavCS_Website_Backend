<<<<<<< HEAD
const {DataTypes} = require('sequelize');
const { create, update } = require('../services/serviceService');
=======
const { DataTypes } = require('sequelize');
>>>>>>> 218346791464bb4a6f73ae567188404ec6a51de7
module.exports = function(sequelize) {
  return sequelize.define('session', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'session',
    timestamps: true,
<<<<<<< HEAD
    createdAt: 'created_at',
    updatedAt: false,
=======
    underscored: true,
>>>>>>> 218346791464bb4a6f73ae567188404ec6a51de7
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
