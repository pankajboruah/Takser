import { createList, taskCounter } from "./createList";
import { counter } from "./create";
import { createTask } from "./createTask";

function loadCounters() {
    return {
        listCount: JSON.parse(localStorage.getItem("listCount")),
        taskCount: JSON.parse(localStorage.getItem("taskCount"))
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
                .getElementById(task.parent)
                .firstElementChild.insertBefore(
                    createTask(task.title, task.id),
                    document.getElementById(task.parent).firstElementChild
                        .lastElementChild
                );
        });
    });
}

function save() {
    localStorage.setItem("listCount", JSON.stringify(counter));
    localStorage.setItem("taskCount", JSON.stringify(taskCounter));
    let board = [];
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
    let count = 0;
    elem.forEach(el => {
        if (el.id && el.getAttribute("title")) {
            if (el.getAttribute("type") === "list") {
                const newList = Object.create(obj);
                newList.id = el.id.split("+")[1];
                newList.title = el.getAttribute("title");
                newList.tasks = [];
                board.push(newList);
                count++;
            } else {
                const newTask = Object.create(task);
                newTask.id = el.id.split("+")[1];
                newTask.title = el.getAttribute("title");
                newTask.parent = getParentHasId(el);
                board[count - 1].tasks.push(newTask);
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
export { loadData, save, loadCounters };
