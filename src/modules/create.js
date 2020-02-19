import { allowDrop, drag, drop } from "./drag";
import { saveData, loadData } from "./retainData";

let counter = 0;
let taskCounter = 0;
let taskObj = {};
let listObj = {};

function initiator() {
  //add save and load
  window.addEventListener("beforeunload", function() {
    saveData(listObj, taskObj);
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
    document.querySelector(".createListContainer").style.display = "flex";
    document.querySelector(".listAdderContainer").style.display = "none";
    createList(title.value, `ul+${counter}`);
  });

  //close button
  closeBtn.innerHTML = "X";
  closeBtn.addEventListener("click", function() {
    document.querySelector(".createListContainer").style.display = "flex";
    document.querySelector(".listAdderContainer").style.display = "none";
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
  parentContainer.id = divId;
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

  // parentContainer.draggable = "true";
  // parentContainer.addEventListener("drop", function(event){
  //   drop(event)
  // });
  // parentContainer.addEventListener("dragover", function(event){
  //   allowDrop(event)
  // });
  // parentContainer.addEventListener("dragstart", function(event){
  //   drag(event)
  // });

  //phase 1
  title.innerHTML = name;
  deleteListBtn.innerHTML = "X";
  addTaskBtn.innerHTML = "Add Task";

  //saving to local storage
  listObj[parentContainer.id] = title.innerHTML;

  //toggle list adder
  addTaskBtn.addEventListener("click", function() {
    addTaskBtn.style.display = "none";
    addTaskContainer.style.display = "flex";
  });

  //delete list
  deleteListBtn.addEventListener("click", function() {
    let deleted = document
      .getElementById("app")
      .removeChild(deleteListBtn.parentElement.parentElement.parentElement);

    //saving to local storage
    let deletedId = deleted.id.toString();
    delete listObj[deletedId];
  });

  //phase 2
  taskName.placeholder = "Enter Task Name";
  createTaskBtn.textContent = "Done";
  createTaskBtn.addEventListener("click", function() {
    addTaskBtn.style.display = "";
    addTaskContainer.style.display = "none";
    createTask(parentContainer.id, taskName.value, `task+${taskCounter}`);
    taskName.value = "";
  });
  //close button
  closeBtn.innerHTML = "X";
  closeBtn.addEventListener("click", function() {
    addTaskBtn.style.display = "";
    addTaskContainer.style.display = "none";
    taskName.value = "";
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
  document.getElementById("app").appendChild(parentContainer);
  counter++;
  return;
}

function createTask(parent, taskName, divId) {
  // save to local storage
  taskObj[divId] = `${parent}-${taskName}`;

  //containers
  let parentContainer = document.createElement("div");
  let btnContainer = document.createElement("div");
  //elements
  let title = document.createElement("div");
  let saveBtn = document.createElement("div");
  let editBtn = document.createElement("div");
  let closeBtn = document.createElement("div");

  //style
  parentContainer.className = "sublist";
  btnContainer.className = "btnContainer";
  saveBtn.className = "btn btn-success";
  saveBtn.style.display = "none";
  editBtn.className = "btn btn-default glyphicon glyphicon-pencil";
  closeBtn.className = "btn btn-danger";
  title.className = "title";

  //phase 1
  parentContainer.id = divId;
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

  //edit
  editBtn.addEventListener("click", function() {
    title.contentEditable = true;
    // btnContainer.style.display = "none";
    saveBtn.style.display = "";
    editBtn.style.display = "none";
    closeBtn.style.display = "none";
    title.focus();
  });
  //save
  saveBtn.innerHTML = "Save";
  saveBtn.addEventListener("click", function() {
    title.contentEditable = false;
    saveBtn.style.display = "none";
    editBtn.style.display = "";
    closeBtn.style.display = "";
  });

  //delete
  closeBtn.addEventListener("click", function() {
    let deleted = closeBtn.parentElement.parentElement.removeChild(
      closeBtn.parentNode
    );

    //save to local storage
    delete taskObj[deleted.id];
  });

  //phase 2
  parentContainer.appendChild(title);
  parentContainer.appendChild(editBtn);
  parentContainer.appendChild(closeBtn);
  parentContainer.appendChild(saveBtn);
  document
    .getElementById(parent)
    .firstElementChild.insertBefore(
      parentContainer,
      document.getElementById(parent).firstElementChild.lastElementChild
    );
  taskCounter++;
  return;
}

export { initiator, createList, createTask, loadData, saveData };
