require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

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

const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
    console.log('Peticion recibida')
    res.status(200).sendFile('index.html', {root: __dirname})
    next()
})