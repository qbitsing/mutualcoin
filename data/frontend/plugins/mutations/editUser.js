module.exports = (user) => {
  return { query: `mutation {
      userEdit(uuid: "${user.uuid}", user: {
      email2: "${user.email2}"
      
      hobbies: "${user.hobbies}"
      firstName: "${user.firstName}"
      lastName: "${user.lastName}"
      age: ${user.age}
      birthdate: "${user.birthdate}"
      gender: ${user.gender}
      address: "${user.address}"
      phone: "${user.phone}"
    }) {
      nickname
    }
   }`
  }
}
