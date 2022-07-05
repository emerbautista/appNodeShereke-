require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const axios = require('axios')

mongoose.connect(
    `mongodb+srv://emerbautista:${process.env.MONGO_DB_PASS}@clusterappshereke.yxnnhjn.mongodb.net/stock-app?retryWrites=true&w=majority`
).then((result) => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`)
    })
    console.log('Conexion exitosa')
})
.catch((err) => console.log(err))

const productSchema = mongoose.Schema(
    {
        name: {type: String, require: true},
        price: Number,
    },
    {timestamps: true}
)

const Product = mongoose.model('Product', productSchema)

app.use(express.json())

app.post('/api/v1/products', (req, res) => {

    const newProduct = new Product(req.body)

    newProduct.save().then((result) => {
        res.status(201).json({ok: true})
    })
    .catch((err) => console.log(err))
})

app.get('/', (req, res, next) => {
    
    const pokeapi = 'https://pokeapi.co/api/v2/pokemon'

    axios(`${pokeapi}/charmander`)
    .then((axiosResponse) => {
        const pokemon = axiosResponse.data
        console.log({pokemon})
        const html = `
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>App de productos</title>
            <link rel="stylesheet" href="style.css">
            <script src="index.js" defer></script>
        </head>
        <body>
            <h1>Primera app de productos</h1>
            <a href="about.html">Sobre Emer</a>
            <div class="form-container">
                <input type="text" id="productName" placeholder="Nombre del producto">        
                <input type="number" id="productPrice" placeholder="Precio del producto">        
                <button>Crear producto</button>
                <h2>Detalle de productos</h2>
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.sprites.front_default}" alt="Esta es una imagen del pokemon ${pokemon.name}">
                <span>#${pokemon.id}</span>     
            </div>
        </body>`
        res.send(html)
    })

    next()
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT

app.get('/', (req, res, next) => {
    console.log('Peticion recibida')
    res.status(200).sendFile('index.html', {root: __dirname})
    next()
})