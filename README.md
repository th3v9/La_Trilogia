# Concesionario de Autos — API

API REST para la gestión de un concesionario de autos: inventario de vehículos, clientes, vendedores y ventas. Construida con Node.js, Express, MongoDB Atlas y Mongoose.

## Modelo de datos

| Colección   | Campos principales                                              | Relación |
|-------------|-------------------------------------------------------------------|----------|
| `vehiculos` | patente, marca, modelo, anio, precio, kilometraje, estado          | — |
| `clientes`  | rut, nombre, apellido, correo, telefono                            | — |
| `vendedores`| rut, nombre, apellido, correo, sucursal                             | — |
| `ventas`    | vehiculo (ref), cliente (ref), vendedor (ref), precioFinal, formaPago, fecha | referencia a las 3 colecciones anteriores |

`estado` de un vehículo: `disponible` → `vendido` (se actualiza automáticamente al crear una venta) → puede volver a `disponible` si la venta se elimina.

## Instalación

```bash
npm install
cp .env.example .env   # completar con tus credenciales de MongoDB Atlas
npm run dev
```

## Endpoints

| Recurso     | Endpoint base       |
|-------------|---------------------|
| Vehículos   | /api/vehiculos       |
| Clientes    | /api/clientes         |
| Vendedores  | /api/vendedores       |
| Ventas      | /api/ventas           |

Cada recurso soporta GET, GET/:id, POST, PUT/:id, DELETE/:id.

Reportes adicionales:
- `GET /api/vehiculos/estadisticas/por-marca` → cantidad de vehículos disponibles por marca.
- `GET /api/ventas/reportes/por-vendedor` → cantidad de ventas y monto total vendido por vendedor (usa `$group` + `$lookup`).

## Ejemplo de flujo de venta

1. `POST /api/vehiculos` → crear un vehículo (queda `disponible`).
2. `POST /api/vendedores` y `POST /api/clientes` → crear vendedor y cliente.
3. `POST /api/ventas` con los tres `_id` anteriores → el vehículo pasa a `vendido` automáticamente.
4. Intentar crear otra venta con el mismo vehículo devuelve `400` porque ya no está `disponible`.

## Deploy

- Backend: Render (Build: `npm install`, Start: `npm start`)
- Base de datos: MongoDB Atlas
