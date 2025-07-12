const mysql = require('mysql')
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'odoo'
})

module.exports = pool
