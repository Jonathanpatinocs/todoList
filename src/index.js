import './main.css';
import { Project, TodoItem } from './todo';
import { createTodoCard } from './dom';

function createMain() {
    const projectsList = document.getElementById('projects-list');
    const main = new Project('Main');
    const div = document.createElement('div');
    div.classList.add('project')
    div.textContent = main.title;
    projectsList.append(div);

}
let todo1 = new TodoItem('title', 'kjdslkfj sklfj skdfj ks ksjdf l', '07/16/03', 1);

createMain();
createTodoCard(todo1);
