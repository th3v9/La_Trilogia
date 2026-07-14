import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import ClienteForm from "../components/ClienteForm.jsx";

function CrearCliente() {
  const navegar = useNavigate();
  const [error, setError] = useState(null);

  const guardarCliente = async (datos) => {
    try {
      await api.post("/clientes", datos);
      navegar("/clientes");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo crear el cliente");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Agregar cliente</h1>
        </div>
        <Link to="/clientes" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      <ClienteForm onGuardar={guardarCliente} />
    </div>
  );
}

export default CrearCliente;
