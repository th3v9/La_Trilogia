import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { formatCLP, formatFecha } from "../utils/format.js";

function ListadoVentas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerVentas = async () => {
    try {
      const respuesta = await api.get("/ventas");
      setVentas(respuesta.data);
    } catch (error) {
      console.error("Error al obtener ventas", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  const eliminarVenta = async (id) => {
    if (!window.confirm("¿Eliminar esta venta? El vehículo volverá a quedar disponible.")) return;
    try {
      await api.delete(`/ventas/${id}`);
      setVentas(ventas.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error al eliminar venta", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Ventas</h1>
          <p>Al eliminar una venta, el vehículo vuelve a estar disponible.</p>
        </div>
        <Link to="/ventas/nueva" className="btn btn-primary">
          + Registrar venta
        </Link>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : ventas.length === 0 ? (
        <div className="table-wrap">
          <div className="empty-state">Todavía no hay ventas registradas.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vehículo</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th className="num">Precio final</th>
                <th>Pago</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v._id}>
                  <td>
                    {v.vehiculo ? `${v.vehiculo.patente} · ${v.vehiculo.marca} ${v.vehiculo.modelo}` : "—"}
                  </td>
                  <td>{v.cliente ? `${v.cliente.nombre} ${v.cliente.apellido}` : "—"}</td>
                  <td>{v.vendedor ? `${v.vendedor.nombre} ${v.vendedor.apellido}` : "—"}</td>
                  <td className="num">{formatCLP(v.precioFinal)}</td>
                  <td style={{ textTransform: "capitalize" }}>{v.formaPago}</td>
                  <td>{formatFecha(v.fecha)}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarVenta(v._id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListadoVentas;
