import { removeTask, getProjectById } from "../logic/state";
import { renderProjectList } from "./projects-view";
import { initTaskForm, getTaskModal } from "./task-form";

function renderTaskList(projectId){
    const project = getProjectById(projectId);
    if (!project){
        renderProjectList();
        return;
    }

    console.log(project);

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    // Create section for holding title, desc and return button
    const headingContainer = document.createElement("div");
    headingContainer.classList.add("heading-container");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    infoContainer.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
    `;

    const returnBtn = document.createElement("button");
    returnBtn.classList.add("return-btn");
    returnBtn.textContent = "Return";
    returnBtn.addEventListener("click", () => {
        renderProjectList();
    });

    headingContainer.append(infoContainer, returnBtn);

    // Create section to seperate the page in half
    // I will possibly add a progress bar to this soon
    const pageSeparator = document.createElement("div");
    pageSeparator.classList.add("page-seperator");

    pageSeparator.innerHTML = "<h3>Tasks</h3>";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-task-btn");
    addTaskBtn.textContent = "Add New Task";
    addTaskBtn.addEventListener("click", () => {
        getTaskModal().style.display = 'block';
    });
    
    pageSeparator.appendChild(addTaskBtn);

    // Create container to contain task card elements
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("task-container");

    for (let task of project.tasks){
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        taskCard.innerHTML = `
            <input type="checkbox">
            <p>${task.title}</p>
            <p>${task.dueDate}</p>
        `;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeTask(projectId, task.getId());
            renderTaskList(projectId);
        });

        btnContainer.appendChild(removeBtn);

        tasksContainer.appendChild(taskCard);
    }

    mainContainer.append(headingContainer, pageSeparator, tasksContainer);
    initTaskForm(projectId);
}

export { renderTaskList };