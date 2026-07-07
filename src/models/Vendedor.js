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

// OJO: "Vendedor" termina en consonante. Si dejamos que Mongoose
// pluralice automáticamente, la librería que usa internamente aplica
// reglas de inglés y genera la colección "vendedors" (no "vendedores").
// Como nuestro $lookup más adelante apunta a "vendedores", fijamos el
// nombre de la colección explícitamente para evitar ese bug silencioso
// (un lookup contra una colección inexistente no lanza error: solo
// devuelve un arreglo vacío, y es muy difícil de detectar).
const Vendedor = mongoose.model("Vendedor", vendedorSchema, "vendedores");
export default Vendedor;
