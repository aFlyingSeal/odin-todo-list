import { removeProject, setActiveProject, getState } from "../logic/state";
import { renderTaskList } from "./tasks-view";

function renderProjectList(){
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    // Create section heading
    const heading = document.createElement("h2");
    heading.textContent = "Your projects";
    mainContainer.appendChild(heading);

    // Create container for holding project cards
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    const { projects, activeProjectId } = getState();

    // Render each projects
    for (let project of projects){
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        if (project.getId() === activeProjectId){
            projectCard.classList.add("active-project");
        }
        
        // Create title, description for lists
        const title = document.createElement("p");
        title.textContent = project.title;

        projectCard.appendChild(title);

        // Create buttons for every project card
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        const setActiveBtn = document.createElement("button");
        setActiveBtn.textContent = "Set Active";
        setActiveBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            setActiveProject(project.getId());
            renderProjectList();
        });
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeProject(project.getId());
            renderProjectList();
        });

        btnContainer.append(setActiveBtn, removeBtn);
        projectCard.appendChild(btnContainer);

        // Click a project card to show its info and tasks
        projectCard.addEventListener("click", () => {
            setActiveProject(project.getId());
            renderProjectList();
            renderTaskList(project.getId());
        });

        projectsContainer.appendChild(projectCard);
    }

    mainContainer.appendChild(projectsContainer);
}

export { renderProjectList };