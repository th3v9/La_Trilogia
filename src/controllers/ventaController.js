import Venta from "../models/Venta.js";
import Vehiculo from "../models/Vehiculo.js";

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

// Crear una venta implica una regla de negocio real del concesionario:
// no se puede vender dos veces el mismo vehículo. Por eso, además de
// insertar el documento, verificamos y actualizamos el estado del auto.
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

    const venta = await Venta.create(req.body);

    vehiculo.estado = "vendido";
    await vehiculo.save();

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

// Si se elimina una venta (por ejemplo, se anuló), el vehículo vuelve
// a quedar disponible para una nueva venta.
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

// Reporte: cantidad de ventas y monto total vendido, por vendedor.
// Combina $group + $lookup + $unwind + $project, más completo que un
// solo populate() porque agrega y calcula totales al mismo tiempo.
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
