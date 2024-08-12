const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5430,
    user: 'oscar',
    password: 'admin123',
    database: 'my_store'
  });


module.exports = pool;
