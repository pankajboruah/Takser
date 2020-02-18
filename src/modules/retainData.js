import {createList, createTask} from "./create"
function loadData() {
    let listArray = JSON.parse(localStorage.getItem("list"));
    let taskArray = JSON.parse(localStorage.getItem("task"));
  
    console.log("load list", listArray);
    console.log("load task", taskArray);
    Object.keys(listArray).forEach((list, i) => {
      console.log(Object.values(listArray)[i], list);
      createList(Object.values(listArray)[i], list);
    });
    Object.keys(taskArray).forEach((list, i) => {
      console.log('this',Object.values(taskArray)[i].split("-")[0], Object.values(taskArray)[i].split("-")[1], list);
      createTask(Object.values(taskArray)[i].split("-")[0], Object.values(taskArray)[i].split("-")[1], list);
    });
  }
  
  function saveData(listObj, taskObj) {
    // console.log('save',listObj)
    localStorage.setItem("list", JSON.stringify(listObj));
    localStorage.setItem("task", JSON.stringify(taskObj));
  }

  export {loadData, saveData}