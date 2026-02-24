import { getState } from "../logic/state";
import { saveState } from "../logic/storage";

class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        this.isCompleted = false;
        this.id = crypto.randomUUID();
    }

    updateFields(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        saveState(getState());
    }
    updatePriority(priority){
        this.priority = priority;

        saveState(getState());
    }
    toggleCompletion(){
        this.isCompleted = !this.isCompleted;

        saveState(getState());
    }

    getPriority(){ return this.priority; }
    getId(){ return this.id; }
};

export default Task;