const Properties = require("sequelize");

const db = require("../config/mysqlConfig");

const Orders = db.define("Pedidos", {
  id: {
    type: Properties.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Properties.STRING,
  stock: Properties.INTEGER,
  image: Properties.TEXT,
  category: Properties.INTEGER,
});

module.exports = Orders;
