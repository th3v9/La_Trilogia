import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import VehiculoForm from "../components/VehiculoForm.jsx";

function CrearVehiculo() {
  const navegar = useNavigate();
  const [error, setError] = useState(null);

  const guardarVehiculo = async (datos) => {
    try {
      await api.post("/vehiculos", datos);
      navegar("/vehiculos");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo crear el vehículo");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Agregar vehículo</h1>
          <p>Se agrega al inventario con estado "disponible".</p>
        </div>
        <Link to="/vehiculos" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      <VehiculoForm onGuardar={guardarVehiculo} />
    </div>
  );
}

export default CrearVehiculo;
