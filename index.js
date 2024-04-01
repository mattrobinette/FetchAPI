import express from 'express';
import bodyParser from 'body-parser';
import { colorChecker, errorHandler } from './middleware/todoColorChecker.js';
import todosRouter from './routes/todos.routes.js';

const { json } = bodyParser;

const app = express();
const port = 3000;
app.use(json());

app.post('/api/v1/todos', colorChecker());
app.patch('/api/v1/todos/:id', colorChecker());
app.put('/api/v1/todos/:id', colorChecker());

app.use('/api/vi/todos', todosRouter);

// Always place error middleware last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`starting express application on port ${port} @ ${new Date().toISOString()}`);
});
