import { Router } from "express";
import {
  obtenerVendedores,
  obtenerVendedorPorId,
  crearVendedor,
  actualizarVendedor,
  eliminarVendedor
} from "../controllers/vendedorController.js";

const router = Router();

router.get("/", obtenerVendedores);
router.get("/:id", obtenerVendedorPorId);
router.post("/", crearVendedor);
router.put("/:id", actualizarVendedor);
router.delete("/:id", eliminarVendedor);

export default router;
