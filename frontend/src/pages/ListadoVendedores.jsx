import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

function ListadoVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerVendedores = async () => {
    try {
      const respuesta = await api.get("/vendedores");
      setVendedores(respuesta.data);
    } catch (error) {
      console.error("Error al obtener vendedores", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerVendedores();
  }, []);

  const eliminarVendedor = async (id) => {
    if (!window.confirm("¿Eliminar este vendedor?")) return;
    try {
      await api.delete(`/vendedores/${id}`);
      setVendedores(vendedores.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error al eliminar vendedor", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Vendedores</h1>
          <p>Equipo de ventas del concesionario.</p>
        </div>
        <Link to="/vendedores/nuevo" className="btn btn-primary">
          + Agregar vendedor
        </Link>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : vendedores.length === 0 ? (
        <div className="table-wrap">
          <div className="empty-state">Todavía no hay vendedores registrados.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Sucursal</th>
                <th>Correo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vendedores.map((v) => (
                <tr key={v._id}>
                  <td>{v.rut}</td>
                  <td>
                    {v.nombre} {v.apellido}
                  </td>
                  <td>{v.sucursal}</td>
                  <td>{v.correo}</td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/vendedores/editar/${v._id}`} className="btn btn-ghost btn-sm">
                        Editar
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarVendedor(v._id)}>
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

export default ListadoVendedores;
