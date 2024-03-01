const express = require('express')
const orderDetailControllers = require('../Controllers/orderDetail.controllers')
const orderDetailRoutes = express.Router();

orderDetailRoutes.post('/orderDetail',orderDetailControllers.postOrderDetail)
orderDetailRoutes.get('/orderDetail',orderDetailControllers.getAllOrderDetail)
orderDetailRoutes.get('/orderDetail/:orderDetailId',orderDetailControllers.getByIDOrderDetail)
orderDetailRoutes.put('/orderDetail/:orderDetailId',orderDetailControllers.updateOrderDetail)
orderDetailRoutes.delete('/orderDetail/:orderDetailId',orderDetailControllers.deleteOrderDetail)

module.exports = orderDetailRoutes