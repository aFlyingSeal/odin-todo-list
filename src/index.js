import Task from "./logic/task";
import Project from "./logic/project";
import { addProject, removeProject, setActiveProject,
         getActiveProject, getProjects, getState,
         hydrateState } from "./logic/state";
import { loadState } from "./logic/storage";

// on startup, load saved state
const saved = loadState();
if (saved){
    hydrateState(saved);
}

// sample test case
const project1 = new Project("Project 1", "Project desc 1");
const task1 = new Task("Task 1", "Desc 1", Date.now(), "A");
const task2 = new Task("Task 2", "Desc 2", Date.now(), "B");

project1.addTask(task1);
project1.addTask(task2);

const project2 = new Project("Project 2", "Project desc 2");
const task3 = new Task("Task 3", "Desc 3", Date.now(), "B");
const task4 = new Task("Task 4", "Desc 4", Date.now(), "A");

project2.addTask(task3);
project2.addTask(task4);

addProject(project1);
addProject(project2);

// debugging log to check if storage.js is working
console.log(getState());