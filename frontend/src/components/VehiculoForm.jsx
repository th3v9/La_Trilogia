import { useState } from "react";

function VehiculoForm({ vehiculoInicial, onGuardar }) {
  const [form, setForm] = useState(
    vehiculoInicial || {
      patente: "",
      marca: "",
      modelo: "",
      anio: new Date().getFullYear(),
      precio: "",
      kilometraje: 0,
      estado: "disponible"
    }
  );

  const manejarCambio = (evento) => {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    onGuardar({
      ...form,
      anio: Number(form.anio),
      precio: Number(form.precio),
      kilometraje: Number(form.kilometraje)
    });
  };

  return (
    <form className="form" onSubmit={manejarEnvio}>
      <div className="field">
        <label>Patente</label>
        <input name="patente" value={form.patente} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Marca</label>
        <input name="marca" value={form.marca} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Modelo</label>
        <input name="modelo" value={form.modelo} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Año</label>
        <input name="anio" type="number" value={form.anio} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Precio (CLP)</label>
        <input name="precio" type="number" min="0" value={form.precio} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Kilometraje</label>
        <input name="kilometraje" type="number" min="0" value={form.kilometraje} onChange={manejarCambio} />
      </div>
      {vehiculoInicial && (
        <div className="field">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={manejarCambio}>
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      )}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Guardar vehículo
        </button>
      </div>
    </form>
  );
}

export default VehiculoForm;
