const {DataTypes} = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    user_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "user_code"
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('super_admin','admin'),
      allowNull: false,
      defaultValue: "admin"
    },
    session_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3
    },
    login_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 24
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
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
        name: "user_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_code" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
