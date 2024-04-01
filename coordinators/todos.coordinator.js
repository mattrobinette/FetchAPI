/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { v4 as uuid } from 'uuid';
import todosModel from '../models/todos.model.js';

export default class todosCoordinator {
  static gettodos = () => {
    console.log('\t Coordinator : gettodos()');

    return todosModel.gettodos();
  };

  static createtodo = (newtodo) => {
    console.log('\t Coordinator : createtodo()');

    const todo = {
      ...newtodo,
      id: uuid(),
    };

    return todosModel.createtodo(todo);
  };

  static gettodo = (id) => {
    console.log('\t Coordinator : gettodo()');
    return todosModel.gettodo(id);
  };

  static deletetodo = (id) => {
    console.log('\t Coordinator : deletetodo()');
    return todosModel.deletetodo(id);
  };

  static replacetodo = (id, todo) => {
    const replacetodo = {
      ...todo,
      id,
    };

    return todosModel.replacetodo(id, replacetodo);
  };

  static updatetodo = (id, todo) => {
    console.log('\t Coordinator : updatetodo()');
    return todosModel.updatetodo(id, todo);
  };
}
