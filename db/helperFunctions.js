const client = require('./conn')

module.exports = {
  query: (sql, variables, callback) => {

    client.query(sql, variables, (error, result) => {
      if (error) {
        console.log("QUERY <- !!ERROR!!")
        console.error(error)
      } else {
        console.log(result.rows[0])
        callback(result.rows[0])
      }
    })
  }
}