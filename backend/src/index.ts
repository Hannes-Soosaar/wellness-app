import server from '../server';
import userRouter from './routes/userRouts';
import apiRouter from './routes/apiRouts';
import testRouter from './routes/testRouts'

// start the server
server.app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });

// handle routes 
server.app.use('/api', apiRouter);
server.app.use('/user', userRouter);
server.app.use('/test',testRouter);

server.app.post('/test', async (req, res) => {
console.log('Test request received:', req.body);
res.status(200).json({ message: 'Test successful' });
});
