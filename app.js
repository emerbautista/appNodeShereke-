require('dotenv').config()

const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    console.log('Peticion recibida')
    res.status(200).send('Hola mundo')
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})