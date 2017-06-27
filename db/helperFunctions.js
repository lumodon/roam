const pg = require('pg')

const dbName = 'roam'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

module.exports = {
  query: (sql, variables, callback) => {

    client.query(sql, variables, (error, result) => {
      if (error) {
        console.log("QUERY <- !!ERROR!!")
        console.error(error)
      } else {
        callback((result.rows[0].row).substr(1, (result.rows[0].row).length-2).replace(/\"/g, '').split(','))
      }
    })
  }
}