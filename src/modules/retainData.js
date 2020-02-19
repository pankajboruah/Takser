import {createList, createTask} from "./create"
function loadData() {
    let listArray = JSON.parse(localStorage.getItem("list"));
    let taskArray = JSON.parse(localStorage.getItem("task"));
  
    Object.keys(listArray).forEach((list, i) => {
      createList(Object.values(listArray)[i], list);
    });
    Object.keys(taskArray).forEach((list, i) => {
      createTask(Object.values(taskArray)[i].split("-")[0], Object.values(taskArray)[i].split("-")[1], list);
    });
  }
  
  function saveData(listObj, taskObj) {
    localStorage.setItem("list", JSON.stringify(listObj));
    localStorage.setItem("task", JSON.stringify(taskObj));
  }

  export {loadData, saveData}