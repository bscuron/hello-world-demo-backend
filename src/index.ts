// Load project environment variables (located in `.env`)
require('dotenv').config();

// Important external modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Connect to the database
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});
connection.connect(); // TODO: make sure connection succeeded

// Create express application
const app = express();

// Allow cross-origin requests
app.use(cors());

// Parse the incoming requests with JSON payloads
app.use(express.json());

// Create a GET route
app.get('/message', (req, res) => {

    // Query the database
    connection.query('SELECT * FROM Members', function (error, results, fields) {
        if (error) throw error;
        let str = '';
        for(let row of results) {
            str += `ID: ${row.id}, FIRST_NAME: ${row.first_name}, LAST_NAME: ${row.last_name}\n`
        }
        res.json({ message: str });
    });
});

// Start the server, listen for requests on port 8000
// TODO: create variable for port
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
