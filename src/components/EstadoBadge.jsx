function EstadoBadge({ estado }) {
  const variante =
    estado === "disponible" ? "badge--ok" : estado === "reservado" ? "badge--warn" : "badge--muted";

  return <span className={`badge ${variante}`}>{estado}</span>;
}

export default EstadoBadge;
