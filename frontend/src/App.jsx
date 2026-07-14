import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ListadoVehiculos from "./pages/ListadoVehiculos.jsx";
import CrearVehiculo from "./pages/CrearVehiculo.jsx";
import EditarVehiculo from "./pages/EditarVehiculo.jsx";
import ListadoClientes from "./pages/ListadoClientes.jsx";
import CrearCliente from "./pages/CrearCliente.jsx";
import EditarCliente from "./pages/EditarCliente.jsx";
import ListadoVendedores from "./pages/ListadoVendedores.jsx";
import CrearVendedor from "./pages/CrearVendedor.jsx";
import EditarVendedor from "./pages/EditarVendedor.jsx";
import ListadoVentas from "./pages/ListadoVentas.jsx";
import CrearVenta from "./pages/CrearVenta.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="vehiculos" element={<ListadoVehiculos />} />
          <Route path="vehiculos/nuevo" element={<CrearVehiculo />} />
          <Route path="vehiculos/editar/:id" element={<EditarVehiculo />} />

          <Route path="clientes" element={<ListadoClientes />} />
          <Route path="clientes/nuevo" element={<CrearCliente />} />
          <Route path="clientes/editar/:id" element={<EditarCliente />} />

          <Route path="vendedores" element={<ListadoVendedores />} />
          <Route path="vendedores/nuevo" element={<CrearVendedor />} />
          <Route path="vendedores/editar/:id" element={<EditarVendedor />} />

          <Route path="ventas" element={<ListadoVentas />} />
          <Route path="ventas/nueva" element={<CrearVenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
