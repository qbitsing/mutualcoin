module.exports = function (data) {
  return {
    query: `mutation{
    result: block${data.to}(uuid: "${data.uuid}"${data.startDate ? ', startDate: "' + data.startDate + '"' : ''})
  }`
  }
}
