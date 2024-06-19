class Project {
    list = [];
    constructor(title) {
        this.title = title;
        this.selected = false;
    }
    addTodo(item) {
        this.list.push(item);
    }
    delete(item) {
        if (this.list.includes(item)) {
            for(let  i = 0; i < this.list.length; i++) {
                if (this.list[i] === item) {
                    this.list.splice(i, 1);
                }
            }
        }
        else return false;
    }
}
class TodoItem {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export {Project, TodoItem};