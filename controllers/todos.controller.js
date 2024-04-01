import todosCoordinator from '../coordinators/todos.coordinator.js';

export const gettodos = async (req, res, next) => {
  console.log('Controller : getTodos()');

  try {
    const result = await todosCoordinator.gettodos(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const createtodo = async (req, res, next) => {
  console.log('Controller : createTodo()');

  try {
    const result = await todosCoordinator.createtodo(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const gettodo = async (req, res, next) => {
  console.log(`Controller : getTodo(${req.params.id})`);

  try {
    const result = await todosCoordinator.gettodo(req.params.id);
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

export const deletetodo = async (req, res, next) => {
  console.log(`Controller : deleteTodo(${req.params.id})`);

  try {
    const result = await todosCoordinator.deletetodo(req.params.id, req.body);

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

export const replacetodo = async (req, res, next) => {
  console.log(`Controller : replaceTodo(${req.params.id})`);

  try {
    const result = await todosCoordinator.replacetodo(req.params.id, req.body);

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

export const updatetodo = async (req, res, next) => {
  console.log(`Controller : updateTodo(${req.params.id})`);

  try {
    const result = await todosCoordinator.updatetodo(req.params.id, req.body);

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
