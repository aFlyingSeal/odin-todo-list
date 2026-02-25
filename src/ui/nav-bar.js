import Project from "../models/project";
import { renderProjectList } from "./projects-view";
import { addProject } from "../logic/state";

function initNavBar(){
    const displayProjectsBtn = document.getElementById("display-projects-btn");
    const addProject = document.getElementById("add-project-btn");

    const form = document.getElementById("project-form");

    displayProjectsBtn.addEventListener("click", () => {
        renderProjectList();
    });

    addProject.addEventListener("click", () => {
        form.style.display = 'block';
    });
}

function initProjectForm(){
    const modal = document.querySelector(".modal-project");
    const form = document.querySelector(".project-form");
    const cancelBtn = document.getElementById("cancel-add-project");

    cancelBtn.addEventListener("click", () => {
        modal.style.display = 'none';
        form.reset();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("project-title-input").value;
        const desc = document.getElementById("project-desc-input").value;

        const project = new Project(title, desc);
        addProject(project);

        form.reset();
        renderProjectList();
        modal.style.display = 'none';
    });
}

export { initNavBar, initProjectForm };