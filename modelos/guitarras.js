const mongoose = require("mongoose");
const guitarra = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("guitarra", guitarra);
