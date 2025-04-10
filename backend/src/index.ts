
import {app,pool} from '../server';
import loginRoutes from './routes/loginRouts';


// start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });


// handle routes 
app.use('/api', loginRoutes);

