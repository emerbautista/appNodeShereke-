const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('Peticion recibida')
    res.status(200).send('Hola mundo')
})

app.listen(4000, () => {
    console.log('Servidor escuchando')
})