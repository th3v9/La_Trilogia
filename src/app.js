import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vehiculoRoutes from "./routes/vehiculoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import vendedorRoutes from "./routes/vendedorRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Concesionario de Autos funcionando");
});

app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vendedores", vendedorRoutes);
app.use("/api/ventas", ventaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
