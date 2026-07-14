import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { formatCLP } from "../utils/format.js";

function VentaForm({ onGuardar }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [form, setForm] = useState({
    vehiculo: "",
    cliente: "",
    vendedor: "",
    precioFinal: "",
    formaPago: "contado"
  });

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const [resVehiculos, resClientes, resVendedores] = await Promise.all([
          api.get("/vehiculos"),
          api.get("/clientes"),
          api.get("/vendedores")
        ]);
        setVehiculos(resVehiculos.data.filter((v) => v.estado === "disponible"));
        setClientes(resClientes.data);
        setVendedores(resVendedores.data);
      } finally {
        setCargando(false);
      }
    };
    cargarOpciones();
  }, []);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setForm((actual) => {
      const siguiente = { ...actual, [name]: value };
      // Al elegir el vehículo, sugerimos su precio de lista como precio final.
      if (name === "vehiculo") {
        const elegido = vehiculos.find((v) => v._id === value);
        if (elegido) siguiente.precioFinal = elegido.precio;
      }
      return siguiente;
    });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    onGuardar({ ...form, precioFinal: Number(form.precioFinal) });
  };

  if (cargando) return <p>Cargando vehículos, clientes y vendedores...</p>;

  if (vehiculos.length === 0) {
    return (
      <div className="empty-state card">
        No hay vehículos con estado "disponible" para vender. Agrega uno nuevo o revisa el
        listado de vehículos.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={manejarEnvio}>
      <div className="field field--full">
        <label>Vehículo (solo disponibles)</label>
        <select name="vehiculo" value={form.vehiculo} onChange={manejarCambio} required>
          <option value="" disabled>
            Selecciona un vehículo
          </option>
          {vehiculos.map((v) => (
            <option key={v._id} value={v._id}>
              {v.patente} · {v.marca} {v.modelo} ({v.anio}) · {formatCLP(v.precio)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Cliente</label>
        <select name="cliente" value={form.cliente} onChange={manejarCambio} required>
          <option value="" disabled>
            Selecciona un cliente
          </option>
          {clientes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nombre} {c.apellido}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Vendedor</label>
        <select name="vendedor" value={form.vendedor} onChange={manejarCambio} required>
          <option value="" disabled>
            Selecciona un vendedor
          </option>
          {vendedores.map((v) => (
            <option key={v._id} value={v._id}>
              {v.nombre} {v.apellido} · {v.sucursal}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Precio final (CLP)</label>
        <input
          name="precioFinal"
          type="number"
          min="0"
          value={form.precioFinal}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="field">
        <label>Forma de pago</label>
        <select name="formaPago" value={form.formaPago} onChange={manejarCambio}>
          <option value="contado">Contado</option>
          <option value="credito">Crédito</option>
          <option value="leasing">Leasing</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Registrar venta
        </button>
      </div>
    </form>
  );
}

export default VentaForm;
