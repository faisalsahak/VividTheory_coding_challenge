// const {Client} = require('pg')
const {Pool} = require('pg')



const pool = new Pool({
  host: "smarthomes.postgres.database.azure.com",
  user: "smarthomesdashboarduser@smarthomes",
  password: "b5zT;q_fS\\aAUtpD",
  database: "wattage",
  port: "5432",
  ssl: true
});

module.exports = pool