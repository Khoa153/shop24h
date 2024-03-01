const mongoose = require('mongoose')
const productModel = require('../Model/product.model');
const { error } = require('console');

// post Product Ref Product Type
const postProduct = async (req, res) => {
    const { name, description, imageUrl, buyPrice, promotionPrice, amount, phone, status } = req.body;
    if (!name) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Name is Required'
        })
    }

    if (!description) {
        res.status(400).json({
            status: 'Bad request',
            message: 'description is Required'
        })
    }
    if (!imageUrl) {
        res.status(400).json({
            status: 'Bad request',
            message: 'imageUrl is Required'
        })
    }

    if (!buyPrice) {
        res.status(400).json({
            status: 'Bad request',
            message: 'buyPrice is Required'
        })
    }
    if (!promotionPrice) {
        res.status(400).json({
            status: 'Bad request',
            message: 'promotionPrice is Required'
        })
    }

    if (!Number.isInteger(amount)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'amount is Required'
        })
    }

    if (!phone) {
        res.status(400).json({
            status: 'Bad request',
            message: 'phone is Required'
        })
    }

    if (!status) {
        res.status(400).json({
            status: 'Bad request',
            message: 'status is Required'
        })
    }

    let newProduct = {
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        imageUrl,
        buyPrice,
        promotionPrice,
        amount,
        phone,
        status
    }

    try {
        const dataProduct = await productModel.create(newProduct)
        return res.status(201).json({
            status: 'Create Product Successfully',
            data: dataProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }

}
// get All Product
const getAllProduct =  (req, res) => {
    // try {
    //     productModel.find()
    //     return res.status(200).json({
    //         status: 'Get All Product Successfully',
    //         data
    //     })
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 'Internal Error Sever',
    //         message: error.message
    //     })
    // }
    productModel.find()
        .then((data) => {
            return res.status(200).json({
                status: 'Get All Product Successfully',
                data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}
// get By ID product
const getByIDProduct = (req, res) => {
    let productID = req.params.productId;
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    productModel.findById(productID)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Get By ID Product',
                    data
                })
            } else {
                return res.status(404).json({
                    status: 'Not Found Product Type',
                    data
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

// put By ID product
const putByIDProduct = (req, res) => {
    let productID = req.params.productId;
    const { name, description, imageUrl, buyPrice, promotionPrice, amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    if (!name) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Name is Required'
        })
    }

    if (!description) {
        res.status(400).json({
            status: 'Bad request',
            message: 'description is Required'
        })
    }
    if (!imageUrl) {
        res.status(400).json({
            status: 'Bad request',
            message: 'imageUrl is Required'
        })
    }

    if (!buyPrice) {
        res.status(400).json({
            status: 'Bad request',
            message: 'buyPrice is Required'
        })
    }
    if (!promotionPrice) {
        res.status(400).json({
            status: 'Bad request',
            message: 'promotionPrice is Required'
        })
    }

    if (!Number.isInteger(amount)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'amount is Required'
        })
    }

    let updateProduct = {
        name,
        description,
        imageUrl,
        buyPrice,
        promotionPrice,
        amount
    }

    productModel.findByIdAndUpdate(productID, updateProduct)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Put Product By ID Successfully',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Not Found any Product',
                    data
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

// delete Product
const deleteProduct = (req, res) => {
    let productID = req.params.productId;
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    productModel.findByIdAndDelete(productID)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Delete Product By ID Successfully',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Not Found any Product',
                    data
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

const getAllLimitProduct = async (req, res) => {
    try {
        const { limit } = req.query
        if (limit) {
            const product = await productModel.find().limit(parseInt(limit))
            res.json(product)
        } else {
            const product = await productModel.find()
            req.json(product)
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}



module.exports = { postProduct, getAllProduct, getByIDProduct, putByIDProduct, deleteProduct, getAllLimitProduct }