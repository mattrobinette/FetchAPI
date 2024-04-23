/* eslint-disable no-param-reassign */
/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class TodosModel {
  static getTodos = async () => {
    console.log('\t\t Model : getTodos()');

    return db.dbTodos().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  static createTodo = async (newTodo) => {
    console.log('\t\t Model : createTodo()');
    await db.dbTodos().insertOne(newTodo);

    const returnTodo = { ...newTodo };
    // eslint-disable-next-line no-underscore-dangle
    delete returnTodo._id;
    return returnTodo;
  };

  static getTodo = (id) => {
    console.log('\t\t Model : getTodo()');
    return db.dbTodos().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteTodo = (id) => {
    console.log('\t\t Model : deleteTodo()');
    return db.dbTodos().deleteOne({ id });
  };

  static replaceTodo = async (id, Todo) => {
    const result = await db.dbTodos().replaceOne({ id }, Todo);

    if (result.matchedCount === 1) {
      return Todo;
    }

    return false;
  };

  static updateTodo = async (id, Todo) => {
    const update = {
      $set: {},
    };

    Object.keys(Todo).forEach((key) => {
      if (key === 'id') {
        return;
      }

      update.$set[key] = Todo[key];
    });

    const result = await db.dbTodos().findOneAndUpdate({ id }, update, { returnDocument: 'after' });

    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      delete result._id;
      return result;
    }

    return false;
  };
}
