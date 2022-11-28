const Order = require("../modelos/pedidos");
const express = require("express");
const Orders = require("../modelos/pedidos");
const router = express.Router();

/*crea pedido*/
router.post("/pedido", async (req, resp) => {
  const { title, stock, image, category } = req.body;
  const nuevoPedido = await Orders.create({ title, stock, image, category });
  resp.json(nuevoPedido);
});

/* trae pedidos */

router.get("/", async (req, res) => {
  const allOrders = await Orders.findAll();
  res.json(allOrders);
});

module.exports = router;
