import './main.css';
import './todo.css';
import { Project, TodoItem } from './todo';
import { createProjectCard, createTodoCard } from './dom';

const projects = [];
function createMain() {
    const projectsList = document.getElementById('projects-list');
    const main = new Project('Main');
    const div = document.createElement('div');
    div.classList.add('project')
    div.textContent = main.title;
    projectsList.append(div);

}

const project1 = new Project('school');
const project2 = new Project('work');
projects.push(project1);
projects.push(project2);
let todo1 = new TodoItem('title', 'kjdslkfj sklfj skdfj ks ksjdf l', '07/16/03', 1);
let todo2 = new TodoItem('title2', 'kjdslkfj sklfj skdfj ks ksjdf l', '07/16/03', 1);
let todo3 = new TodoItem('title3', 'kjdslkfj sklfj skdfj ks ksjdf l', '07/16/03', 1);
project1.list.push(todo1);
project1.list.push(todo2);
project1.list.push(todo3);

createMain();
for (let i = 0; i < project1.list.length; i++) {
    createTodoCard(project1.list[i]);
}
for (let i = 0; i < projects.length; i++) {
    createProjectCard( projects[i], projects)
}

