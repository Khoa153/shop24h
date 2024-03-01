const db = require('../Model')
const jwt = require('jsonwebtoken')
const User = db.user;
const Role = db.role;

const verify = async (req,res,next) => {
    try {
        console.log('Verify Token ...')
        let token = req.headers['x-access-token']
        console.log(token)

        if(!token){
            return res.status(401).send({
                message:'Not Found Token'
            })
        }

        const secretKey = process.env.JWT_SECRET

        const verify = await jwt.verify(token,secretKey)
        console.log(verify)

        if(!verify){
            return res.status(401).send({
                message:'X-Access illegal'
            })
        }

        const user = await  User.findById(verify.id).populate('roles')

        console.log(user)
        req.user = user 
        next()
    } catch (error) {
        console.error(error)
        return res.status(403).json({
            message:'Access Token expired'
        })
    }
}


const checkUser = async (req,res,next) => {
    console.log('Check User')
    const userRole = req.user.roles

    if(!userRole){
        for(var i = 0 ; i < userRole.length ; i++){
            if(userRole[i].name == 'user') {
                console.log('Authorization')
                next()
                return
            }
        }
    }

    console.log('Unthorization')
    return res.status(401).send({
        message:"You do not have Access"
    })
}

module.exports = {
    verify,
    checkUser
}