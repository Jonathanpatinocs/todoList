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
    todoPriority.addEventListener('click', ()=> {
        if (todoPriority.classList.contains('priority-1')) {
            todoPriority.classList.remove('priority-1');
            todoPriority.classList.add('priority-2');
        } else if (todoPriority.classList.contains('priority-2')) {
            todoPriority.classList.remove('priority-2');
            todoPriority.classList.add('priority-3');
        } else if (todoPriority.classList.contains('priority-3')) {
            todoPriority.classList.remove('priority-3');
            todoPriority.classList.add('priority-1');
        }

    })
    const dropdown = document.createElement('button');
    dropdown.classList.add('dropdown');
    dropdown.textContent = '-';
    dropdown.addEventListener('click', ()=> {
        if (todoBody.classList.contains('todoBody-hidden')) {
            const todoDesc = document.createElement('div');
            todoDesc.classList.add('todoDesc');
            todoDesc.textContent = todoItem.description;
            const todoDueDate = document.createElement('div');
            todoDueDate.textContent = todoItem.dueDate;
            todoDueDate.classList.add('todoDueDate');
            todoBody.classList.remove('todoBody-hidden')
            todoBody.append(todoDesc, todoDueDate);
            todo.append(todoBody)
        }
        else {
            while(todoBody.firstChild) {
                todoBody.removeChild(todoBody.lastChild);
                todoBody.classList.add('todoBody-hidden')
            }
        }
    })

    /* To do Body */
    const todoBody = document.createElement('div');
    todoBody.classList.add('todoBody');
    todoBody.classList.add('todoBody-hidden')



    todoHeadRight.append(todoPriority, dropdown);
    todoHead.append(checkbox, todoTitle, todoHeadRight);
    todo.append(todoHead);
    todoContainer.append(todo);

}

function createProjectCard(project, list) {
    const projectsList = document.getElementById('projects-list');
    const div = document.createElement('div');
    div.classList.add('project')
    div.textContent = project.title;
    div.addEventListener('click', ()=> {
        for(let i = 0; i < list.length; i++) {
            if(list[i].selected === true) {
                list[i].selected = false;
            }
        }
        project.selected = true;
    });
    projectsList.append(div);
}


export {createTodoCard, createProjectCard};