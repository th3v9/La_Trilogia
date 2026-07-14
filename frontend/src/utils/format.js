export const formatCLP = (valor) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(valor ?? 0);

export const formatFecha = (valor) => {
  if (!valor) return "—";
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(valor));
};
