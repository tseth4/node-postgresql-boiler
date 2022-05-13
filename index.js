const { Pool, Client } = require('pg')
const client = new Client()
const dotenv = require('dotenv');
const express = require("express");
const router = require('express').Router();
var bodyParser = require("body-parser");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'host.docker.internal',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

let app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("client/build"));

app.get('/rides', (req, res) => {
  pool.query('SELECT * FROM accounts', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});



app.listen(port, () => console.log(`server started on port ${port}`));