# Concesionario de Autos — Frontend

Panel de administración en React (Vite) que consume la API del backend. Incluye CRUD completo de Vehículos, Clientes, Vendedores y Ventas, más un resumen (dashboard) que usa los dos reportes con `aggregate()` del backend.

## Estructura

```
src/
├── api/axios.js          # cliente Axios centralizado
├── utils/format.js       # formato de precios (CLP) y fechas
├── components/           # Layout (sidebar) + formularios reutilizables
├── pages/                # una página por vista (Listado/Crear/Editar por recurso)
├── App.jsx                # todas las rutas
└── index.css               # sistema de diseño (variables + componentes)
```

## Desarrollo local

```bash
npm install
cp .env.example .env
# VITE_API_URL debe apuntar a tu backend (http://localhost:3000/api en desarrollo)
npm run dev
```

Necesitas el backend corriendo al mismo tiempo (en otra terminal, dentro de la carpeta del backend: `npm run dev`).

## Notas de diseño

- El formulario de Ventas solo muestra vehículos con `estado: "disponible"`; si el backend rechaza la venta (por ejemplo, el vehículo se vendió justo antes), el mensaje de error del backend se muestra en pantalla.
- Al eliminar una venta, el vehículo asociado vuelve a `disponible` automáticamente (lo hace el backend).
- Las ventas no tienen edición: se registran o se eliminan, siguiendo cómo funciona una transacción real.

## Build de producción

```bash
npm run build
```
Genera `dist/`, que es lo que Vercel sirve.

## Deploy

Vercel (Framework Preset: Vite), con la variable de entorno `VITE_API_URL` apuntando a la URL del backend en Render.
