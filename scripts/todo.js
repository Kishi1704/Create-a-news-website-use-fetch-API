'use strict';
//-----------Element Selected--------------//
const addBtn = document.getElementById('btn-add');
const taskInput = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');

//-----------Variable Creation--------------//
const TODO_KEY = 'TODO_ARRAY';
const todoArr = JSON.parse(getFromStorage(TODO_KEY)) ?? [];

const USER_KEY = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(USER_KEY)) ?? [];

//-----------Class creation--------------//
class Task {
  isDone = false;
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
  }
}

//-----------Function Creation--------------//
//Parse User
function parseUser(userData) {
  // prettier-ignore
  const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
  user.pageSize = userData.pageSize;
  user.category = userData.category;

  return user;
}

//Parse Todo
function parseTodo(todoData) {
  // prettier-ignore
  const todo = new Task(todoData.task, todoData.owner);
  todo.isDone = todoData.isDone;

  return todo;
}

//Validate task
const validateTask = function () {
  if (taskInput.value === '') {
    alert('Please input your Task!');
    return false;
  } else return true;
};

//Render todo list
const renderTodoList = function () {
  todoList.innerHTML = '';
  todoArr?.forEach(todo => {
    if (todo.owner === currentUser[0].username) {
      const html = `<li class="task-todo ${todo.isDone ? 'checked' : ''}">${
        todo.task
      }<span class="close">×</span></li>`;
      todoList.insertAdjacentHTML('beforeend', html);
    }
  });
};

//Delete task
function taskDelete(e) {
  if (confirm('Are you sure?')) {
    const index = todoArr.findIndex(
      todo =>
        todo.owner === currentUser[0].username &&
        todo.task === e.target.closest('.task-todo').textContent.slice(0, -1)
    );
    todoArr.splice(index, 1);
    renderTodoList();
    saveToStorage(TODO_KEY, JSON.stringify(todoArr));
  }
}
//------------------Event--------------------//
//Update array
currentUser.splice(0, 1, parseUser(currentUser[0]));
todoArr?.forEach((todo, i, arr) => arr.splice(i, 1, parseTodo(todo)));

//Update todo list
renderTodoList();

//Add Task event
addBtn.addEventListener('click', function () {
  // Check if user don't login
  if(currentUser.length === 0) {
     alert('Please login to do action!');
     return;
  }
  const valid = validateTask();
  // console.log(valid);//for check error

  if (valid) {
    const todo = new Task(taskInput.value, currentUser[0].username);

    taskInput.value = '';

    todoArr.push(todo);
    renderTodoList();
    saveToStorage(TODO_KEY, JSON.stringify(todoArr));
  }
});

//Task event

todoList.addEventListener('click', function (e) {
  if (e.target.classList.contains('task-todo')) {
    e.target.classList.toggle('checked');

    todoArr?.forEach(todo => {
      if (
        todo.owner === currentUser[0].username &&
        todo.task === e.target.textContent.slice(0, -1)
      )
        e.target.classList.contains('checked')
          ? (todo.isDone = true)
          : (todo.isDone = false);
    });
    // console.log(todoArr);//for check error

    saveToStorage(TODO_KEY, JSON.stringify(todoArr));
  }
  if (e.target.classList.contains('close')) {
    taskDelete(e);
  }
});
