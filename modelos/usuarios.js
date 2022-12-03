const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const usuarios = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

usuarios.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("usuarios", usuarios);

const validate = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().required().label("First Name"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
