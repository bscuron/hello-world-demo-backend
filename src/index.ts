// Load project environment variables (located in `.env`)
require('dotenv').config();

// Important external modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Connect to the database
const db_config = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

// Database connection
let connection;

// Function that connects to the MySQL database. Automatically tries to reconnect if connection is lost.
function handle_disconnect() {
    console.log('LOG: Connecting to database...');
    connection = mysql.createConnection(db_config);

    // Attempt to connect to database
    connection.connect(function(err) {

        // Failed to connect
        if(err) {
            console.log('ERROR: Failed to connect to database: ', err);
            setTimeout(handle_disconnect, 500);
        }

        // Connection succeeded
        else {
            console.log('SUCCESS: Connected to database')
        }

    });

    // Error handler
    connection.on('error', function(err) {

	    // Lost connection to the database, attempt to reconnect
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('WARNING: Database connection lost');
            handle_disconnect();
        }

        // Throw error not related to connection lost
        else {
            throw err;
        }
    });
}

// Try to establish a connection to the database
handle_disconnect();

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
    console.log(`LOG: Server is running on port 8000`);
});
