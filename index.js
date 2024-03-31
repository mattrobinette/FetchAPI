import express from 'express';
import bodyParser from 'body-parser';
import colorCheckerMiddleware from './middleware/todoColorChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import todosRouter from './routes/todos.routes.js';

const { json } = bodyParser;

const app = express();
const port = 3000;
app.use(json());

app.post('/api/v1/todos', colorCheckerMiddleware());
app.patch('/api/v1/todos/:id', colorCheckerMiddleware());
app.put('/api/v1/todos/:id', colorCheckerMiddleware());

app.use('/api/vi/todos', todosRouter);

// Always place error middleware last
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`starting express application on port ${port} @ ${new Date().toISOString()}`);
});
