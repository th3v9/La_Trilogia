import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import ClienteForm from "../components/ClienteForm.jsx";

function EditarCliente() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await api.get(`/clientes/${id}`);
        setCliente(respuesta.data);
      } catch (err) {
        setError("No se pudo cargar el cliente");
      }
    };
    obtenerCliente();
  }, [id]);

  const actualizarCliente = async (datos) => {
    try {
      await api.put(`/clientes/${id}`, datos);
      navegar("/clientes");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo actualizar el cliente");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Editar cliente</h1>
        </div>
        <Link to="/clientes" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      {!cliente ? <p>Cargando...</p> : <ClienteForm clienteInicial={cliente} onGuardar={actualizarCliente} />}
    </div>
  );
}

export default EditarCliente;
