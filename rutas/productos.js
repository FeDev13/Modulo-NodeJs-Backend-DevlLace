const { response } = require("express");
const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");

const Guitarra = require("../modelos/guitarras");

//rutas

router.get("/", (request, response) => {
  // "/productos" es este home o sea productos/guitarras
  response.send("<h1>list</h1>");
});

/*metodo get de todas las guitarras*/

router.get("/guitarras", async (request, response) => {
  try {
    const guitars = await Guitarra.find();
    response.json(guitars);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

/*metodo get por id de guitarra*/
router.get("/:guitProd", async (request, response) => {
  try {
    const guitProd = await Guitarra.findById(request.params.guitProd);
    response.json(guitProd);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

/* metodo post de una guitarra */
router.post("/guitarra", upload.sigle("prodImage"), (request, response) => {
  const guitar = new Guitarra({
    // agarra las propiedades del body del objeto
    nombre: request.body.nombre,
    descripcion: request.body.descripcion,
    cantidad: request.body.cantidad,
    imagen: request.file.originalname,
  });
  guitar
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({ message: error });
    });
});

/* metodo update de guitarra */

router.patch("/:guitProd", async (request, response) => {
  try {
    const guitUpdate = await Guitarra.updateOne(
      { _id: request.params.guitProd },
      { $set: { cantidad: request.body.cantidad } }
    );
    response.json(guitUpdate);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

/* metodo delete para guitarra */
router.delete("/:guitProd", async (request, response) => {
  try {
    const guitDelete = await Guitarra.remove({ _id: request.params.guitProd });
    response.json(guitDelete);
  } catch (error) {
    response.send({ message: "error" });
  } //esto adentro de la ruta /productos
});

module.exports = router;
