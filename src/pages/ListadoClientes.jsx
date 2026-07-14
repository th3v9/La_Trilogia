import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

function ListadoClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerClientes = async () => {
    try {
      const respuesta = await api.get("/clientes");
      setClientes(respuesta.data);
    } catch (error) {
      console.error("Error al obtener clientes", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Eliminar este cliente?")) return;
    try {
      await api.delete(`/clientes/${id}`);
      setClientes(clientes.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error al eliminar cliente", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p>Personas que han comprado o cotizado un vehículo.</p>
        </div>
        <Link to="/clientes/nuevo" className="btn btn-primary">
          + Agregar cliente
        </Link>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : clientes.length === 0 ? (
        <div className="table-wrap">
          <div className="empty-state">Todavía no hay clientes registrados.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c._id}>
                  <td>{c.rut}</td>
                  <td>
                    {c.nombre} {c.apellido}
                  </td>
                  <td>{c.correo}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/clientes/editar/${c._id}`} className="btn btn-ghost btn-sm">
                        Editar
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarCliente(c._id)}>
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

export default ListadoClientes;
