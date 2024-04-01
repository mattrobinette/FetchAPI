/* eslint-disable no-param-reassign */
/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let todos = [
  {
    id: '1',
    name: 'Chores',
    color: 'Green',
  },
  {
    id: '2',
    name: 'Walk the dog',
    color: 'Blue',
  },
  {
    id: '3',
    name: 'Lab Homework',
    color: 'Red',
  },
];

export default class todosModel {
  static gettodos = async () => {
    console.log('\t\t Model : gettodos()');
    return todos;
  };

  static createtodo = async (newtodo) => {
    console.log('\t\t Model : createtodo()');
    newtodo.hexColor = todosModel.todoColorHex(newtodo.color);
    todos.push(newtodo);
    return newtodo;
  };

  static todoColorHex = (color) => {
    const mapping = {
      red: '#ff0000',
      green: '#00ff00',
      blue: '#0000ff',
    };

    return mapping[color.toLowerCase()] || '';
  };

  static gettodo = (id) => {
    console.log('\t\t Model : gettodo()');
    const todo = todos.find((w) => (w.id === id));
    return todo;
  };

  static deletetodo = (id) => {
    console.log('\t\t Model : deletetodo()');

    const todoCountBeforeDelete = todos.length;
    todos = todos.filter((w) => (w.id !== id));

    if (todoCountBeforeDelete === todos.length) {
      return false;
    }

    return true;
  };

  static replacetodo = async (id, newTodo) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex > -1) {
      // Calculate hexColor if the color is changed
      if (newTodo.color && newTodo.color !== todos[todoIndex].color) {
        newTodo.hexColor = todosModel.todoColorHex(newTodo.color);
      } else {
        newTodo.hexColor = todos[todoIndex].hexColor; // Preserve the existing hexColor
      }

      // Replace todo at todoIndex with the newTodo
      todos = [
        ...todos.slice(0, todoIndex),
        newTodo,
        ...todos.slice(todoIndex + 1),
      ];

      return newTodo;
    }

    return false;
  };

  static updatetodo = async (id, updatedTodo) => {
    const todoIndex = todos.findIndex((w) => w.id === id);

    if (todoIndex > -1) {
      const todo = todos[todoIndex];
      const updatedProperties = Object.keys(updatedTodo);

      if (updatedProperties.includes('color')) {
        // Update the hexColor if the color is changed
        updatedTodo.hexColor = todosModel.todoColorHex(updatedTodo.color);
      } else {
        // Preserve the existing hexColor
        updatedTodo.hexColor = todo.hexColor;
      }

      updatedProperties.forEach((key) => {
        // Exclude id from being updated
        if (key !== 'id') {
          todo[key] = updatedTodo[key];
        }
      });

      return todo;
    }

    return false;
  };
}
