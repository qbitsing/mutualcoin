'use strict'

const usersSchema = require('../models/users')
const uuid = require('uuid')
const utils = require('mutualcoin-utils')
let UsersModel

async function validateEmails(user, update) {
    let invalidUser = null
    let cond = []
    if (!update) {
        cond = [
            { email: user.email },
            { email2: user.email }
        ]
    } else {
        cond = [
            { email: user.email2 },
            { email2: user.email2 }
        ]
    }
    invalidUser = await UsersModel.findOne({ $or: cond })

    if (invalidUser) {
        throw new Error(`La dirección de correo: ${cond[0].email} ya esta registrarda`)
    }
}

async function validateBCH(user) {
    if (!user.bch) {
        throw new Error('la dirección BCH es requerida')
    }

    const invalidUser = await UsersModel.findOne({ bch: user.bch })

    if (invalidUser) {
        throw new Error('La dirección BCH ya esta registrada en otra cuenta')
    }
}

function validateBCHType(user) {
    if (!user.bchType) {
        throw new Error('El tipo de BHC es requerido')
    }
}

function validatePassword(user) {
    if (!user.password) {
        throw new Error('La contraseña es requerida')
    }
}

async function validateReferred(uuid) {
    let validReferred = null

    validReferred = await UsersModel.findOne({ uuid })

    if (!validReferred) {
        uuid = 'codeGerardo'
    }

    return uuid
}

async function register(user) {
    // validate if the email user is not register
    await validateEmails(user, false)

    await validateBCH(user)

    validateBCHType(user)

    validatePassword(user)

    user.uuid = uuid.v4()

    let invalidUser = null
    invalidUser = await UsersModel.findOne({ uuid: user.uuid })

    while (invalidUser) {
        invalidUser = null
        user.uuid = uuid.v4()
        invalidUser = await UsersModel.findOne({ uuid: user.uuid })
    }

    user.codeReferred =  await validateReferred(user.codeReferred)

    const userToCreate = new UsersModel()

    userToCreate.admin = user.admin || false
    userToCreate.nickname = user.nickname
    userToCreate.email = user.email
    userToCreate.bch = user.bch
    userToCreate.bchType = user.bchType
    userToCreate.uuid = user.uuid
    userToCreate.codeReferred = user.codeReferred
    userToCreate.password = utils.password.generateHash(user.password)

    const userCreated = await userToCreate.save()

    return userCreated
}

async function singin(credentials) {
    let dataFail = 'datos incorrectos'
    const user = await UsersModel.findOne({
        email : credentials.email
    })

    if (!user) {
        return {
            message: dataFail,
            login: false
        }
    }

    if (!(utils.password.compareHash(credentials.password, user.password))) {
        return {
            message: dataFail,
            login: false
        }
    }

    return {
        message: `Bienvenido Señor@ ${user.nickname}`,
        user,
        login: true
    }
}

async function update(uuid, user) {
    const userToUpdate = await UsersModel.findOne({ uuid })
    if (!userToUpdate) throw new Error('user not found')
    if (user.email2) {
        await validateEmails(user, true)
        userToUpdate.email2 = user.email2
    }
    if (user.bch) {
        await validateBCH(user)
        userToUpdate.bch = user.bch
    }
    if (user.bchType) {
        validateBCHType(user)
        userToUpdate.bchType = user.bchType
    }

    if (user.nickname) {
        userToUpdate.nickname = user.nickname
    }

    if (user.firstName) {
        userToUpdate.firstName = user.firstName
    }

    if (user.lastName) {
        userToUpdate.lastName = user.lastName
    }

    if (user.age) {
        userToUpdate.age = user.age
    }

    if (user.birthdate) {
        userToUpdate.birthdate = user.birthdate
    }

    if (user.gender) {
        userToUpdate.gender = user.gender
    }

    if (user.address) {
        userToUpdate.address = user.address
    }

    if (user.phone) {
        userToUpdate.phone = user.phone
    }

    if (user.hobbies) {
        userToUpdate.hobbies = user.hobbies
    }

    await UsersModel.findByIdAndUpdate(userToUpdate._id, userToUpdate)

    return userToUpdate
}

module.exports = function(db) {
    UsersModel = db.model('user', usersSchema)

    const usersMethods = {}

    usersMethods.register = register
    usersMethods.singin = singin
    usersMethods.update = update

    return usersMethods
}
