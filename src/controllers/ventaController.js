import Venta from "../models/Venta.js";
import Vehiculo from "../models/Vehiculo.js";
import Cliente from "../models/Cliente.js";
import Vendedor from "../models/Vendedor.js";

export const obtenerVentas = async (req, res, next) => {
  try {
    const ventas = await Venta.find()
      .populate("vehiculo", "patente marca modelo anio")
      .populate("cliente", "nombre apellido correo")
      .populate("vendedor", "nombre apellido sucursal");
    res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
};

export const obtenerVentaPorId = async (req, res, next) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate("vehiculo", "patente marca modelo anio")
      .populate("cliente", "nombre apellido correo")
      .populate("vendedor", "nombre apellido sucursal");
    if (!venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    res.status(200).json(venta);
  } catch (error) {
    next(error);
  }
};

// Antes de crear la venta se verifican las referencias y la disponibilidad del vehículo.
export const crearVenta = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findById(req.body.vehiculo);
    if (!vehiculo) {
      return res.status(404).json({ mensaje: "Vehículo no encontrado" });
    }
    if (vehiculo.estado !== "disponible") {
      return res.status(400).json({
        mensaje: `El vehículo ${vehiculo.patente} no está disponible (estado actual: ${vehiculo.estado})`
      });
    }

    const cliente = await Cliente.findById(req.body.cliente);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    const vendedor = await Vendedor.findById(req.body.vendedor);
    if (!vendedor) {
      return res.status(404).json({ mensaje: "Vendedor no encontrado" });
    }

    const venta = await Venta.create(req.body);

    await Vehiculo.findByIdAndUpdate(
      vehiculo._id,
      { estado: "vendido" },
      { new: true, runValidators: true }
    );

    res.status(201).json(venta);
  } catch (error) {
    next(error);
  }
};

export const actualizarVenta = async (req, res, next) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    res.status(200).json(venta);
  } catch (error) {
    next(error);
  }
};

// Al eliminar una venta, el vehículo vuelve a quedar disponible.
export const eliminarVenta = async (req, res, next) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    await Vehiculo.findByIdAndUpdate(venta.vehiculo, { estado: "disponible" });
    res.status(200).json({ mensaje: "Venta eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

// Reporte de cantidad de ventas y monto total por vendedor.
export const ventasPorVendedor = async (req, res, next) => {
  try {
    const resultado = await Venta.aggregate([
      {
        $group: {
          _id: "$vendedor",
          cantidadVentas: { $sum: 1 },
          montoTotal: { $sum: "$precioFinal" }
        }
      },
      {
        $lookup: {
          from: "vendedores",
          localField: "_id",
          foreignField: "_id",
          as: "vendedorInfo"
        }
      },
      { $unwind: "$vendedorInfo" },
      {
        $project: {
          _id: 0,
          vendedorId: "$_id",
          nombre: "$vendedorInfo.nombre",
          apellido: "$vendedorInfo.apellido",
          sucursal: "$vendedorInfo.sucursal",
          cantidadVentas: 1,
          montoTotal: 1
        }
      },
      { $sort: { montoTotal: -1 } }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
