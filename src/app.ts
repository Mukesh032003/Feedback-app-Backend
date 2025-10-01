import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import { API_SUFFIX } from './constants';
import { userRouter } from './routes/user.routes';

const app: Application = express();

const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true,
};

app.use(cors(corsOptions));

app.use(
    express.json({
        limit: '16kb',
    }),
);

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.use(cookieParser());

app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send('Hello');
});


app.use(`${API_SUFFIX}/user`, userRouter);


export default app;
