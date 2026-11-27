import 'dotenv/config'
const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('./src/routes/productos.routes')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar la base de datos");
    } else {
        console.log("Base de datos conectada");
    }
});

app.use(cors());
app.use(express.json());
app.use('/api/productos', productosRoutes);
