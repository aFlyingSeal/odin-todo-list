import { hydrateState, getActiveProject } from "./logic/state";
import { clearState, loadState } from "./logic/storage";
import { initNavBar, initProjectForm } from "./ui/nav-bar";
import { initTaskForm } from "./ui/task-form";

// on startup, load saved state
const saved = loadState();
if (saved){
    hydrateState(saved);
}

const projectModal = document.querySelector(".modal-project");
const taskModal = document.querySelector(".modal-task");

projectModal.style.display = 'none';
taskModal.style.display = 'none';

initNavBar();
initProjectForm();
initTaskForm();