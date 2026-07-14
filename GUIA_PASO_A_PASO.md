# Guía paso a paso: Concesionario de Autos

Proyecto fullstack para un concesionario de autos. El repositorio publicado en GitHub contiene el backend de la API en la raíz y el frontend React en `frontend/`.

## Estructura del repositorio

```text
.
├── src/         # backend Node.js + Express + MongoDB
└── frontend/    # frontend React + Vite
```

## 1. Backend

### Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

### Recursos

| Recurso | Ruta base |
|---|---|
| Vehículos | `/api/vehiculos` |
| Clientes | `/api/clientes` |
| Vendedores | `/api/vendedores` |
| Ventas | `/api/ventas` |

Cada recurso soporta GET, GET por ID, POST, PUT y DELETE.

### Reglas de negocio

- Un vehículo inicia en estado `disponible`.
- Al crear una venta, el vehículo cambia a `vendido`.
- Si se elimina la venta, el vehículo vuelve a `disponible`.

### Reportes

- `GET /api/vehiculos/estadisticas/por-marca`
- `GET /api/ventas/reportes/por-vendedor`

## 2. Frontend

### Instalación

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

El frontend consume la API mediante `VITE_API_URL`.

### Funcionalidades

- Dashboard con resumen general.
- CRUD visual de vehículos, clientes y vendedores.
- Registro de ventas con selects para vehículo, cliente y vendedor.
- Validación de disponibilidad de vehículos al vender.

## 3. MongoDB Atlas

1. Crear cluster M0.
2. Crear usuario de base de datos.
3. Permitir acceso de red según necesidad del proyecto.
4. Copiar la cadena de conexión en `.env`.

## 4. Despliegue

### Backend

- Publicar en Render.
- Build: `npm install`
- Start: `npm start`

### Frontend

- Publicar en Vercel.
- Variable de entorno: `VITE_API_URL` apuntando al backend publicado.

## 5. Flujo recomendado de trabajo

1. Crear vehículos, clientes y vendedores.
2. Registrar ventas con las referencias de los documentos anteriores.
3. Probar el backend con Postman o Thunder Client.
4. Verificar que el frontend consume correctamente la API.
5. Subir los cambios con commits separados para que el historial quede claro.

## 6. Evidencia para entrega

- Historial de commits en GitHub.
- Capturas del backend y del frontend funcionando.
- Evidencia de MongoDB Atlas.
- Documento de despliegue en Render y Vercel.