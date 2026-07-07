import { Router } from "express";
import {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  vehiculosPorMarca
} from "../controllers/vehiculoController.js";

const router = Router();

router.get("/estadisticas/por-marca", vehiculosPorMarca);
router.get("/", obtenerVehiculos);
router.get("/:id", obtenerVehiculoPorId);
router.post("/", crearVehiculo);
router.put("/:id", actualizarVehiculo);
router.delete("/:id", eliminarVehiculo);

export default router;
