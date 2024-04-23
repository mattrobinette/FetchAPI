/* eslint-disable import/extensions */
import express from 'express';
import {
  getTodos,
  createTodo,
  getTodo,
  replaceTodo,
  deleteTodo,
  updateTodo,
} from '../controllers/todos.controller.js';

const todosRouter = express.Router();

// GET /api/vi/Todos
todosRouter.get('/', getTodos);

// POST /api/v1/Todos
todosRouter.post('/', createTodo);

// GET /api/v1/Todos/<id>
todosRouter.get('/:id', getTodo);

// PUT /api/v1/Todos/<id>
todosRouter.put('/:id', replaceTodo);

// DELETE /api/v1/Todos/<id>
todosRouter.delete('/:id', deleteTodo);

// PATCH /api/v1/Todos/<id>
todosRouter.patch('/:id', updateTodo);

export default todosRouter;
