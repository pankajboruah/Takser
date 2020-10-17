import { List } from "./List";
import { Task } from "./Task";

function loadCounters() {
    return {
        listCount: JSON.parse(localStorage.getItem("listCount")) + 1,
        taskCount: JSON.parse(localStorage.getItem("taskCount")) + 1
    };
}
function loadData() {
    let board = JSON.parse(localStorage.getItem("board"));
    board.forEach(list => {
        let tasks = list.tasks;
        let newList = new List(list.title, list.id);
        document.getElementById("app").appendChild(newList);
        tasks.forEach(task => {
            newList.shadowRoot.childNodes[2].firstElementChild.insertBefore(
                new Task(task.title, task.id),
                newList.shadowRoot.childNodes[2].firstElementChild
                    .lastElementChild
            );
        });
    });
}

function save() {
    let board = [];
    const obj = {
        id: "",
        title: "",
        tasks: []
    };
    const task = {
        id: "",
        title: ""
    };
    let elem = [...document.getElementsByTagName("*")];
    let count = 0;
    let listCount = 0;
    let taskCount = 0;
    elem.forEach(el => {
        if (el.getAttribute("type") && el.getAttribute("type") === "list") {
            const newList = Object.create(obj);
            newList.id = Number(el.shadowRoot.childNodes[2].id.split("+")[1]);
            newList.title = el.shadowRoot.childNodes[2].getAttribute("title");
            newList.tasks = [];
            board.push(newList);
            count++;
            listCount = listCount > newList.id ? listCount : newList.id;

            let listElem = el.shadowRoot.childNodes[2].childNodes[0];
            listElem.childNodes.forEach(el => {
                if (el.id) {
                    let taskElem = el.shadowRoot.childNodes[2];
                    const newTask = Object.create(task);
                    newTask.id = Number(taskElem.id.split("+")[1]);
                    newTask.title = taskElem.getAttribute("title");
                    board[count - 1].tasks.push(newTask);
                    taskCount = taskCount > newTask.id ? taskCount : newTask.id;
                }
            });
        }
    });
    localStorage.setItem("listCount", JSON.stringify(listCount));
    localStorage.setItem("taskCount", JSON.stringify(taskCount));
    localStorage.setItem("board", JSON.stringify(board));
}

function getParentHasId(el) {
    if (el.parentNode.id) {
        return el.parentNode.id;
    } else {
        return getParentHasId(el.parentNode);
    }
}
export { loadData, save, loadCounters, getParentHasId };
