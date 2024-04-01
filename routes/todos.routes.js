/* eslint-disable import/extensions */
import express from 'express';
import {
  gettodos,
  createtodo,
  gettodo,
  replacetodo,
  deletetodo,
  updatetodo,
} from '../controllers/todos.controller.js';

const todosRouter = express.Router();

// GET /api/vi/todos
todosRouter.get('/', gettodos);

// POST /api/v1/todos
todosRouter.post('/', createtodo);

// GET /api/v1/todos/<id>
todosRouter.get('/:id', gettodo);

// PUT /api/v1/todos/<id>
todosRouter.put('/:id', replacetodo);

// DELETE /api/v1/todos/<id>
todosRouter.delete('/:id', deletetodo);

// PATCH /api/v1/todos/<id>
todosRouter.patch('/:id', updatetodo);

export default todosRouter;
