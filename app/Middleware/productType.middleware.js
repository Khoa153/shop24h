const getAllProductType = (req, res, next) => {
    console.log("Get All Product Type")
    next();
}

const getByIDProductType = (req, res, next) => {
    console.log('Get By ID Is Is Product Type')
    next()
}

const postProductType = (req, res, next) => {
    console.log("Post Product Type Successfully")
    next()
}

const putProductType = (req, res, next) => {
    console.log("PUT Product Type Successfully")
    next()
}


const deleteProductType = (req, res, next) => {
    console.log("Delete Product Type Successfully")
    next()
}

module.exports = {
    getAllProductType,
    getByIDProductType,
    postProductType,
    putProductType,
    deleteProductType
}