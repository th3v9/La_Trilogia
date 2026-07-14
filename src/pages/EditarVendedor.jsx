import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import VendedorForm from "../components/VendedorForm.jsx";

function EditarVendedor() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [vendedor, setVendedor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerVendedor = async () => {
      try {
        const respuesta = await api.get(`/vendedores/${id}`);
        setVendedor(respuesta.data);
      } catch (err) {
        setError("No se pudo cargar el vendedor");
      }
    };
    obtenerVendedor();
  }, [id]);

  const actualizarVendedor = async (datos) => {
    try {
      await api.put(`/vendedores/${id}`, datos);
      navegar("/vendedores");
    } catch (err) {
      setError(err.response?.data?.mensaje || "No se pudo actualizar el vendedor");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Editar vendedor</h1>
        </div>
        <Link to="/vendedores" className="btn btn-ghost">
          Volver
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      {!vendedor ? <p>Cargando...</p> : <VendedorForm vendedorInicial={vendedor} onGuardar={actualizarVendedor} />}
    </div>
  );
}

export default EditarVendedor;
