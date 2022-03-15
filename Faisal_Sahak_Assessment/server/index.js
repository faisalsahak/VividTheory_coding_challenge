const express = require("express");
const app = express()
const cors = require("cors");


const pool = require('./db.config')
pool.connect()


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;



app.get('/', (req, res)=>{
	res.send("Server Home")
})

app.get("/alldevices", async (req, res) => { // searches the database and returns the specified columns that are not null
  try {
    const query = `SELECT DISTINCT "Device_ID", "Device_Name", "Device_Location" from readings WHERE "Device_Name" IS NOT NULL LIMIT 200`
    const devices = await pool.query(query);
    res.json(devices.rows);
  } catch (err) {
    // console.error(err.message);
  }
});


app.get("/data/:device", async (req, res) => { // returns the data from the database based on the device id specified
  try {
    const query = `SELECT  "Device_ID", "Device_Name","Device_Type", "DateTime", "Wattage" from readings WHERE "Device_ID" = $1`
    const {device} = req.params;
    const data = await pool.query(query,[device]);
    res.json(data.rows);
  } catch (err) {
    // console.error(err.message);
  }
});




app.listen(port, () => console.log(`Server running on port: ${port}`));
