import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    vehiculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: true
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendedor",
      required: true
    },
    precioFinal: {
      type: Number,
      required: true,
      min: 0
    },
    formaPago: {
      type: String,
      enum: ["contado", "credito", "leasing"],
      required: true
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Venta = mongoose.model("Venta", ventaSchema, "ventas");
export default Venta;
