import { allowDrop, drag, drop } from "./drag";
import { save, loadData } from "./retainData";

let counter = 0;
let taskCounter = 0;

function initiator() {
    //add save and load
    window.addEventListener("beforeunload", function() {
        save();
    });
    window.addEventListener("load", loadData);

    //containers
    let parentContainer = document.createElement("div");
    let divWrapper = document.createElement("div");
    let listAdder = document.createElement("div");
    let btnContainer = document.createElement("div");

    //elements
    let title = document.createElement("input");
    let submitBtn = document.createElement("div");
    let closeBtn = document.createElement("div");

    //style
    parentContainer.className = "parentContainer col-sm-2";
    divWrapper.className = "createListContainer";
    listAdder.className = "listAdderContainer";
    btnContainer.className = "btnContainer";
    title.className = "title";
    title.placeholder = "List Name";
    submitBtn.innerHTML = "Done";
    submitBtn.className = "btn btn-success";
    closeBtn.className = "btn btn-danger";

    //phase 1
    divWrapper.innerHTML = "+ Add another List";
    divWrapper.addEventListener("click", function() {
        document.querySelector(".createListContainer").style.display = "none";
        document.querySelector(".listAdderContainer").style.display = "flex";
    });

    //phase 2
    submitBtn.addEventListener("click", function() {
        if (title.value.trim() == "") {
            title.style.borderColor = "red";
            title.value = "";
            title.focus();
        } else {
            document.querySelector(".createListContainer").style.display =
                "flex";
            document.querySelector(".listAdderContainer").style.display =
                "none";
            document
                .getElementById("app")
                .appendChild(createList(title.value, counter));
            title.value = "";
        }
    });

    //close button
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", function() {
        document.querySelector(".createListContainer").style.display = "flex";
        document.querySelector(".listAdderContainer").style.display = "none";
        title.style.borderColor = "";
        title.value = "";
    });

    //card creation
    btnContainer.appendChild(submitBtn);
    btnContainer.appendChild(closeBtn);
    listAdder.appendChild(title);
    listAdder.appendChild(btnContainer);
    parentContainer.appendChild(divWrapper);
    parentContainer.appendChild(listAdder);
    document.getElementById("app").appendChild(parentContainer);

    return;
}

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
    // divWrapper.id = `li+${divId.split("+")[1]}`
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
            // console.log("hey", parentContainer.id);
            document
                .getElementById(parentContainer.id)
                .firstElementChild.insertBefore(
                    createTask(taskName.value, taskCounter),
                    document.getElementById(parentContainer.id).firstElementChild
                        .lastElementChild
                );
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
    //document.getElementById("app").appendChild(parentContainer);
    counter++;
    return parentContainer;
}

function createTask(taskName, divId) {
    //containers
    let parentContainer = document.createElement("div");
    let btnContainer = document.createElement("div");
    //elements
    let title = document.createElement("div");
    let saveBtn = document.createElement("div");
    let editBtn = document.createElement("div");
    let closeBtn = document.createElement("div");

    //style
    parentContainer.className = "task";
    parentContainer.setAttribute("title", taskName);
    parentContainer.setAttribute("type", "task");
    btnContainer.className = "btnContainer";
    saveBtn.className = "btn btn-success";
    saveBtn.style.display = "none";
    editBtn.className = "btn btn-default glyphicon glyphicon-pencil";
    closeBtn.className = "btn btn-danger";
    title.className = "title";

    //phase 1
    parentContainer.id = `task+${divId}`;

    //handle swap
    parentContainer.draggable = "true";
    parentContainer.addEventListener("drop", function(event) {
        // console.log('drop event', event.currentTarget)
        drop(event);
    });
    parentContainer.addEventListener("dragover", function(event) {
        allowDrop(event);
    });
    parentContainer.addEventListener("dragstart", function(event) {
        drag(event);
    });

    title.innerHTML = taskName;
    closeBtn.innerHTML = "X";

    //event delegation
    parentContainer.addEventListener("click", function(event) {
        let target = event.target; // where was the click?

        if (target.tagName != "DIV") return; // not on TD? Then we're not interested

        console.log(target); // highlight it
    });

    //edit
    editBtn.addEventListener("click", function() {
        title.contentEditable = true;
        // btnContainer.style.display = "none";
        saveBtn.style.display = "";
        editBtn.style.display = "none";
        closeBtn.style.display = "none";
        title.focus();
        // console.log(title.innerHTML.length)
        // title.setSelectionRange(title.innerHTML.length, title.innerHTML.length);
    });
    //save
    saveBtn.innerHTML = "Save";
    saveBtn.addEventListener("click", function() {
        if (title.innerHTML.trim() == "") {
            title.style.borderColor = "red";
            title.value = "";
            title.focus();
        } else {
            title.contentEditable = false;
            saveBtn.style.display = "none";
            editBtn.style.display = "";
            closeBtn.style.display = "";
        }
    });

    //delete
    closeBtn.addEventListener("click", function() {
        let deleted = closeBtn.parentElement.parentElement.removeChild(
            closeBtn.parentNode
        );
    });

    //phase 2
    parentContainer.appendChild(title);
    parentContainer.appendChild(editBtn);
    parentContainer.appendChild(closeBtn);
    parentContainer.appendChild(saveBtn);
    taskCounter++;
    return parentContainer;
}

export { initiator, createList, createTask };
