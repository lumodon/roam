const { query } = require('./helperFunctions')

module.exports = {
  addUser: (email, password, callback) => {

    sql = `
      INSERT INTO users(email, password)
      VALUES($1, $2)
      RETURNING(id, email, timestamp)
    `
    query(sql, [email, password], result => {
      callback({
        id: result[0],
        email: result[1],
        timestamp: result[2]
      })
    })
  }
}