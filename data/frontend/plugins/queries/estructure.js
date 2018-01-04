module.exports = function (uuid) {
  return {
    query: `{
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
  }` }
}
