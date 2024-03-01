const express = require('express');
const productControllers = require('../Controllers/product.controllers')
const productRoutes = express.Router()

productRoutes.post('/product', productControllers.postProduct)

productRoutes.get('/product',productControllers.getAllProduct)

productRoutes.get('/product/:productId',productControllers.getByIDProduct)

productRoutes.put('/product/:productId',productControllers.putByIDProduct)

productRoutes.delete('/product/:productId',productControllers.deleteProduct)

productRoutes.get('/limit-product', productControllers.getAllLimitProduct)


module.exports = productRoutes ;