const express = require('express');
const server = express()
const routerProducts = require('./src/routes/index')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

server.use(express.json());

// Rutas raiz
server.get('/', (req, res) => { 
    res.send('<h1>Bienvenid@ a NOVA</h1>')
})

// Rutas API
server.use('/api',routerProducts)

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api/products`)
})




