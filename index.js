import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import colorCheckerMiddleware from './middleware/todoColorChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import todosRouter from './routes/todos.routes.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

const app = express();
const port = 3000;
app.use(json());

app.post('/api/v1/todos', colorCheckerMiddleware());
app.patch('/api/v1/todos/:id', colorCheckerMiddleware());
app.put('/api/v1/todos/:id', colorCheckerMiddleware());

app.use('/api/v1/todos', todosRouter);

// Always place error middleware last
app.use(errorMiddleware());

// Environmental configs in config folder
const mongoConfig = config.get('mongo');

console.log(mongoConfig);

db.init(mongoConfig);

app.listen(port, () => {
  console.log(`starting express application on port ${port} @ ${new Date().toISOString()}`);
});
