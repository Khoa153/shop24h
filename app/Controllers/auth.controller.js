const db = require('../Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const refeshTokenSevices = require('../Services/refreshToken.service')
// SIGNUP
const signup = async (req, res) => {
    try {
        const userRole = await db.role.findOne({
            name: 'user'
        })

        const user = new db.user({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            confirmpassword: bcrypt.hashSync(req.body.confirmpassword, 8),
            roles: [
                userRole._id
            ]
        })
        console.log(user)
        await user.save()
        return res.status(200).json({
            message: 'Create User Success'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Error Sever'
        })
    }
}

const login = async (req, res) => {
    try {
        const exitUser = await db.user.findOne({
            username: req.body.username
        }).populate('roles')

        if (!exitUser) {
            return res.status(400).json({
                message: 'User Not Found'
            })
        }

        var password = bcrypt.compareSync(
            req.body.password,
            exitUser.password
        )

        if (!password) {
            return res.status(401).json({
                message: ' Password Invalid'
            })
        }

        const secretKey = process.env.JWT_SECRET

        const token = jwt.sign({ id: exitUser._id }, secretKey, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 60
        })

        const refreshToken = await refeshTokenSevices.createToken(exitUser)

        res.status(200).json({
            accessToken: token,
            refreshToken: refreshToken,
            expiredDate: Date.now() + 60
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Error Sever'
        })
    }
}

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (refreshToken == null) {
        return res.status(403).json({
            message: 'Refresh Token Is Required'
        })
    }

    try {
        const refreshTokenObj = await db.refreshToken.findOne({
            token: refreshToken
        })

        if (!refreshTokenObj) {
            return res.status(403).json({
                message: 'Not Found Refresh Token'
            })
        }

        if (refreshTokenObj.expiredDate.getTime() < new Date().getTime()) {
            await db.refreshToken.findByIdAndRemove(refreshTokenObj._id)

            return res.status(403).json({
                message: 'ExpiredDate Refresh Token'
            })
        }

        const secretKey = process.env.JWT_SECRET
        const newAccessToken = await jwt.sign({ id: refreshTokenObj.user }, secretKey, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 60
        })

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Internal Error Sever'
        })
    }
    console.log(refreshToken)
}

module.exports = {
    signup,
    login,
    refreshToken
}