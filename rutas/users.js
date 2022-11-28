const express = require("express");
const router = express.Router();

const User = require("../modelos/usuarios");

/* metodo post de usuario */
router.post("/user", (request, response) => {
  //el home es users del middleware
  const usuario = new User({
    // agarra las propiedades del body del objeto
    nombre: request.body.nombre,
    password: request.body.password,
  });
  usuario
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({ message: error });
    });
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
