const http = require('http')

module.exports = (uuid) => new Promise(function (resolve, reject) { 
  const query = `
    {
      blocksUsersBy(propertie: "block", value: "${uuid}"){
        _block{
          daysInfo{
            day
            low
            high
            medium
          }
        }
        last_pay
        low
        medium
        high
        amount
        _user{
          nickname
        }
        pays{
          user
          app
          red
          trader
          low
          high
          medium
          from
          to
          nickname
          amount
        }
      }
    }
  `
  http.get('http://localhost:3300/graphql/?query=' + query, (resp) => {
    let data = ''
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      resolve(JSON.parse(data))
    });
  
  }).on("error", (err) => {
    reject(err)
  })
})
