const db = require('../Model')
const User = db.user
const Roles = db.ROLES

const checkduplicateUserName = async (req, res, next) => {
    try {
        const exitUser = await User.findOne({
            username: req.body.username
        })
        if (exitUser) {
            res.status(400).send({
                message: ' User Name is already in use'
            })
            return
        }
        next()
    } catch (error) {
        console.error('Connect MongoDb ', error)
        process.exit()
    }
}

module.exports = {checkduplicateUserName}