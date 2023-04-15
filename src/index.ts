import express from 'express';
import router from './routes/router';

const app = express();
app.use(express.json());
app.use(router);

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});