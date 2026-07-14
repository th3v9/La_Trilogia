# Guía paso a paso: Concesionario de Autos + GitHub (TI3032, Unidad 4)

Proyecto: API + frontend para un **concesionario de autos**, con inventario de vehículos, clientes, vendedores y ventas. El código ya está generado en `backend/` y `frontend/`; aquí tienes el plan de trabajo y la secuencia de commits para que tu historial de GitHub muestre una progresión real (evidencia que pide la rúbrica ajustada: **"Repositorio GitHub con historial de commits de todos los integrantes"**).

## 0. Por qué 4 colecciones y no 3

El ejemplo original de tus apuntes (Alumnos/Docentes/Asignaturas) usaba una sola relación 1:N. Para un concesionario, el diseño más realista es:

| Colección   | Rol                                   | Se relaciona con |
|-------------|----------------------------------------|-------------------|
| `vehiculos` | Inventario                              | — |
| `clientes`  | Compradores                             | — |
| `vendedores`| Personal de ventas                      | — |
| `ventas`    | Registro de cada transacción            | referencia a **vehículo + cliente + vendedor** |

`Ventas` es el equivalente de `Asignaturas` (la colección con `ObjectId`), pero en vez de referenciar una sola colección, referencia tres — así puedes mostrar `populate()` múltiple y un `$lookup`/`$group` más rico. Esto no cambia la cantidad de criterios de la rúbrica (24) ni su ponderación: sigue siendo "modelo NoSQL + colecciones + documentos + CRUD + relaciones + consultas avanzadas", solo aplicado a un dominio distinto.

### Ejemplos de documentos

```json
// vehiculos
{ "_id": "...", "patente": "ABCD12", "marca": "Toyota", "modelo": "Corolla",
  "anio": 2023, "precio": 15990000, "kilometraje": 8000, "estado": "disponible" }

// clientes
{ "_id": "...", "rut": "11111111-1", "nombre": "Juan", "apellido": "Pérez",
  "correo": "juan@correo.cl", "telefono": "+56911111111" }

// vendedores
{ "_id": "...", "rut": "99999999-9", "nombre": "Carla", "apellido": "Soto",
  "correo": "carla@concesionario.cl", "sucursal": "Sucursal Centro" }

// ventas
{ "_id": "...", "vehiculo": "ObjectId", "cliente": "ObjectId", "vendedor": "ObjectId",
  "precioFinal": 15500000, "formaPago": "credito", "fecha": "2026-07-06" }
```

### Un detalle que "no se ve" pero rompe proyectos reales

Mongoose pluraliza el nombre del modelo para nombrar la colección, con reglas de inglés. `Docente → docentes` y `Alumno → alumnos` funcionaban por casualidad (terminan en vocal). Pero `Vendedor` (termina en consonante) se convierte en `vendedors`, no `vendedores`. Si tu `$lookup` apunta a `"vendedores"` y la colección real es `"vendedors"`, Mongo **no lanza ningún error**: simplemente devuelve un arreglo vacío, y puedes perder horas debuggeando. La solución (ya aplicada en `models/Vendedor.js`) es fijar el nombre de la colección explícitamente:

```js
mongoose.model("Vendedor", vendedorSchema, "vendedores");
```

Vale la pena mencionar este detalle en tu informe técnico como una decisión de diseño consciente.

## 1. Preparar el repositorio

```bash
mkdir concesionario-api
cd concesionario-api
git init
git branch -M main
git checkout -b develop
```

Estrategia de ramas (criterio **G.9**): `main` estable, `develop` de integración, `feature/nombre` por funcionalidad (ej. `feature/crud-vehiculos`, `feature/modulo-ventas`).

## 2. Copiar el proyecto backend

Copia el contenido de `backend/` a tu repo:

```bash
npm install
cp .env.example .env
# Edita .env con tu URI real de MongoDB Atlas (base sugerida: concesionario_autos)
```

## 3. Secuencia de commits recomendada

