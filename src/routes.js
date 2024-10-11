const { Router } = require("express");
const SensoresController = require("./app/controllers/Sensor");

const routes = Router();

routes.get("/sensores", SensoresController.index);
routes.post("/sensores", SensoresController.store);

module.exports = routes;
