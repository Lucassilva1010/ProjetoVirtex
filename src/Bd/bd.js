
const { Pool } = require('pg')

const pool = new Pool({
  host            : 'localhost',
  user            : 'postgres',
  password        : 'root',
  database        : 'virtex', 
  port: 5432
});

module.exports = pool;