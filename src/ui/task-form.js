import Task from "../models/task";
import { getProjectById } from "../logic/state";
import { renderTaskList } from "./tasks-view";

let currentProjectId = null;
let initialized = false;

function setCurrentProject(id){
    currentProjectId = id;
}

function getTaskModal(){
    const taskModal = document.querySelector(".modal-task");
    return taskModal;
}

// IMPORTANT: initTaskForm must run once only.
// Do NOT call from render functions.
function initTaskForm(){
    if (initialized){
        return;
    }
    initialized = false;

    const modal = document.querySelector(".modal-task");
    const form = document.querySelector(".task-form");
    const cancelBtn = document.getElementById("cancel-add-task");

    cancelBtn.addEventListener("click", () => {
        modal.style.display = 'none';
        form.reset();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const project = getProjectById(currentProjectId);
        if (!project){
            return;
        }

        const title = document.getElementById("task-title-input").value;
        const desc = document.getElementById("task-desc-input").value;
        const date = document.getElementById("date-input").value;
        const priority = document.getElementById("priority-input").value;

        const task = new Task(title, desc, date, priority);
        project.addTask(task);

        form.reset();
        modal.style.display = 'none';
        renderTaskList(currentProjectId);
    });
}

export {
    setCurrentProject,
    getTaskModal,
    initTaskForm
};