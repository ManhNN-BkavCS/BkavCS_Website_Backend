const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('products', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    product_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "product_code"
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    preview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    link_demo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file_download: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('active','inactive','hidden'),
      allowNull: false,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
    underscored: true,
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
        name: "product_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_code" },
        ]
      },
      {
        name: "id_category",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });
};
