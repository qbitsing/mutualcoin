module.exports = function (user) {
  return { query: `mutation {
      result: userEdit(uuid: "${user.uuid}", user: {
      email2: "${user.email2}"
      nickname: "${user.nickname}"
      hobbies: "${user.hobbies}"
      firstName: "${user.firstName}"
      lastName: "${user.lastName}"
      age: "${user.age}"
      birthdate: "${user.birthdate}"
      gender: "${user.gender}"
      address: "${user.address}"
      phone: "${user.phone}"
    }) {
      nickname
    }
   }`
  }
}
