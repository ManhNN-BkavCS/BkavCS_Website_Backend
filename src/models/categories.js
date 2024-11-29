const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('categories', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    category_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "category_code"
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
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
        name: "category_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_code" },
        ]
      },
    ]
  });
};
