const appState = {
    projects: [],
    activeProjectId: null,
};

function addProject(project){
    appState.projects.push(project);
}

function removeProject(id){
    appState.projects = appState.projects.filter(
        project => project.getId() !== id
    );
    if (appState.activeProjectId === id){
        appState.activeProjectId = null;
    }
}

function setActiveProject(id){
    for (let project of appState.projects){
        if (project.getId() === id){
            appState.activeProjectId = id;
        }
    }
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

export {
    addProject,
    removeProject,
    setActiveProject,
    getActiveProject,
    getProjectById,
    appState,
};