import { createTask } from "./createTask";
import { allowDrop, drag, drop } from "./drag";
import { loadCounters } from "./retainData";

let taskCounter = loadCounters();
taskCounter = taskCounter.taskCount ? taskCounter.taskCount : 0;
function createList(name, divId) {
    // containers
    let parentContainer = document.createElement("div");
    let divWrapper = document.createElement("div");
    let btnContainer = document.createElement("div");
    let addTaskContainer = document.createElement("div");
    let headerContainer = document.createElement("div");
    //elements
    let title = document.createElement("div");
    let addTaskBtn = document.createElement("div");
    let taskName = document.createElement("input");
    let createTaskBtn = document.createElement("div");
    let closeBtn = document.createElement("div");
    let deleteListBtn = document.createElement("div");

    //style
    parentContainer.id = `ul+${divId}`;
    parentContainer.setAttribute("title", name);
    parentContainer.setAttribute("type", "list");
    parentContainer.className = "parentContainer col-sm-2";
    addTaskContainer.className = "addTaskContainer";
    headerContainer.className = "headerContainer";
    btnContainer.className = "btnContainer";
    divWrapper.className = "list";
    title.className = "title";
    addTaskBtn.className = "btn btn-success";
    closeBtn.className = "btn btn-danger";
    deleteListBtn.className = "btn btn-danger";
    createTaskBtn.className = "btn btn-success";
    deleteListBtn.setAttribute("parentContainer", parentContainer.id);
    //handle swap
    parentContainer.draggable = "true";
    parentContainer.addEventListener("drop", function(event) {
        drop(event);
    });
    parentContainer.addEventListener("dragover", function(event) {
        allowDrop(event);
    });
    parentContainer.addEventListener("dragstart", function(event) {
        drag(event);
    });

    //phase 1
    title.innerHTML = name;
    deleteListBtn.innerHTML = "X";
    addTaskBtn.innerHTML = "Add Task";

    //toggle list adder
    addTaskBtn.addEventListener("click", function() {
        addTaskBtn.style.display = "none";
        addTaskContainer.style.display = "flex";
        taskName.focus();
    });

    //delete list
    deleteListBtn.addEventListener("click", function() {
        document
            .getElementById("app")
            .removeChild(
                deleteListBtn.parentElement.parentElement.parentElement
            );
    });

    //phase 2
    taskName.placeholder = "Enter Task Name";
    createTaskBtn.textContent = "Done";
    createTaskBtn.addEventListener("click", function() {
        if (taskName.value.trim() == "") {
            taskName.style.borderColor = "red";
            taskName.value = "";
            taskName.focus();
        } else {
            addTaskBtn.style.display = "";
            addTaskContainer.style.display = "none";
            document
                .getElementById(parentContainer.id)
                .firstElementChild.insertBefore(
                    createTask(taskName.value, taskCounter),
                    document.getElementById(parentContainer.id)
                        .firstElementChild.lastElementChild
                );
            taskCounter++;
            taskName.value = "";
        }
    });
    //close button
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", function() {
        addTaskBtn.style.display = "";
        addTaskContainer.style.display = "none";
        taskName.value = "";
        taskName.style.borderColor = "";
    });

    //card creation
    headerContainer.appendChild(title);
    headerContainer.appendChild(deleteListBtn);
    divWrapper.appendChild(headerContainer);
    divWrapper.appendChild(addTaskBtn);
    btnContainer.appendChild(createTaskBtn);
    btnContainer.appendChild(closeBtn);
    addTaskContainer.appendChild(taskName);
    addTaskContainer.appendChild(btnContainer);

    parentContainer.appendChild(divWrapper);
    parentContainer.appendChild(addTaskContainer);
    return parentContainer;
}

export { createList };
