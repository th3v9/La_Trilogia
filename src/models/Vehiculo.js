import mongoose from "mongoose";

const anioActual = new Date().getFullYear();

const vehiculoSchema = new mongoose.Schema(
  {
    patente: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    marca: {
      type: String,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    anio: {
      type: Number,
      required: true,
      min: 1990,
      max: anioActual + 1
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    kilometraje: {
      type: Number,
      default: 0,
      min: 0
    },
    estado: {
      type: String,
      enum: ["disponible", "reservado", "vendido"],
      default: "disponible"
    }
  },
  {
    timestamps: true
  }
);

// Tercer argumento: fuerza el nombre de la colección a "vehiculos".
// Sin esto, Mongoose pluraliza el nombre del modelo con reglas en inglés,
// lo que casi siempre coincide con el español para palabras terminadas en
// vocal, pero puede fallar en otros casos (ver Vendedor.js).
const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema, "vehiculos");
export default Vehiculo;
