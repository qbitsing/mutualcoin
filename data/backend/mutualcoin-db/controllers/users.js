'use strict'

const usersSchema = require('../models/users')
const uuid = require('uuid')
const utils = require('mutualcoin-utils')
let UsersModel

function validateEmails(user) {
    let invalidUser = null
    let cond = [{ email: user.email }]
    if (user.email2) { 
        cond.push({email2: user.email2})
    }
    invalidUser = UsersModel.findOne({
        $or: cond
    })
    return invalidUser
}

async function register(user) {
    // validate if the email user is not register
    let invalidUser = await validateEmails(user)

    if (invalidUser) {
        let email = invalidUser.email === user.email ? user.email : user.email2
        let whatEmail = invalidUser.email === user.email ? 'principal' : 'secundario'

        throw new Error(`ERROR: la direccion de correo electronico ${whatEmail}: ${email} ya esta registrada`)
    }

    if (!user.bch) { 
        throw new Error('la dirección BCH es requerida')
    }

    invalidUser = null

    invalidUser = await UsersModel.findOne({
        bch: user.bch
    })

    if (invalidUser) { 
        throw new Error('La dirección BCH ya esta registrada en otra cuenta')
    }

    if (!user.bchType) { 
        throw new Error('El tipo de BHC es requerido')
    }

    if (!user.password) { 
        throw new Error('La contraseña es requerida')
    }

    user.uuid = uuid.v4()

    invalidUser = null
    invalidUser = await UsersModel.findOne({ uuid: user.uuid })

    while (invalidUser) {
        invalidUser = null
        user.uuid = uuid.v4()
        invalidUser = await UsersModel.findOne({ uuid: user.uuid })
    }

    let validReferred = null

    validReferred = await UsersModel.findOne({ uuid: user.codeReferred })

    if (!validReferred) {
        user.codeReferred = 'codeGerardo'
    }

    const userToCreate = new UsersModel()

    userToCreate.admin = user.admin || false
    userToCreate.nickname = user.nickname
    userToCreate.email = user.email
    userToCreate.email2 = user.email2
    userToCreate.bch = user.bch
    userToCreate.bchType = user.bchType
    userToCreate.uuid = user.uuid
    userToCreate.firstName = user.firstName
    userToCreate.lastName = user.lastName
    userToCreate.age = user.age
    userToCreate.birthdate = user.birthdate
    userToCreate.gender = user.gender
    userToCreate.address = user.address
    userToCreate.phone = user.phone
    userToCreate.hobbies = user.hobbies
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

module.exports = function(db) {
    UsersModel = db.model('user', usersSchema)

    const usersMethods = {}

    usersMethods.register = register
    usersMethods.singin = singin

    return usersMethods
}
