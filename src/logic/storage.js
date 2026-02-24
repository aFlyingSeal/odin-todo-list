import Task from "../models/task";
import Project from "../models/project";

const KEY = "odin-todo-list";

function saveState(state){
    // convert data to a JSON string to store into localStorage
    const data = {
        projects: state.projects.map(project => ({
            title: project.title,
            description: project.description,
            tasks: project.tasks.map(task => ({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                isCompleted: task.isCompleted,
                id: task.id,
            })),
            id: project.id,
        })),
        activeProjectId: state.activeProjectId,
    };
    
    localStorage.setItem(KEY, JSON.stringify(data));
}

function loadState(){
    const data = localStorage.getItem(KEY);
    if (!data){
        return null;
    }
    // parse data back to JSON object and map everything back
    const parsed = JSON.parse(data);

    const projects = parsed.projects.map(p => {
        const project = new Project(p.title, p.description);
        p.tasks.forEach(t => {
            const task = new Task(t.title, t.description, t.dueDate, t.priority);
            task.isCompleted = t.isCompleted;
            task.id = t.id;

            project.addTask(task);
        });
        project.id = p.id;

        return project;
    });

    return {
        projects,
        activeProjectId: parsed.activeProjectId,
    }
}

function clearState(){
    localStorage.removeItem(KEY);
}

export { saveState, loadState, clearState };