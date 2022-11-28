const Sequelize = require("sequelize");

const dataBase = new Sequelize("pedidos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

dataBase.sync();

module.exports = dataBase;
