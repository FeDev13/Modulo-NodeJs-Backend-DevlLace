const mongoose = require("mongoose");
const usuarios = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("usuarios", usuarios);
