import Vehiculo from "../models/Vehiculo.js";

export const obtenerVehiculos = async (req, res, next) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json(vehiculos);
  } catch (error) {
    next(error);
  }
};

export const obtenerVehiculoPorId = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ mensaje: "Vehículo no encontrado" });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    next(error);
  }
};

export const crearVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.create(req.body);
    res.status(201).json(vehiculo);
  } catch (error) {
    next(error);
  }
};

export const actualizarVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!vehiculo) {
      return res.status(404).json({ mensaje: "Vehículo no encontrado" });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    next(error);
  }
};

export const eliminarVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ mensaje: "Vehículo no encontrado" });
    }
    res.status(200).json({ mensaje: "Vehículo eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

// Reporte: cantidad de vehículos disponibles agrupados por marca.
export const vehiculosPorMarca = async (req, res, next) => {
  try {
    const resultado = await Vehiculo.aggregate([
      { $match: { estado: "disponible" } },
      { $group: { _id: "$marca", totalDisponibles: { $sum: 1 } } },
      { $sort: { totalDisponibles: -1 } }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
