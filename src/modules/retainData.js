import { createList } from "./createList";
import { createTask } from "./createTask";

function loadCounters() {
    return {
        listCount: JSON.parse(localStorage.getItem("listCount"))+1,
        taskCount: JSON.parse(localStorage.getItem("taskCount"))+1
    };
}
function loadData() {
    let board = JSON.parse(localStorage.getItem("board"));
    board.forEach(list => {
        let tasks = list.tasks;
        document
            .getElementById("app")
            .appendChild(createList(list.title, list.id));
        tasks.forEach(task => {
            document
                .getElementById(`ul+${list.id}`)
                .firstElementChild.insertBefore(
                    createTask(task.title, task.id),
                    document.getElementById(`ul+${list.id}`).firstElementChild
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
        if (el.id && el.getAttribute("title")) {
            if (el.getAttribute("type") === "list") {
                const newList = Object.create(obj);
                newList.id = Number(el.id.split("+")[1]);
                newList.title = el.getAttribute("title");
                newList.tasks = [];
                board.push(newList);
                count++;
                listCount = listCount > newList.id ? listCount : newList.id;
            } else {
                const newTask = Object.create(task);
                newTask.id = Number(el.id.split("+")[1]);
                newTask.title = el.getAttribute("title");
                board[count - 1].tasks.push(newTask);
                taskCount = taskCount > newTask.id ? taskCount : newTask.id;
            }
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
export { loadData, save, loadCounters };
