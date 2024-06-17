import './main.css';
import './todo.css';
import { Project, TodoItem } from './todo';
import { createProjectCard, createTodoCard, projects, addProjectFunction } from './dom';


function createMain() {
    const projectsList = document.getElementById('projects-list');
    const main = new Project('Main');
    projects.push(main);
    main.selected = true;
    const div = document.createElement('div');
    div.classList.add('project')
    div.textContent = main.title;
    

}
createMain();
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
project2.list.push(todo1);
addProjectFunction();


for (let i = 0; i < projects.length; i++) {
    createProjectCard( projects[i], projects)
}

