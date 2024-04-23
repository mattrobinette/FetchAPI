// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import TodosCoordinator from '../coordinators/todos.coordinator.js';

export const getTodos = async (req, res, next) => {
  console.log('Controller : getTodos()');

  try {
    const result = await TodosCoordinator.getTodos(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const createTodo = async (req, res, next) => {
  console.log('Controller : createTodo()');

  try {
    const result = await TodosCoordinator.createTodo(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const getTodo = async (req, res, next) => {
  console.log(`Controller : getTodo(${req.params.id})`);

  try {
    const result = await TodosCoordinator.getTodo(req.params.id);
    if (result) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteTodo = async (req, res, next) => {
  console.log(`Controller : deleteTodo(${req.params.id})`);

  try {
    const result = await TodosCoordinator.deleteTodo(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
      console.log('Todo successfully deleted!');
    } else {
      res.status(404).json();
      console.log('Todo not found. :(');
    }
  } catch (ex) {
    next(ex);
  }
};

export const replaceTodo = async (req, res, next) => {
  console.log(`Controller : replaceTodo(${req.params.id})`);

  try {
    const result = await TodosCoordinator.replaceTodo(req.params.id, req.body);

    if (result) {
      res.status(201).json(result);
      console.log(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const updateTodo = async (req, res, next) => {
  console.log(`Controller : updateTodo(${req.params.id})`);

  try {
    const result = await TodosCoordinator.updateTodo(req.params.id, req.body);

    if (result) {
      res.status(201).json(result);
      console.log(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};
