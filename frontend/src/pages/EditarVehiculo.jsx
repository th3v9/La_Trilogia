import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import VehiculoForm from "../components/VehiculoForm.jsx";

function EditarVehiculo() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const respuesta = await api.get(`/vehiculos/${id}`);
        setVehiculo(respuesta.data);
      } catch (err) {
        setError("No se pudo cargar el vehículo");
      }
    };
    obtenerVehiculo();
  }, [id]);

  const actualizarVehiculo = async (datos) => {
    try {
      await api.put(`/vehiculos/${id}`, datos);
      navegar("/vehiculos");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo actualizar el vehículo");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Editar vehículo</h1>
        </div>
        <Link to="/vehiculos" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      {!vehiculo ? <p>Cargando...</p> : <VehiculoForm vehiculoInicial={vehiculo} onGuardar={actualizarVehiculo} />}
    </div>
  );
}

export default EditarVehiculo;
