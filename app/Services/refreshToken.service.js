const db = require('../Model')
const { v4: uuidv4 } = require('uuid')


const createToken = async (user) => {
    let expriedAt = new Date()

    expriedAt.setSeconds(
        expriedAt.getSeconds() + process.env.JWT_REFESH_EXPIRATION
    )

    let token = uuidv4()

    let refreshTokenObj = new db.refreshToken({
        token: token,
        user: user._id,
        expiredDate: expriedAt.getTime()
    })

    const refreshToken = await refreshTokenObj.save()

    return refreshToken.token
}

module.exports = {
    createToken
}