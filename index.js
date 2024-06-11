import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import validationMiddleware from './middleware/validationChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import dogsRouter from './routes/dogs.routes.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

const app = express();
const port = 3000;
app.use(json());

app.use(express.static('static'));

app.post('/api/v1/dogs', validationMiddleware());
app.patch('/api/v1/dogs/:id', validationMiddleware());
app.put('/api/v1/dogs/:id', validationMiddleware());

app.use('/api/v1/dogs', dogsRouter);

// Always place error middleware last
app.use(errorMiddleware());

// Environmental configs in config folder
const mongoConfig = config.get('mongo');

console.log(mongoConfig);

db.init(mongoConfig);

app.listen(port, () => {
  console.log(`starting express application on port ${port} @ ${new Date().toISOString()}`);
});
