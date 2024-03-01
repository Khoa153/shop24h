const mongoose = require('mongoose');
const customerModel = require('../Model/customer.model');


const postCustomer = (req, res) => {
    const { fullName, phone, email, address, city, country } = req.body;
    if (!fullName) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'fullName is required'
        })
    }

    if (!phone) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'phone is required'
        })
    }

    if (!email) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'email is required'
        })
    }

    if (!address) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'address is required'
        })
    }

    if (!city) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'city is required'
        })
    }

    if (!country) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'country is required'
        })
    }

    let newCustomer = {
        _id: new mongoose.Types.ObjectId(),
        fullName,
        phone,
        email,
        address,
        city,
        country
    }

    customerModel.create(newCustomer)
        .then((data) => {
            return res.status(201).json({
                status: 'Create Customer Successfully',
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

// get All Customer 
const getAllCustomer = (req, res) => {
    customerModel.find()
        .then((data) => {
            return res.status(200).json({
                status: 'Get All Customer Successfully',
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

// get By ID Customer
const getByIDCustomer = (req, res) => {
    let customerID = req.params.customerId;
    if (!mongoose.Types.ObjectId.isValid(customerID)) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'It Is Isvalid'
        })
    }

    customerModel.findById(customerID)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Get By ID Customer',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Bad request',
                    message: 'Not Found Any Customer'
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Intetnal Error Sever',
                message: error.message
            })
        })
}

// Update By ID Customer
const updateCustomer = (req, res) => {
    let customerID = req.params.customerId;
    const { fullName, phone, email, address, city, country } = req.body;
    if (!fullName) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'fullName is required'
        })
    }

    if (!phone) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'phone is required'
        })
    }

    if (!email) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'email is required'
        })
    }

    if (!address) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'address is required'
        })
    }

    if (!city) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'city is required'
        })
    }

    if (!country) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'country is required'
        })
    }

    let updatedCustomer = {
        fullName,
        phone,
        email,
        address,
        city,
        country
    }

    customerModel.findByIdAndUpdate(customerID, updatedCustomer)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Update Customer By ID Successfully',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Bad request',
                    message: 'Not Found Any Customer'
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

// delete By ID Customer
const deleteCustomer = (req,res) => {
    let customerID = req.params.customerId ;
    if(!mongoose.Types.ObjectId.isValid(customerID)){
        return res.status(400).json({
            status:'Bad request',
            message:'It is Isvalid'
        })
    }

    customerModel.findByIdAndDelete(customerID)
    .then((data) => {
        if(data){
            return res.status(204).json({
                status:'Delete By ID Customer Successfully',
                data
            })
        }else{
            return res.status(400).json({
                status:'Not found any Customer',
                data
            })
        }
    })
    .catch((error) => {
        return res.status(500).json({
            status:'Inernal Error Sever',
            message: error.message
        })
    })

}


module.exports = { postCustomer, getAllCustomer, getByIDCustomer, updateCustomer, deleteCustomer }