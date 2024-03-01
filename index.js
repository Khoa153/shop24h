const express = require('express');
const mongoose = require('mongoose');
const db = require('./app/Model')
const productTypeRoutes = require('./app/Routes/productType.routes');
const productRoutes = require('./app/Routes/product.routes');
const customerRoutes = require('./app/Routes/customer.routes');
const orderRoutes = require('./app/Routes/order.routes');
const orderDetailRoutes = require('./app/Routes/orderDetail.routes');
const cors = require("cors");
const { initial } = require('./data');
const routes = require('./app/Routes/auth.routes');
const routesPagiNation = require('./app/Routes/pagination');
const app = express();
app.use(express.json())
require('dotenv').config();

app.use(cors())
app.use(function (req, res, next) {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
});
app.use(express.json())
const port = process.env.ENV_PORT || 8000

//ket noi mongoose
// kết nối mongoose
db.mongoose
    .connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`)
    .then(() => {
        console.log("Connected to Mongo Successfully")
        initial()
    })
    .catch(error => handleError(error));
// initial


//

app.use('/', (req, res, next) => {
    let today = new Date();
    console.log("Current today : ", today);
    next();
})


app.use('/', productTypeRoutes)
app.use('/', productRoutes)
app.use('/', customerRoutes)
app.use('/', orderRoutes)
app.use('/', orderDetailRoutes)
app.use('/',routesPagiNation)
app.use('/auth',routes)
app.use('/',routesPagiNation)



app.listen(port, () => {
    console.log("App Listening on Port", port)
})