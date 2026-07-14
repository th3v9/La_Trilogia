import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import EstadoBadge from "../components/EstadoBadge.jsx";
import { formatCLP } from "../utils/format.js";

function ListadoVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerVehiculos = async () => {
    try {
      const respuesta = await api.get("/vehiculos");
      setVehiculos(respuesta.data);
    } catch (error) {
      console.error("Error al obtener vehículos", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const eliminarVehiculo = async (id) => {
    if (!window.confirm("¿Eliminar este vehículo?")) return;
    try {
      await api.delete(`/vehiculos/${id}`);
      setVehiculos(vehiculos.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error al eliminar vehículo", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Vehículos</h1>
          <p>Inventario del concesionario.</p>
        </div>
        <Link to="/vehiculos/nuevo" className="btn btn-primary">
          + Agregar vehículo
        </Link>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : vehiculos.length === 0 ? (
        <div className="table-wrap">
          <div className="empty-state">Todavía no hay vehículos registrados.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patente</th>
                <th>Marca / Modelo</th>
                <th>Año</th>
                <th className="num">Precio</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((v) => (
                <tr key={v._id}>
                  <td>{v.patente}</td>
                  <td>
                    {v.marca} {v.modelo}
                  </td>
                  <td>{v.anio}</td>
                  <td className="num">{formatCLP(v.precio)}</td>
                  <td>
                    <EstadoBadge estado={v.estado} />
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/vehiculos/editar/${v._id}`} className="btn btn-ghost btn-sm">
                        Editar
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarVehiculo(v._id)}>
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

export default ListadoVehiculos;
