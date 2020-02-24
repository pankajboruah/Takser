import { createList, createTask } from "./create";
function loadData() {
    // let listArray = JSON.parse(localStorage.getItem("list"));
    // let taskArray = JSON.parse(localStorage.getItem("task"));
    // Object.keys(listArray).forEach(list => {
    //     createList(listArray[list], list.split("+")[1]);
    // });
    // Object.keys(taskArray).forEach((list, i) => {
    //     if (listArray[taskArray[list].split("-")[0]])
    //         createTask(
    //             taskArray[list].split("-")[0],
    //             taskArray[list].split("-")[1],
    //             list.split("+")[1]
    //         );
    // });

    let board = JSON.parse(localStorage.getItem("board"));
    board.forEach(list => {
        let tasks = list.tasks;
        createList(list.title, list.id);
        tasks.forEach(task => {
            createTask(task.parent, task.title, task.id);
        });
    });
}

// function saveData(listObj, taskObj) {
//     localStorage.setItem("list", JSON.stringify(listObj));
//     localStorage.setItem("task", JSON.stringify(taskObj));
// }

function save() {
    let board = []
    const obj = {
        id: "",
        title: "",
        tasks: []
    };
    const task = {
        id: "",
        title: "",
        parent: ""
    };
    let elems = document.getElementsByTagName("*");
    let elem = [...elems];
    let counter = 0; 
    elem.forEach(el => {
        if (el.id && el.getAttribute("title")) {
            if (el.getAttribute("type") === "list") {
                const newList = Object.create(obj);
                newList.id = el.id.split("+")[1];
                newList.title = el.getAttribute("title");
                newList.tasks = [];
                board.push(newList);
                counter++;
            } else {
                const newTask = Object.create(task);
                newTask.id = el.id.split("+")[1];
                newTask.title = el.getAttribute("title");
                newTask.parent = getParentHasId(el);
                // tasks.push(newTask)
                board[counter-1].tasks.push(newTask);
            }
        }
    });
    localStorage.setItem("board", JSON.stringify(board));
}

function getParentHasId(el) {
    if (el.parentNode.id) {
        return el.parentNode.id;
    } else {
        return getParentHasId(el.parentNode);
    }
}
export { loadData, save };
