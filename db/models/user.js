const { query } = require('../helperFunctions')
var client = require('../conn')

module.exports = {
  addUser: (email, password, callback) => {
    sql = `
      INSERT INTO users(email, password)
      VALUES($1, $2)
      RETURNING(id, email, timestamp)
    `
    query(sql, [email, password], result => {
      console.log('THE RESULT ==-=-=-=-=-=>     ', result)
      result = result.row.substr(1, (result.row).length - 2).replace(/\"/g, '').split(',')
      callback({
        id: result[0],
        email: result[1],
        timestamp: result[2]
      })
    })
  },

  findById: (id, callback) => {
    sql = `
      SELECT * FROM users
      WHERE id = $1
    `
    query(sql, [id], result => {
      callback(result)
    })
  },

  findByEmail: (email, callback) => {
    sql = `
      SELECT * FROM users
      WHERE email = $1
    `
    query(sql, [email], result => {
      callback(result)
    })
  }
}