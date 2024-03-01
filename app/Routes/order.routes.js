const express = require('express');
const orderControllers = require('../Controllers/order.controllers')
const orderRoutes = express.Router();

orderRoutes.post('/order',orderControllers.postOrder)
orderRoutes.get('/order',orderControllers.getAllOrder)
orderRoutes.get('/order/:order',orderControllers.getByIDOrder)
orderRoutes.put('/order/:order',orderControllers.putOrder)
orderRoutes.delete('/order/:order',orderControllers.deleteOrder)

module.exports = orderRoutes ;