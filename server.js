const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let formData = {}; // Store the form data temporarily

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Route to serve Screen 1 HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_1.html'));
});

// Route to handle form submission from Screen 1 (POST request)
app.post('/submit-form', (req, res) => {
    formData = req.body;  // Store form data
    console.log('Form Data Received:', formData);
    res.json({ message: 'Data saved successfully!' });
});

// Route to get form data for Screen 2 or Screen 3
app.get('/get-form-data', (req, res) => {
    if (Object.keys(formData).length > 0) {
        res.json(formData);
    } else {
        res.status(404).json({ message: 'No data found' });
    }
});

// Route for Screen 2
app.get('/screen_2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_2.html'));
});

// Route for Screen 3
app.get('/screen_3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_3.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
