import { saveState } from "./storage";

const appState = {
    projects: [],
    activeProjectId: null,
};

function addProject(project){
    appState.projects.push(project);

    saveState(getState());
}

function removeProject(id){
    appState.projects = appState.projects.filter(
        project => project.getId() !== id
    );
    if (appState.activeProjectId === id){
        appState.activeProjectId = null;
    }

    saveState(getState());
}

function removeTask(projectId, taskId){
    const project = getProjectById(projectId);
    if (!project){
        return;
    }
    project.removeTask(taskId);
    saveState(getState());
}

function setActiveProject(id){
    for (let project of appState.projects){
        if (project.getId() === id){
            appState.activeProjectId = id;
            saveState(getState());
            return;
        }
    }
}

function hydrateState(state){
    appState.projects = state.projects;
    appState.activeProjectId = state.activeProjectId;
}

function getActiveProject(){
    for (let project of appState.projects){
        if (project.getId() === appState.activeProjectId){
            return project;
        }
    }
    return null;
}

function getProjectById(id){
    return appState.projects.find(project => project.getId() === id);
}

function getState(){
    return appState;
}

export {
    addProject,
    removeProject,
    removeTask,
    setActiveProject,
    hydrateState,
    getActiveProject,
    getProjectById,
    getState,
};