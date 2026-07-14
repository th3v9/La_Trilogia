# Concesionario de Autos — API

API REST para gestionar vehículos, clientes, vendedores y ventas de un concesionario. El backend utiliza Node.js, Express, MongoDB Atlas y Mongoose.

## Modelo de datos

| Colección | Campos principales | Relación |
|---|---|---|
| `vehiculos` | patente, marca, modelo, anio, precio, kilometraje, estado | — |
| `clientes` | rut, nombre, apellido, correo, telefono | — |
| `vendedores` | rut, nombre, apellido, correo, sucursal | — |
| `ventas` | vehiculo, cliente, vendedor, precioFinal, formaPago, fecha | referencias a las otras colecciones |

El estado de un vehículo cambia de `disponible` a `vendido` cuando se crea una venta. Si la venta se elimina, el vehículo vuelve a quedar `disponible`.

## Instalación

1. Ejecutar:

```bash
npm install
```

2. Crear un archivo `.env` tomando como ejemplo `.env.example` y completar la conexión de MongoDB Atlas.

3. Iniciar el servidor:

```bash
npm run dev
```

## Endpoints

| Recurso | Endpoint base |
|---|---|
| Vehículos | `/api/vehiculos` |
| Clientes | `/api/clientes` |
| Vendedores | `/api/vendedores` |
| Ventas | `/api/ventas` |

Cada recurso tiene las operaciones GET, GET por ID, POST, PUT y DELETE.

Reportes:

- `GET /api/vehiculos/estadisticas/por-marca`
- `GET /api/ventas/reportes/por-vendedor`

## Flujo básico de una venta

1. Crear un vehículo.
2. Crear un cliente y un vendedor.
3. Crear la venta utilizando los `_id` de los tres documentos.
4. El backend verifica que las referencias existan y que el vehículo esté disponible.
5. Al registrar la venta, el vehículo cambia a estado `vendido`.

## Despliegue

- Backend: Render.
- Base de datos: MongoDB Atlas.
- Frontend: pendiente de incorporación y despliegue en Vercel.

## Evidencias pendientes para la entrega

- URL pública del backend y del frontend.
- Diagrama de arquitectura.
- Evidencias de configuración de MongoDB Atlas.
- Proyecto Jira con historias de usuario y tareas.
- Estrategia de ramas y participación de todos los integrantes.
- Pruebas del CRUD ejecutadas con Thunder Client o Postman.
