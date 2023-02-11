// Important external modules
const express = require('express');
const cors = require('cors');

// Create express application
const app = express();

// Allow cross-origin requests
app.use(cors());

// Parse the incoming requests with JSON payloads
app.use(express.json());

// Create a GET route
app.get('/message', (req, res) => {
    res.json({ message: "Hello, World!!!!!" });
});

// Start the server, listen for requests on port 8000
// TODO: create variable for port
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
