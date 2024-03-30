/* eslint-disable no-console */
/* eslint-disable import/first */
/* eslint-disable import/order */
import express from 'express';
import colorCheckerMiddleware from './middleware/widgetColorChecker.js';
import bodyParser from 'body-parser';

const { json } = bodyParser;

import widgetsRouter from './routes/widgets.routes.js';

// This is my express application
const app = express();
const port = 3000;
app.use(json());

app.post('/api/v1/widgets', colorCheckerMiddleware());
app.patch('/api/v1/widgets/:id', colorCheckerMiddleware());
app.put('/api/v1/widgets/:id', colorCheckerMiddleware());

app.use('/api/vi/widgets', widgetsRouter);

app.listen(port, () => {
  console.log(`starting express application on port ${port}`);
});
