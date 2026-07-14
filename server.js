const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'concesionario/frontend/dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'concesionario/frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
