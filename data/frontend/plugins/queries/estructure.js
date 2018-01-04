module.exports = function (uuid) {
  return `{
    user(uuid: "${uuid}") { 
      line { 
        nickname 
        uuid 
        email 
        line { 
          nickname 
          uuid 
          email 
          line { 
            nickname 
            uuid 
            email 
          } 
        } 
      } 
    }
  }`
}
