const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let formData = {}; // Store the form data temporarily

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_1.html'));
});

app.post('/submit-form', (req, res) => {
    console.log('Received POST request to /submit-form');
    formData = req.body;
    console.log('Form Data Received:', formData);
    res.json({ message: 'Data saved successfully!', redirect: true });
});

app.get('/screen_2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_2.html'));
});

app.get('/get-form-data', (req, res) => {
    if (Object.keys(formData).length > 0) {
        res.json(formData);
    } else {
        res.status(404).json({ message: 'No data found' });
    }
});

app.get('/screen_3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_3.html'));
});

app.post('/generate-acr', (req, res) => {
    formData = { ...formData, ...req.body };
    console.log('Updated Form Data:', formData);
    res.json({ message: 'Data saved successfully!', redirect: '/screen_4.html' });
});

app.get('/screen_4.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/screen_4.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000; // Use dynamic port for production
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
