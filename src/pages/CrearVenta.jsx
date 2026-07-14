import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import VentaForm from "../components/VentaForm.jsx";

function CrearVenta() {
  const navegar = useNavigate();
  const [error, setError] = useState(null);

  const guardarVenta = async (datos) => {
    try {
      await api.post("/ventas", datos);
      navegar("/ventas");
    } catch (err) {
      // El backend devuelve 400 con un mensaje claro cuando el vehículo
      // ya no está disponible (por ejemplo, si dos personas lo intentan
      // vender casi al mismo tiempo).
      setError(err.response?.data?.mensaje || "No se pudo registrar la venta");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Registrar venta</h1>
          <p>El vehículo elegido pasará automáticamente a estado "vendido".</p>
        </div>
        <Link to="/ventas" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      <VentaForm onGuardar={guardarVenta} />
    </div>
  );
}

export default CrearVenta;
