const userModel = require("../models/user.model");


module.exports.createUser = async ({
    firstname,lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required')
    }

    // const existingUser = await userModel.findOne({ email })
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        // password: await userModel.hashPassword(password)
        password
    })

    return user
}