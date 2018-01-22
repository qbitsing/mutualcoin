'use strict'

module.exports = function (user) { 
  if (!user.admin) { 
    throw new Error('Unauthorized: the user is not an administrator')
  }
}