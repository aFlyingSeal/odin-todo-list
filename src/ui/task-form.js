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
    const modalTitle = document.querySelector(".modal-task-title");
    modalTitle.textContent = "Add New Task";
    
    const submitTaskBtn = document.getElementById("submit-add-task");
    submitTaskBtn.textContent = "Add Task";

    currentProjectId = projectId;

    const modal = document.querySelector(".modal-task");
    const form = document.querySelector(".task-form");

    const inputs = form.querySelectorAll("input, textarea, select");
    const submitBtn = form.querySelector("button[type='submit']");

    inputs.forEach(input => input.disabled = false);
    submitBtn.style.display = 'block';

    form.reset();
    modal.style.display = 'block';
}

function openEditTaskModal(taskId){
    const modalTitle = document.querySelector(".modal-task-title");
    modalTitle.textContent = "Edit Task";

    const submitTaskBtn = document.getElementById("submit-add-task");
    submitTaskBtn.textContent = "Update";

    currentTaskId = taskId;

    const project = getProjectById(currentProjectId);
    const task = project.getTaskById(taskId);

    const modal = document.querySelector(".modal-task");
    const form = document.getElementById("task-form");

    const inputs = form.querySelectorAll("input, textarea, select");
    const submitBtn = form.querySelector("button[type='submit']");

    inputs.forEach(input => input.disabled = false);
    submitBtn.style.display = 'block';

    document.getElementById("task-title-input").value = task.title;
    document.getElementById("task-desc-input").value = task.description;
    document.getElementById("priority-input").value = task.priority;
    document.getElementById("date-input").value = task.dueDate;

    form.style.display = 'block';
}

function openViewTaskModal(taskId){
    const modalTitle = document.querySelector(".modal-task-title");
    modalTitle.textContent = "Viewing Details";

    const project = getProjectById(currentProjectId);
    const task = project.getTaskById(taskId);

    const modal = document.querySelector(".modal-task");

    const titleInput = document.getElementById("task-title-input");
    const descInput = document.getElementById("task-desc-input");
    const priorityInput = document.getElementById("priority-input");
    const dateInput = document.getElementById("date-input");

    const submitBtn = document.querySelector(".task-form button[type='submit']");

    titleInput.value = task.title;
    descInput.value = task.description;
    priorityInput.value = task.priority;
    dateInput.value = task.dueDate;

    titleInput.disabled = true;
    descInput.disabled = true;
    priorityInput.disabled = true;
    dateInput.disabled = true;

    submitBtn.style.display = 'none';
    modal.style.display = 'block';
}

export {
    setCurrentProject,
    getTaskModal,
    initTaskForm,
    openCreateTaskModal,
    openEditTaskModal,
    openViewTaskModal
};