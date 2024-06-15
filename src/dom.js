import { divide } from "lodash";
import { Project, TodoItem } from "./todo";



function createTodoCard(todoItem) {
    const todoContainer = document.getElementById('todo-container');
    const todo = document.createElement('div');
    todo.classList.add('todo');
    /* To do Head */
    const todoHead = document.createElement('div');
    todoHead.classList.add('todoHead');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkBox');
    const todoTitle = document.createElement('div');
    todoTitle.classList.add('todoTitle');
    todoTitle.textContent = todoItem.title;
    const todoHeadRight = document.createElement('div');
    todoHeadRight.classList.add('todoHead-right');
    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todoPriority');
    switch(todoItem.priority) {
        case 1: {
            todoPriority.classList.add('priority-1');
            break;
        }
        case 2: {
            todoPriority.classList.add('priority-2');
            break;
        }
        case 3: {
            todoPriority.classList.add('priority-3');
            break;
        }
    }
    const dropdown = document.createElement('button');
    dropdown.classList.add('dropdown');
    dropdown.textContent = '-';

    /* To do Body */
    const todoBody = document.createElement('div');
    todoBody.classList.add('todoBody');
    todoBody.classList.add('todoBody-hidden');
    const todoDesc = document.createElement('div');
    todoDesc.classList.add('todoDesc');
    todoDesc.textContent = todoItem.description;
    const todoDueDate = document.createElement('div');
    todoDueDate.textContent = todoItem.dueDate;
    todoDueDate.classList.add('todoDueDate');


    todoHeadRight.append(todoPriority, dropdown);
    todoHead.append(checkbox, todoTitle, todoHeadRight);
    todoBody.append(todoDesc, todoDueDate);
    todo.append(todoHead,todoBody);
    todoContainer.append(todo);

}


export {createTodoCard};