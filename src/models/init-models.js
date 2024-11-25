var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _category_logs = require("./category_logs");
var _login_logs = require("./login_logs");
var _product_logs = require("./product_logs");
var _products = require("./products");
var _services = require("./services");
var _services_logs = require("./services_logs");
var _session = require("./session");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var category_logs = _category_logs(sequelize, DataTypes);
  var login_logs = _login_logs(sequelize, DataTypes);
  var product_logs = _product_logs(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var services_logs = _services_logs(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  category_logs.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(category_logs, { as: "category_logs", foreignKey: "id_category"});
  products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(products, { as: "products", foreignKey: "id_category"});
  product_logs.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(product_logs, { as: "product_logs", foreignKey: "id_product"});
  services_logs.belongsTo(services, { as: "id_service_service", foreignKey: "id_service"});
  services.hasMany(services_logs, { as: "services_logs", foreignKey: "id_service"});
  category_logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(category_logs, { as: "category_logs", foreignKey: "user_id"});
  login_logs.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(login_logs, { as: "login_logs", foreignKey: "id_user"});
  product_logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(product_logs, { as: "product_logs", foreignKey: "user_id"});
  services_logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(services_logs, { as: "services_logs", foreignKey: "user_id"});
  session.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(session, { as: "sessions", foreignKey: "user_id"});

  return {
    categories,
    category_logs,
    login_logs,
    product_logs,
    products,
    services,
    services_logs,
    session,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
