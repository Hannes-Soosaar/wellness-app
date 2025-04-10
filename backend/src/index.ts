
import {app,pool} from '../server';
import router from './routes/userRouts';
import apiRouter from './routes/apiRouts';


// start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });


// handle routes 
app.use('/api', apiRouter);

app.post('/test', async (req, res) => {
console.log('Test request received:', req.body);
res.status(200).json({ message: 'Test successful' });
});