```bash
# 1) Estructura base
git add package.json .gitignore .env.example README.md
git commit -m "chore: inicializa proyecto Node.js con Express y estructura base"

# 2) Servidor Express
git add src/app.js src/server.js
git commit -m "feat: crea servidor Express con ruta de prueba"

# 3) Conexión a MongoDB Atlas
git add src/config/db.js
git commit -m "feat: conecta la aplicación a MongoDB Atlas con Mongoose"

# 4) Modelos
git add src/models/Vehiculo.js
git commit -m "feat: agrega modelo Vehiculo con validaciones y estado de inventario"

git add src/models/Cliente.js
git commit -m "feat: agrega modelo Cliente"

git add src/models/Vendedor.js
git commit -m "feat: agrega modelo Vendedor (colección fijada explícitamente)"

git add src/models/Venta.js
git commit -m "feat: agrega modelo Venta con referencias a Vehiculo, Cliente y Vendedor"

# 5) CRUD Vehículos
git add src/controllers/vehiculoController.js src/routes/vehiculoRoutes.js
git commit -m "feat: implementa CRUD completo de Vehiculos"

# 6) CRUD Clientes
git add src/controllers/clienteController.js src/routes/clienteRoutes.js
git commit -m "feat: implementa CRUD completo de Clientes"

# 7) CRUD Vendedores
git add src/controllers/vendedorController.js src/routes/vendedorRoutes.js
git commit -m "feat: implementa CRUD completo de Vendedores"

# 8) Módulo de Ventas: relación + regla de negocio
git add src/controllers/ventaController.js src/routes/ventaRoutes.js
git commit -m "feat: implementa CRUD de Ventas con populate() y actualizacion de estado del vehiculo"

# 9) Consultas avanzadas (aggregate + lookup)
git commit -m "feat: agrega reportes de vehiculos por marca y ventas por vendedor (aggregate + \$lookup)" --allow-empty
# (ya están incluidos en los controladores de arriba; sepáralos con git add -p
#  si quieres un commit propio solo para las funciones de reporte)

# 10) Middleware global de errores y CORS
git add src/middlewares/errorHandler.js src/middlewares/notFound.js
git commit -m "feat: agrega middleware global de manejo de errores y 404"

git add src/app.js
git commit -m "feat: configura CORS restringido por variable de entorno"

# Merge
git checkout develop && git merge feature/nombre-que-usaste
git checkout main && git merge develop
```

## 4. Subir a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/concesionario-api.git
git push -u origin main
git push -u origin develop
```

## 5. MongoDB Atlas (criterios G.13–G.16)

1. Cuenta y Cluster M0 (Free Tier), proveedor AWS, región São Paulo.
2. Security → Network Access → `0.0.0.0/0`.
3. Security → Database Access → usuario, ej. `admin_concesionario`.
4. Clusters → Connect → Drivers → Node.js → copiar connection string.
5. Pegar en `.env`, agregando el nombre de la base `concesionario_autos`.
6. `git commit -m "docs: documenta configuración de MongoDB Atlas"` (README, sin credenciales).

## 6. Probar el flujo completo en Postman/Thunder Client

```
POST /api/vehiculos     { patente, marca, modelo, anio, precio, kilometraje }
POST /api/vendedores    { rut, nombre, apellido, correo, sucursal }
POST /api/clientes      { rut, nombre, apellido, correo, telefono }
POST /api/ventas        { vehiculo: "<id>", cliente: "<id>", vendedor: "<id>",
                          precioFinal, formaPago: "contado" }
GET  /api/vehiculos/:id                     -> estado ahora es "vendido"
POST /api/ventas (mismo vehiculo otra vez)  -> 400, ya no está disponible
GET  /api/ventas/reportes/por-vendedor      -> total y monto por vendedor
```

## 7. Deploy backend en Render

1. Sube el repo a GitHub.
2. Render → New → Web Service → conectar repo → rama `main`.
3. Build: `npm install` · Start: `npm start`.
4. Variables de entorno: `PORT`, `MONGODB_URI`, `FRONTEND_URL`.
5. Probar: `GET https://tu-servicio.onrender.com/api/vehiculos`.

## 8. Frontend (opcional)

```bash
npm create vite@latest concesionario-web -- --template react
cd concesionario-web
npm install axios react-router-dom
```

Copia `frontend/src/` sobre lo generado por Vite, y sigue el mismo patrón de commits (`chore: inicializa`, `feat: cliente Axios`, `feat: listado`, `feat: crear`, `feat: editar`, `feat: router`). El CRUD de Vehículos ya viene resuelto como plantilla.

Actividad práctica: replica el patrón para Clientes y Vendedores, y arma el formulario de Ventas con tres `<select>` (filtrando vehículos por `estado: "disponible"`).

Deploy en Vercel con `VITE_API_URL` apuntando a Render, y luego actualiza `FRONTEND_URL` en Render con la URL real de Vercel.

## 9. Checklist final

- [ ] Repo con historial de commits (no un único commit).
- [ ] `.env` NO subido a GitHub.
- [ ] README con instrucciones de instalación y despliegue.
- [ ] URL pública del backend (Render) funcionando.
- [ ] URL pública del frontend (Vercel), si aplica.
- [ ] Proyecto Jira (Product Backlog, Sprint Backlog, Historias de Usuario).
- [ ] Diagrama de arquitectura (Cliente Web → App → MongoDB Atlas → GitHub → Cloud).
