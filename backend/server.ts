// launch the backend server.

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey ='secretKey'; // Replace with your actual secret key



app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
})
);

app.get('/api/login', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


