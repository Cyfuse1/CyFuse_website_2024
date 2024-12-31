import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import uploadRouter from '../routes/GetData.routes.js';

const app = express();


app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use the upload route
app.use('/api', uploadRouter);

export default app;