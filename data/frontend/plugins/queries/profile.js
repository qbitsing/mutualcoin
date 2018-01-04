module.exports = function (uuid) {
  return {
    query: `{
      user(uuid: "${uuid}") { 
        nickname 
        email
        email
        email2
        bch
        bchType
        firstName
        lastName
        age
        birthdate
        gender
        address
        phone
        hobbies
      }
    }` }
}
