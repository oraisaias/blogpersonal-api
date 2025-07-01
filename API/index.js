const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL'))
  .catch(err => console.error('🔴 Connection error', err.stack));

app.get('/', async (req, res) => {
  const result = await client.query('SELECT NOW()');
  res.send(`PostgreSQL says: ${result.rows[0].now}`);
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
