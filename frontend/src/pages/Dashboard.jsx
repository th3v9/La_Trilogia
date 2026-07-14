import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { formatCLP } from "../utils/format.js";

function Dashboard() {
  const [vehiculos, setVehiculos] = useState([]);
  const [porMarca, setPorMarca] = useState([]);
  const [porVendedor, setPorVendedor] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [resVehiculos, resMarca, resVendedor] = await Promise.all([
          api.get("/vehiculos"),
          api.get("/vehiculos/estadisticas/por-marca"),
          api.get("/ventas/reportes/por-vendedor")
        ]);
        setVehiculos(resVehiculos.data);
        setPorMarca(resMarca.data);
        setPorVendedor(resVendedor.data);
      } catch (err) {
        setError("No se pudo conectar con la API. Revisa que el backend esté corriendo.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  if (cargando) return <p>Cargando resumen...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const disponibles = vehiculos.filter((v) => v.estado === "disponible").length;
  const vendidos = vehiculos.filter((v) => v.estado === "vendido").length;
  const maxMarca = Math.max(1, ...porMarca.map((m) => m.totalDisponibles));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Resumen</h1>
          <p>Estado general del concesionario.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span>Vehículos en inventario</span>
          <strong>{vehiculos.length}</strong>
        </div>
        <div className="stat-card">
          <span>Disponibles</span>
          <strong>{disponibles}</strong>
        </div>
        <div className="stat-card">
          <span>Vendidos</span>
          <strong>{vendidos}</strong>
        </div>
      </div>

      <div className="report-grid">
        <div className="card">
          <h2 style={{ fontSize: "1.05rem", marginBottom: 14 }}>Disponibles por marca</h2>
          {porMarca.length === 0 ? (
            <p className="muted">Sin datos todavía.</p>
          ) : (
            porMarca.map((m) => (
              <div className="bar-row" key={m._id}>
                <span>{m._id}</span>
                <div className="track">
                  <div
                    className="fill"
                    style={{ width: `${(m.totalDisponibles / maxMarca) * 100}%` }}
                  />
                </div>
                <span>{m.totalDisponibles}</span>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1.05rem", marginBottom: 14 }}>Ventas por vendedor</h2>
          {porVendedor.length === 0 ? (
            <p className="muted">Todavía no hay ventas registradas.</p>
          ) : (
            porVendedor.map((v) => (
              <div className="rank-row" key={v.vendedorId}>
                <div>
                  <div>
                    {v.nombre} {v.apellido}
                  </div>
                  <div className="muted">
                    {v.sucursal} · {v.cantidadVentas} venta{v.cantidadVentas !== 1 ? "s" : ""}
                  </div>
                </div>
                <strong>{formatCLP(v.montoTotal)}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
