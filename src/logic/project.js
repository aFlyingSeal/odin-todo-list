class Project{
    constructor(title, description){
        this.title = title;
        this.description = description;

        this.tasks = [];
        this.id = crypto.randomUUID();
    }

    addTask(task){
        this.tasks.push(task);
    }
    removeTask(id){
        this.tasks = this.tasks.filter(task => task.getId() !== id);
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