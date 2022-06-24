require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
    console.log('Peticion recibida')
    res.status(200).sendfile('index.html', {root: __dirname})
    next()
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})