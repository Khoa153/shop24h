const mongoose = require('mongoose')
const orderDetailModel = require('../Model/orderDetail.model')
const orderModel = require('../Model/order.model');


const postOrderDetail = async(req,res) => {
    const {productId,quanity} = req.body ;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            status:'Bad request',
            message:'ProducId ID is not valid'
        })
    }

    if(!quanity){
        return res.status(400).json({
            status:'Bad request',
            message:'quanity is Required'
        })
    }

    let newOrderDetail = {
        _id:new mongoose.Types.ObjectId(),
        quanity
    }

    try{
        const createOrderDetail = await orderDetailModel.create(newOrderDetail);
        
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId,{
            $push:{orderDetails: createOrderDetail._id}
        })
        return res.status(201).json({
            status:"Create OrderDetail Successfully",
            orderDetails:updatedOrder,
            data: createOrderDetail
        })
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message: error.message
        })
    }
}

// get All OrderDetail 
const getAllOrderDetail = async (req,res) => {
    let orderID = req.query.orderId ;

    if(orderID !== undefined && !mongoose.Types.ObjectId.isValid(orderID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is Isvalid'
        })
    }

    try{
        if(orderID === undefined){
            const orderDetailList = await orderDetailModel.find();
            if(orderDetailList && orderDetailList.length > 0){
                return res.status(200).json({
                    status:'Get All OrderDetail',
                    data:orderDetailList
                })
            }else{
                return res.status(400).json({
                    status:'Not Found Any OrderDetail'
                })
            }
        }else{
            const orderInfo = await orderModel.findById(orderID).populate('orderDetails');
            return res.status(200).json({
                status:'Get All OrderDetails of Order Successfully',
                data: orderInfo.orderDetails
            })
        }
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message:error.message
        })
    }
}

// get By ID OrderDetail
const getByIDOrderDetail = async(req,res) => {
    let orderDetailID = req.params.orderDetailId ;
    if(!mongoose.Types.ObjectId.isValid(orderDetailID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is isvalid'
        })
    }

    try{
        const orderDetailInfo = await orderDetailModel.findById(orderDetailID);
        if(orderDetailInfo){
            return res.status(200).json({
                status:'Get By ID OrderDetail',
                data:orderDetailInfo
            })
        }else{
            return res.status(400).json({
                status:'Not Found Any OrderDetail'
            })
        }
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message: error.message
        })
    }
}
// update By ID OrderDetails
const updateOrderDetail = async (req,res) => {
    let orderDetailID = req.params.orderDetailId ;
    const {quanity} = req.body ;
    if(!mongoose.Types.ObjectId.isValid(orderDetailID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is isvalid'
        })
    }

    if(!quanity){
        return res.status(400).json({
            status:'Bad request',
            message:'quanity is required'
        })
    }

    try{
        let updatedOrderDetail = {
            quanity
        }

        const updateOrderDetail = await orderDetailModel.findByIdAndUpdate(updatedOrderDetail,orderDetailID);
        if(updateOrderDetail){
            return res.status(200).json({
                status:'Update By ID OrderDetail Successfully',
                data:updateOrderDetail
            })
        }else{
            return res.status(400).json({
                status: 'Not Found Any OrderDetail'
            })
        }
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message:error.message
        })
    }
}

// delete By ID OrderDetials
const deleteOrderDetail = async(req,res) => {
    let orderDetailID = req.params.orderDetailId ;
    let orderID = req.query.orderId ;
    if(!mongoose.Types.ObjectId.isValid(orderDetailID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is isvalid'
        })
    }

    try{
        const deleteOrderDetail = await orderDetailModel.findByIdAndDelete(orderDetailID)
        if(orderID !== undefined){
            await orderModel.findByIdAndDelete(orderID,{
                $pull:{orderDetails: orderDetailID}
            })
        }
        
        if(deleteOrderDetail){
            return res.status(204).json({
                status:'Delete By ID OrderDetail Successfully',
                data:deleteOrderDetail
            })
        }else{
            return res.status(400).json({
                status:'Not Found Any Orderdetail'
            })
        }
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message: error.message
        })
    }
}

module.exports = {postOrderDetail,getAllOrderDetail,getByIDOrderDetail,updateOrderDetail,deleteOrderDetail}