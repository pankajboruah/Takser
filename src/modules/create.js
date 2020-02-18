import { allowDrop, drag, drop } from "./drag";
import { saveData, loadData } from "./retainData"

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
  title.style.overflow = "hidden";
  title.style.wordWrap = "break-word";
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
  //btnContainer.className = "btnContainer";
  submitBtn.addEventListener("click", function() {
    document.querySelector(".createListContainer").style.display = "flex";
    document.querySelector(".listAdderContainer").style.display = "none";
    createList(title.value, `ul+${counter}`);
    // console.log(title.value)
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
  title.style.overflow = "hidden";
  title.style.wordWrap = "break-word";
  addTaskBtn.className = "btn btn-success";
  headerContainer.className = "headerContainer";
  divWrapper.className = "list";
  closeBtn.className = "btn btn-danger";
  deleteListBtn.className = "btn btn-danger";
  addTaskContainer.className = "addTaskContainer";
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
    console.log("after delete ", listObj);
  });

  //phase 2
  taskName.placeholder = "Enter Task Name";
  taskName.value = "";
  createTaskBtn.textContent = "Done";
  createTaskBtn.addEventListener("click", function() {
    addTaskBtn.style.display = "";
    addTaskContainer.style.display = "none";
    createTask(parentContainer.id, taskName.value, `task+${taskCounter}`);
  });
  //close button
  closeBtn.innerHTML = "X";
  closeBtn.addEventListener("click", function() {
    addTaskBtn.style.display = "";
    addTaskContainer.style.display = "none";
  });
  //btnContainer.className = "btnContainer";

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
  // taskArray.push(taskCounter);
  taskObj[divId] = `${parent}-${taskName}`;
  console.log("task add", taskObj);

  // let divWrapper = document.createElement("div");
  // let editContainer = document.createElement("div");
  // let editTitle = document.createElement("div");
  let parentContainer = document.createElement("div");
  let btnContainer = document.createElement("div");
  let title = document.createElement("div");
  let saveBtn = document.createElement("div");
  let submitBtn = document.createElement("div");
  let closeBtn = document.createElement("div");
  saveBtn.style.display = "none";

  //phase 1
  btnContainer.className = "btnContainer";
  parentContainer.className = "sublist";
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

  // console.log(parentContainer.id);
  // divWrapper.className = "sublist";
  title.innerHTML = taskName;
  submitBtn.className = "btn btn-default glyphicon glyphicon-pencil";
  closeBtn.className = "btn btn-danger";
  closeBtn.innerHTML = "X";

  //edit
  title.style.overflow = "hidden";
  title.style.wordWrap = "break-word";
  submitBtn.addEventListener("click", function() {
    title.contentEditable = true;
    // btnContainer.style.display = "none";
    saveBtn.style.display = "";
    submitBtn.style.display = "none";
    closeBtn.style.display = "none";
    title.focus();
  });
  //save
  saveBtn.innerHTML = "Save";
  saveBtn.addEventListener("click", function() {
    title.contentEditable = false;
    saveBtn.style.display = "none";
    submitBtn.style.display = "";
    closeBtn.style.display = "";
    // btnContainer.style.display = "none";
  });

  //delete
  closeBtn.addEventListener("click", function() {
    // document.getElementById(parent).childNodes[0].childNodes[0].removeChild(closeBtn.parentNode);
    let deleted = closeBtn.parentElement.parentElement.removeChild(
      closeBtn.parentNode
    );
    // taskArray.splice( taskArray.indexOf(Number(deleted.id.split('+')[1])), 1 );
    delete taskObj[deleted.id];
    console.log("task del", taskObj);
  });

  //phase 2
  saveBtn.className = "btn btn-success";
  parentContainer.appendChild(title);
  parentContainer.appendChild(submitBtn);
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
