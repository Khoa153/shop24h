const express = require('express')
const routesPagiNation = express.Router()
const product = require('../Model/product.model')

routesPagiNation.get('/pagination',async (req,res) => {
    const { page , limit } = req.query 
    try {
        const pagiProduct = await product.find()
        .skip((page - 1) * limit)
        .limit(limit)

        return res.json(pagiProduct)
    } catch (error) {
        return res.status(500).json({
            message:'Error Internal Sever',
            error: error.message
        })
    }
})

module.exports = routesPagiNation