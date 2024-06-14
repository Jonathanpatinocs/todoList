import './main.css';

const test = document.createElement('div');
test.textContent = 'worked';
const div = document.getElementById('test');
div.append(test);