import { useState } from "react";

function VendedorForm({ vendedorInicial, onGuardar }) {
  const [form, setForm] = useState(
    vendedorInicial || { rut: "", nombre: "", apellido: "", correo: "", sucursal: "" }
  );

  const manejarCambio = (evento) => {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    onGuardar(form);
  };

  return (
    <form className="form" onSubmit={manejarEnvio}>
      <div className="field">
        <label>RUT</label>
        <input name="rut" value={form.rut} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Sucursal</label>
        <input name="sucursal" value={form.sucursal} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={manejarCambio} required />
      </div>
      <div className="field">
        <label>Apellido</label>
        <input name="apellido" value={form.apellido} onChange={manejarCambio} required />
      </div>
      <div className="field field--full">
        <label>Correo</label>
        <input name="correo" type="email" value={form.correo} onChange={manejarCambio} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Guardar vendedor
        </button>
      </div>
    </form>
  );
}

export default VendedorForm;
