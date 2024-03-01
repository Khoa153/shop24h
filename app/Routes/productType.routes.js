const express = require('express'); 

//khai bai middleware va routes
const productTypeMiddleware = require ('../Middleware/productType.middleware')
const productTypeControllers = require('../Controllers/productType.controllers')
const tokenMiddleware = require('../Middleware/verifyToken.middleware')
const productTypeRoutes = express.Router();

//
productTypeRoutes.post('/productType', tokenMiddleware.verify , productTypeControllers.postProductType)

productTypeRoutes.get('/productType',productTypeControllers.getAllProductType)

productTypeRoutes.get('/productType/:productTypeId', productTypeMiddleware.getByIDProductType , productTypeControllers.getByIDProductType)

productTypeRoutes.put('/productType/:productTypeId', productTypeMiddleware.putProductType, productTypeControllers.putProductType)

productTypeRoutes.delete('/productType/:productTypeId', productTypeMiddleware.deleteProductType, productTypeControllers.deleteProductType)


module.exports = productTypeRoutes ;