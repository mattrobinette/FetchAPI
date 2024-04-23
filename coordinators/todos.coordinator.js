/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import todosModel from '../models/todos.model.js';
import todoSchema from '../schemas/todo.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(todoSchema);

export default class todosCoordinator {
  static getTodos = () => {
    console.log('\t Coordinator : getTodos()');

    return todosModel.getTodos();
  };

  static createTodo = (newTodo) => {
    console.log('\t Coordinator : createTodo()');

    const todo = {
      ...newTodo,
      id: uuid(),
    };

    const valid = validate(todo);
    if (!valid) {
      throw validate.errors
    };

    return todosModel.createTodo(todo);
  };

  static getTodo = (id) => {
    console.log('\t Coordinator : getTodo()');
    return todosModel.getTodo(id);
  };

  static deleteTodo = (id) => {
    console.log('\t Coordinator : deleteTodo()');
    return todosModel.deleteTodo(id);
  };

  static replaceTodo = (id, todo) => {
    const replacetodo = {
      ...todo,
      id,
    };

    return todosModel.replaceTodo(id, replacetodo);
  };

  static updateTodo = (id, todo) => {
    console.log('\t Coordinator : updateTodo()');

    const valid = validate(todo);
    if (!valid) {
      throw validate.errors
    };
    
    return todosModel.updateTodo(id, todo);
  };
}
