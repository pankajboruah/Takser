import { allowDrop, drag, drop } from "./drag";

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
        let target = event.target;

        if (target.tagName != "DIV") return;

        console.log(target);
    });

    //edit
    editBtn.addEventListener("click", function() {
        title.contentEditable = true;
        saveBtn.style.display = "";
        editBtn.style.display = "none";
        closeBtn.style.display = "none";
        title.focus();
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
    return parentContainer;
}

export { createTask };
