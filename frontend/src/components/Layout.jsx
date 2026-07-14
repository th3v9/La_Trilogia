import { NavLink, Outlet } from "react-router-dom";

const enlaces = [
  { to: "/", label: "Resumen", end: true },
  { to: "/vehiculos", label: "Vehículos" },
  { to: "/clientes", label: "Clientes" },
  { to: "/vendedores", label: "Vendedores" },
  { to: "/ventas", label: "Ventas" }
];

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <strong>Concesionario</strong>
          <span>Panel de administración</span>
        </div>
        <nav>
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              {enlace.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
