const pg = require('pg')

const dbName = 'roam'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

const query = (sql, variables, callback) => {
  console.log('QUERY ->', sql.replace(/[\n\s]/ + g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error) {
      console.log("QUERY <- !!ERROR!!")
      console.error(error)
    } else {
      console.log('QUERY <-', JSON.stringify(result.rows))
      console.log('result:', result)
      callback(error, result.rows)
    }
  })
}

const get