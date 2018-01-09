module.exports = (data) => {
  return {
    query: `mutation{
    result: block${data.to}(uuid: "${data.uuid}"${data.startDate ? ', startDate: "' + data.startDate + '"' : ''})
  }`
  }
}
