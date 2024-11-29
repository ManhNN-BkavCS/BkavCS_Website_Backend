const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('services_logs', {
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
    id_service: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('success','failed'),
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'services_logs',
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
      {
        name: "id_service",
        using: "BTREE",
        fields: [
          { name: "id_service" },
        ]
      },
    ]
  });
};
