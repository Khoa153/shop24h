const mongoose = require('mongoose');
const productTypeModel = require('../Model/productType.model');
const productModel = require('../Model/product.model')
const { error } = require('console');

// post ProductType 
const postProductType = async (req, res) => {
    // B1 Read Data
    const { productId, name, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Bad Request",
            message: "ProductId ID is not valid"
        })
    }
    // B2 validate Data
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

    // B3 Run model
    let productTypeNew = {
        _id: new mongoose.Types.ObjectId(),
        name: name,
        description: description
    }

    try {
        const createdProductType = await productTypeModel.create(productTypeNew);

        const updateProduct = await productModel.findByIdAndUpdate(productId, {
            $push: { type: createdProductType._id }
        })
        return res.status(201).json({
            status: "Create ProductType successfully",
            product: updateProduct,
            data: createdProductType
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// get All Product Type
const getAllProductType = async (req, res) => {
    const productID = req.query.productId;

    if (productID !== undefined && !mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    try {
        if (productID === undefined) {
            const productTypeList = await productTypeModel.find();

            if (productTypeList && productTypeList.length > 0) {
                return res.status(200).json({
                    status: 'Get All ProductType',
                    data: productTypeList
                })
            } else {
                return res.status(404).json({
                    status: 'Not found any productType',
                    data
                })
            }
        } else {
            const productInfo = await productModel.findById(productID).populate('type');

            return res.status(200).json({
                status: 'Get All ProductType of Product Successfully',
                data: productInfo.type
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// get By ID Product Type 
const getByIDProductType = async (req, res) => {
    let productTypeID = req.params.productTypeId;
    if (!mongoose.Types.ObjectId.isValid(productTypeID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: "Id is invalid!"
        })
    }

    try {
        const productTypeInfo = await productTypeModel.findById(productTypeID);
        if (productTypeInfo) {
            return res.status(200).json({
                status: 'Get By ID ProductType',
                data: productTypeInfo
            })
        } else {
            return res.status(404).json({
                status: 'Not found any ProductType'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// put By Id Product Type
const putProductType = async (req, res) => {
    let productTypeID = req.params.productTypeId;
    const { name, description } = req.body;

    // B2 validate Data
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

    // B3 Run model 
    try {
        let updateProductType = {
            name,
            description
        }

        const updatedProductType = await productTypeModel.findByIdAndUpdate(productTypeID, updateProductType);

        if (updatedProductType) {
            return res.status(200).json({
                status: 'Update ProductType By ID Successfully',
                data: updatedProductType
            })
        } else {
            return res.status(404).json({
                status: "Not found any ProductType"
            })
        }
    } catch {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// delete Product Type
const deleteProductType = async (req, res) => {
    let productTypeID = req.params.productTypeId;
    // Nếu muốn xóa id thừa trong mảng productType thì có thể truyền thêm productId để xóa
    let productID = req.query.productId;
    if (!mongoose.Types.ObjectId.isValid(productTypeID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    try{
        const deleteProductType = await productTypeModel.findByIdAndDelete(productTypeID);
        if(productID !== undefined){
            await productModel.findByIdAndUpdate(productID,{
                $pull: {type:productTypeID}
            })
        }

        if(deleteProductType){
            return res.status(204).json({
                status:'Delete By ID ProductType Successfully',
                data:deleteProductType
            })
        } else{
            return res.status(400).json({
                status:'Not Found Any ProductType'
            })
        }
    } catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message: error.message
        })
    }
}




module.exports = { postProductType, getAllProductType, getByIDProductType, putProductType, deleteProductType }