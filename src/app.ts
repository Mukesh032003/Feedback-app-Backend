import express, { Application } from 'express';

const app: Application = express();

app.use(express.static('public'));

app.use('/', async (req, res) => {
    res.send('Hello');
});

export default app;
