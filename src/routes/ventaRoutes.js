import { Router } from "express";
import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
  ventasPorVendedor
} from "../controllers/ventaController.js";

const router = Router();

router.get("/reportes/por-vendedor", ventasPorVendedor);
router.get("/", obtenerVentas);
router.get("/:id", obtenerVentaPorId);
router.post("/", crearVenta);
router.put("/:id", actualizarVenta);
router.delete("/:id", eliminarVenta);

export default router;
