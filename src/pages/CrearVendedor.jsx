import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import VendedorForm from "../components/VendedorForm.jsx";

function CrearVendedor() {
  const navegar = useNavigate();
  const [error, setError] = useState(null);

  const guardarVendedor = async (datos) => {
    try {
      await api.post("/vendedores", datos);
      navegar("/vendedores");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo crear el vendedor");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Agregar vendedor</h1>
        </div>
        <Link to="/vendedores" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      <VendedorForm onGuardar={guardarVendedor} />
    </div>
  );
}

export default CrearVendedor;
