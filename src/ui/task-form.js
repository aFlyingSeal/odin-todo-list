import Task from "../models/task";
import { getProjectById } from "../logic/state";
import { renderTaskList } from "./tasks-view";

let currentProjectId = null;
let currentTaskId = null;
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
    initialized = true;

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

        if (currentTaskId){
            const task = project.getTaskById(currentTaskId);

            task.title = title;
            task.desc = desc;
            task.date = date;
            task.priority = priority;

            currentTaskId = null;
        }
        else{
            const task = new Task(title, desc, date, priority);
            project.addTask(task);
        }

        form.reset();
        modal.style.display = 'none';
        renderTaskList(currentProjectId);
    });
}

function openCreateTaskModal(projectId){
    currentProjectId = projectId;

    const modal = document.querySelector(".modal-task");
    const form = document.querySelector(".task-form");

    form.reset();
    modal.style.display = 'block';
}

function openEditTaskModal(taskId){
    currentTaskId = taskId;

    const project = getProjectById(currentProjectId);
    const task = project.getTaskById(taskId);

    const form = document.querySelector(".modal-task");

    document.getElementById("task-title-input").value = task.title;
    document.getElementById("task-desc-input").value = task.description;
    document.getElementById("priority-input").value = task.priority;
    document.getElementById("date-input").value = task.dueDate;

    form.style.display = 'block';
}

export {
    setCurrentProject,
    getTaskModal,
    initTaskForm,
    openCreateTaskModal,
    openEditTaskModal,
};