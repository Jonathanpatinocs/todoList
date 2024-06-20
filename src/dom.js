import { divide } from "lodash";
import { Project, TodoItem } from "./todo";


const projects = [];
let projectModalOpen = false;
let todoModalOpen = false;

function createTodoCard(todoItem, project) {
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
    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.classList.add('deleteTodo');
    todoDeleteButton.textContent = 'x';
    todoDeleteButton.addEventListener('click', ()=> {
        deleteTodo(todoItem);
    })
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



    todoHeadRight.append(todoPriority, todoDeleteButton, dropdown);
    todoHead.append(checkbox, todoTitle, todoHeadRight);
    todo.append(todoHead);
    todoContainer.append(todo);

}
function deleteTodo(todoItem) {
    const todoContainer = document.getElementById('todo-container');
    let project = checkProjectSelected();
    project.delete(todoItem);
    clearAll(todoContainer);
    showAllTodos(checkProjectSelected(), projects);
    console.log(project);
}

/* Project Card and functions */
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
    let projects = document.querySelectorAll('.project');
    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove('project-selected');
    }
        div.classList.add('project-selected');
        project.selected = true;
        div.classList.add('project-selected');
        const todoContainer = document.getElementById('todo-container');
        clearAll(todoContainer);
        showAllTodos(checkProjectSelected(), projects)
    });
    projectsList.append(div);
}
function checkProjectSelected() {
    let selected;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].selected === true) {
            selected = projects[i];
        }
    }
    return selected;
}
function clearAll(project) {
    while(project.firstChild) {
        project.removeChild(project.lastChild);
    }
}
function showAllTodos(project, projectsList) {
    for (let i = 0; i < project.list.length; i++) {
        createTodoCard(project.list[i], projectsList[0].list);
    }
}

/* Project Dialog and functions */
function createProjectDialog() {
    const modal = document.getElementById('modal');
    const div = document.createElement('div');
    div.textContent = 'Add A New Project';
    const div2 = document.createElement('div');
    div2.id = 'projects-modal-title';
    const form = document.createElement('form');
    form.method = 'dialog';
    const label = document.createElement('label');
    label.for = 'projectTitle'
    label.textContent = "Project Title";
    const input = document.createElement('input');
    input.type ='text';
    input.id = 'projectTitle';
    const button = document.createElement('button');
    button.id = 'projectAddButton';
    button.textContent= '+';
    button.type = 'button';
    
    
    button.addEventListener('click', ()=> {
        
        addProject();
        projectModalOpen = false;
            
    })
    form.append(label, input, button);
    div2.append(form);
    modal.append(div, div2)
}

