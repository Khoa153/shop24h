const express = require('express');
const customerControllers = require('../Controllers/customer.controllers')
const customerRoutes = express.Router();

customerRoutes.post('/customer',customerControllers.postCustomer)
customerRoutes.get('/customer',customerControllers.getAllCustomer)
customerRoutes.get('/customer/:customerId',customerControllers.getByIDCustomer)
customerRoutes.put('/customer/:customerId',customerControllers.updateCustomer)
customerRoutes.delete('/customer/:customerId',customerControllers.deleteCustomer)

module.exports = customerRoutes ;