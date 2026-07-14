import mongoose from "mongoose";

const vendedorSchema = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
      unique: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/
    },
    sucursal: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Se fija el nombre de la colección para utilizarlo en $lookup.
const Vendedor = mongoose.model("Vendedor", vendedorSchema, "vendedores");
export default Vendedor;
