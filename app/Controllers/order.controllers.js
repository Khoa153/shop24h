const mongoose = require('mongoose');
const orderModel = require('../Model/order.model')
const customerModel = require('../Model/customer.model');
const { create } = require('../Model/product.model');

const postOrder = async (req, res) => {
    const { customerId, orderDate, shippedDate, note, cost } = req.body;
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'Customer ID is not valid'
        })
    }

    if (!shippedDate) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'shippedDate is Required'
        })
    }

    if (!note) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'note is Required'
        })
    }

    if (!Number.isInteger(cost)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'cost is required'
        })
    }

    let newOrder = {
        _id: new mongoose.Types.ObjectId(),
        orderDate,
        shippedDate,
        note,
        cost
    }

    try {
        const createOrder = await orderModel.create(newOrder);

        const updateCustomer = await customerModel.findByIdAndUpdate(customerId, {
            $push: { orders: createOrder._id }
        })
        return res.status(201).json({
            status: 'Create Order Successfully',
            customer: updateCustomer,
            data: createOrder
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}
// get All Order 
const getAllOrder = async (req, res) => {
    let customerID = req.query.customerId;

    if (customerID !== undefined && !mongoose.Types.ObjectId.isValid(customerID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: ' It is Isvalid'
        })
    }

    try {
        if (customerID === undefined) {
            const orderList = await orderModel.find();
            if (orderList && orderList.length > 0) {
                return res.status(200).json({
                    status: 'Get All Order',
                    data: orderList
                })
            } else {
                return res.status(400).json({
                    status: 'Not Found Any Order',
                    data
                })
            }
        } else {
            const customerInfo = await customerModel.findById(customerID).populate('orders');

            return res.status(200).json({
                status: 'Get All Order of Customer Successfully',
                data: customerInfo.orders
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// get By ID Order
const getByIDOrder = async (req, res) => {
    let orderID = req.params.orderId;
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It is isvalid'
        })
    }

    try {
        const orderInfo = await orderModel.findById(orderID);
        if (orderInfo) {
            return res.status(200).json({
                status: 'Get By ID Order Successfully',
                data: orderInfo
            })
        } else {
            return res.status(400).json({
                status: 'Not Found Any Order',
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// put By ID Order
const putOrder = async (req, res) => {
    let orderID = req.params.orderId;
    const { customerId, orderDate, shippedDate, note, cost } = req.body;


    if (!shippedDate) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'shippedDate is Required'
        })
    }

    if (!note) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'note is Required'
        })
    }

    if (!Number.isInteger(cost)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'cost is required'
        })
    }


    try {
        let updateOrder = {
            orderDate,
            shippedDate,
            note,
            cost
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(updateOrder, orderID);
        if (updatedOrder) {
            return res.status(200).json({
                status: 'Update Order Successfully',
                data: updatedOrder
            })
        } else {
            return res.status(400).json({
                status: 'Not Found Any Order'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Internal Error Sever',
            message: error.message
        })
    }
}

// delete Order By ID
const deleteOrder = async (req, res) => {
    let orderID = req.params.orderId;
    let customerID = req.query.customerId;

    if(!mongoose.Types.ObjectId.isValid(orderID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is isvalid'
        })
    }

    try{
        const deleteOrder = await orderModel.findByIdAndDelete(orderID);
        if(customerID !== undefined){
           await customerModel.findByIdAndDelete(customerID,{
            $pull:{orders: orderID}
           })
        }

        if(deleteOrder){
            return res.status(204).json({
                status:'Delete Order By ID Successfully',
                data: deleteOrder
            })
        }else{
            return res.status(400).json({
                status:'Not Found Any Order'
            })
        }
    }catch(error){
        return res.status(500).json({
            status:'Internal Error Sever',
            message: error.message
        })
    }
}

module.exports = {postOrder,getAllOrder,getByIDOrder,putOrder,deleteOrder}