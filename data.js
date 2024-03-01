const db = require('./app/Model')
const initial = async () => {
    try {
        const roleModel = db.role

        const count = await roleModel.estimatedDocumentCount()

        if (count === 0) {
            await new roleModel({
                name: db.ROLES[0]
            }).save()

            await new roleModel({
                name: db.ROLES[1]
            }).save()

            await new roleModel({
                name: db.ROLES[2]
            }).save()
        }
    } catch (error) {
        console.error('Init Data Error', error)
        process.exit()
    }
}

module.exports ={
    initial
}