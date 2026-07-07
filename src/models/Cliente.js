import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
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
    telefono: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Cliente = mongoose.model("Cliente", clienteSchema, "clientes");
export default Cliente;
