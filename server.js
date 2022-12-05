const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const productRoute = require("./rutas/productos"); //importa la ruta de productos
const useRoute = require("./rutas/users");
const orderRoute = require("./rutas/pedidos");
const db = require("./config/mysqlConfig");
const authRoute = require("./rutas/authlogin");

//middleware

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use("/productos", productRoute); //uso la variable que tiene la ruta guardada
app.use("/users", useRoute);
app.use("/pedidos", orderRoute);
app.use("/auth", authRoute);

//test
app.get("/", (request, response) => {
  response.send("<h1>Home</h1>");
});

//conecta mongo
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("conectado");
});

//escucha
app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});