function addProjectFunction() {
    const addProjectButton = document.getElementById('newProjectButton');
    const dialog = document.getElementById('modal')
    
    addProjectButton.addEventListener('click', ()=> {
        
        checkProjectModal();
    })
}
function checkProjectModal() {
    const dialog = document.getElementById('modal')
    if (projectModalOpen === false) {
        createProjectDialog();
        dialog.classList.add('projects-modal')
        dialog.show();
        projectModalOpen = true;
    }
}
function addProject() {
    const dialog = document.getElementById('modal');
    const title = document.getElementById('projectTitle');
        let projectTitle;
        dialog.classList.remove('projects-modal')
        dialog.close();
        if (title.value === '') {
            projectTitle = 'Untitled';
        } else {
            projectTitle = title.value;
        }
        const project = new Project(projectTitle);
        title.value = '';
        projects.push(project);
        createProjectCard(project, projects);
        clearAll(dialog);
}
/* Todo Dialog and functions */
function createTodoDialog() {
    const dialog = document.getElementById('modal');
    dialog.classList.add('todoModal');
    /*  Modal Header */
    const todoModalHeader = document.createElement('div');
    todoModalHeader.id = 'todoModalHeader';
    const div = document.createElement('div');
    div.textContent = 'Add to List';
    const addTodoButton = document.createElement('button');
    addTodoButton.type = 'button';
    addTodoButton.id = 'addTodoButton';
    addTodoButton.textContent = '+';
    addTodoButton.addEventListener('click', ()=> {
        addTodo();
    })
    
    const form = document.createElement('form');
    form.method = 'dialog';
    /*  Modal title */
    const todoModalTitleDiv = document.createElement('div');
    todoModalTitleDiv.id ='todoModalTitleDiv';
    const todoModalTitleLabel = document.createElement('label');
    todoModalTitleLabel.htmlFor = 'todoModalTitle';
    todoModalTitleLabel.textContent = 'Title:';
    const todoModalTitleInput = document.createElement('input');
    todoModalTitleInput.type = 'text';
    todoModalTitleInput.id = 'todoModalTitle';
    todoModalTitleInput.autofocus = true;
    todoModalTitleDiv.append(todoModalTitleLabel, todoModalTitleInput);
    /*  Modal description */
    const todoModalDesc = document.createElement('div');
    todoModalDesc.id = 'todoModalDescriptionDiv';
    const todoModalDescLabel = document.createElement('label');
    todoModalDescLabel.htmlFor = 'description';
    todoModalDescLabel.textContent = 'Description/Notes:';
    const textArea = document.createElement('textarea');
    textArea.name = 'description';
    textArea.id = 'todoModalDescription';
    textArea.cols = '40';
    textArea.rows = '13';
    todoModalDesc.append(todoModalDescLabel, textArea);

    const todoModalFooter = document.createElement('div');
    todoModalFooter.id = 'todoModalFooter';
    /*  Modal Priority */
    const priorityDiv = document.createElement('div');
    priorityDiv.id = 'priorityDiv';
    const div2 = document.createElement('div');
    div2.textContent = 'Priority:';
    const priority1Label = document.createElement('label');
    priority1Label.htmlFor = 'priority1';
    priority1Label.textContent = 'Minimal';
    const priority1Input = document.createElement('input');
    priority1Input.type = 'radio';
    priority1Input.id = 'priority1';
    priority1Input.name = 'priority';
    priority1Input.value = 'priority1';
    priority1Input.checked = true;
    const priority2Label = document.createElement('label');
    priority2Label.htmlFor = 'priority2'
    priority2Label.textContent = 'Medium';
    const priority2Input = document.createElement('input');
    priority2Input.type = 'radio';
    priority2Input.id = 'priority2';
    priority2Input.name = 'priority';
    priority2Input.value = 'priority2';
    const priority3Label = document.createElement('label');
    priority3Label.htmlFor = 'priority3';
    priority3Label.textContent = 'Urgent';
    const priority3Input = document.createElement('input');
    priority3Input.type = 'radio';
    priority3Input.id = 'priority3';
    priority3Input.name = 'priority';
    priority3Input.value = 'priority3';

    priorityDiv.append(div2, priority1Label, priority1Input, priority2Label, priority2Input, priority3Label, priority3Input);

    /*  Modal due date */
    const dueDateDiv = document.createElement('div');
    dueDateDiv.id = 'dueDateDiv';
    const div3 = document.createElement('div');
    div3.textContent = 'Due Date';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'dueDate';
    dueDateDiv.append(div3, dueDateInput);

    todoModalFooter.append(priorityDiv, dueDateDiv);
    todoModalHeader.append(div, addTodoButton);
    form.append(todoModalTitleDiv, todoModalDesc, todoModalFooter);
    dialog.append(todoModalHeader,form);
}
function addTodo() {
    const dialog = document.getElementById('modal');

    const titleInput = document.getElementById('todoModalTitle');
    let title = titleInput.value;
    titleInput.value = '';
    const descInput = document.getElementById('todoModalDescription');
    let description = descInput.value;
    descInput.value = '';
    const priority1 = document.getElementById('priority1');
    const priority2 = document.getElementById('priority2');
    const priority3 = document.getElementById('priority3');
    let priority;
    if (priority1.checked) {
        priority = 1;
    } else if (priority2.checked) {
        priority = 2;
    } else  {
        priority = 3;
    }
    const dateInput = document.getElementById('dueDate');
    let dueDate = dateInput.value;
    

    let todo = new TodoItem(title, description, dueDate, priority);
    let project = checkProjectSelected();
    project.list.push(todo);
    createTodoCard(todo, project);

    clearAll(dialog);
    dialog.classList.remove('todoModal')
    dialog.close();
    todoModalOpen = false;
}
function addTodoFunction() {
    const dialog = document.getElementById('modal')
    const newTodoButton = document.getElementById('newTodoButton');
    newTodoButton.addEventListener('click', ()=> {
        if (todoModalOpen === false) {
            createTodoDialog();
            dialog.show();
            todoModalOpen = true;
        }

    })
}

export {createTodoCard, createProjectCard, projects, addProjectFunction, addTodoFunction};