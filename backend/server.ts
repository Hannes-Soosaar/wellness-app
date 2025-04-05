// launch the backend server.

import express, { application } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';


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

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});


