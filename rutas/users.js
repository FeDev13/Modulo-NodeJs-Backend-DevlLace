const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User, validate } = require("../modelos/usuarios");

/* metodo post de usuario */
router.post("/user", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/* metodo get de usuarios */
router.get("/", async (request, response) => {
  try {
    const getUsers = await User.find();
    response.json(getUsers);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});
/* metodo update de guitarra */

router.patch("/:usuario", async (request, response) => {
  try {
    const userUpdate = await User.updateOne(
      { _id: request.params.usuario },
      { $set: { password: request.body.password } }
    );
    response.json(userUpdate);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

/* metodo delete de usuario */
router.delete("/:usuario", async (request, response) => {
  try {
    const userDelete = await User.deleteOne({ _id: request.params.usuario });
    response.json(userDelete);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

module.exports = router;
