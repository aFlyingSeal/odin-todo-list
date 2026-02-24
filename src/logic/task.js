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
    }
    updatePriority(priority){
        this.priority = priority;
    }
    toggleCompletion(){
        this.isCompleted = !this.isCompleted;
    }

    getPriority(){ return this.priority; }
    getId(){ return this.id; }
};

export default Task;