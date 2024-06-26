/* eslint-disable no-unused-vars */
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import validationMiddleware from './middleware/validationChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import authMiddleware from './middleware/auth.js';
import rateLimiter from './middleware/rateLimiter.js';
import dogsRouter from './routes/dogs.routes.js';
import { generateJwt } from './controllers/auth.controller.js';
import { db } from './lib/database.js';
import { healthcheck } from './controllers/healthcheck.js';

const { json } = bodyParser;

const app = express();
const port = 3000;

// Apply the rate limiting middleware to all requests.
app.use(rateLimiter);

// Parse requests of content-type - application/json
app.use(json());
app.use('/static', express.static('static'));

app.get('/api/v1/healthcheck', healthcheck);

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Dog Routes
app.post('/api/v1/dogs', validationMiddleware());
app.patch('/api/v1/dogs/:id', validationMiddleware());
app.put('/api/v1/dogs/:id', validationMiddleware());

app.use('/api/v1/dogs', dogsRouter);

// Generate JWT Route
app.post('/api/v1/auth', generateJwt);

// Always place error middleware last
app.use(errorMiddleware());

// Environmental configs in config folder
const mongoConfig = config.get('mongo');

db.init(mongoConfig);

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
