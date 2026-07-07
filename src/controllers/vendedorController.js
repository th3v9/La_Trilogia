import Vendedor from "../models/Vendedor.js";

export const obtenerVendedores = async (req, res, next) => {
  try {
    const vendedores = await Vendedor.find();
    res.status(200).json(vendedores);
  } catch (error) {
    next(error);
  }
};

export const obtenerVendedorPorId = async (req, res, next) => {
  try {
    const vendedor = await Vendedor.findById(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ mensaje: "Vendedor no encontrado" });
    }
    res.status(200).json(vendedor);
  } catch (error) {
    next(error);
  }
};

export const crearVendedor = async (req, res, next) => {
  try {
    const vendedor = await Vendedor.create(req.body);
    res.status(201).json(vendedor);
  } catch (error) {
    next(error);
  }
};

export const actualizarVendedor = async (req, res, next) => {
  try {
    const vendedor = await Vendedor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!vendedor) {
      return res.status(404).json({ mensaje: "Vendedor no encontrado" });
    }
    res.status(200).json(vendedor);
  } catch (error) {
    next(error);
  }
};

export const eliminarVendedor = async (req, res, next) => {
  try {
    const vendedor = await Vendedor.findByIdAndDelete(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ mensaje: "Vendedor no encontrado" });
    }
    res.status(200).json({ mensaje: "Vendedor eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
