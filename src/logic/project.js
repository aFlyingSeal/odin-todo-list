import { getState } from "./state";
import { saveState } from "./storage";

class Project{
    constructor(title, description){
        this.title = title;
        this.description = description;

        this.tasks = [];
        this.id = crypto.randomUUID();
    }

    addTask(task){
        this.tasks.push(task);

        saveState(getState());
    }
    removeTask(id){
        this.tasks = this.tasks.filter(task => task.getId() !== id);

        saveState(getState());
    }
    getTaskById(id){
        return this.tasks.find(task => task.getId() === id) || null;
    }
    filterByPriority(priority){
        return this.tasks.filter(task => task.getPriority() === priority);
    }

    getId(){ return this.id; }
};

export default Project;