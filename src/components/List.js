import { Task } from "./Task";
import { loadCounters } from "../modules/retainData";
import { allowDrop, drag, drop } from "../modules/drag";
import { CardCreator } from "./cardCreator";
let taskCounter = loadCounters();
taskCounter = taskCounter.taskCount ? taskCounter.taskCount : 0;
class List extends HTMLElement {
    constructor(name, divId) {
        super();
        let shadow = this.attachShadow({ mode: "open" });
        shadow.host.className = "col-md-2";
        shadow.host.id = `list+${divId}`;
        shadow.host.setAttribute("type", "list");

        const newCard = new CardCreator({
            attributes: {
                id: `card+${divId}`,
                class: "addTaskContainer",
                description: "Main container of the list"
            },
            buttons: [
                {
                    attributes: { name: "save", class: "btn btn-success" },
                    innerHTML: "Done",
                    events: {
                        click: createTask
                    }
                },
                {
                    attributes: { name: "close", class: "btn btn-danger" },
                    innerHTML: "X",
                    events: {
                        click: closeForm
                    }
                }
            ]
        });
        // document.getElementById("app").appendChild(newCard);

        // containers
        let parentContainer = document.createElement("div");
        let divWrapper = document.createElement("div");
        let btnContainer = document.createElement("div");
        // let addTaskContainer = document.createElement("div");
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
        parentContainer.className = "parentContainer";
        // addTaskContainer.className = "addTaskContainer";
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
        shadow.host.draggable = "true";
        shadow.host.addEventListener("drop", function(event) {
            drop(event);
        });
        shadow.host.addEventListener("dragover", function(event) {
            allowDrop(event);
        });
        shadow.host.addEventListener("dragstart", function(event) {
            drag(event);
        });

        //phase 1
        title.innerHTML = name;
        deleteListBtn.innerHTML = "X";
        addTaskBtn.innerHTML = "Add Task";

        //toggle list adder
        addTaskBtn.addEventListener("click", function() {
            addTaskBtn.style.display = "none";
            newCard.style.display = "flex";
            // addTaskContainer.style.display = "flex";
            taskName.focus();
        });

        //delete list
        deleteListBtn.addEventListener("click", function() {
            document.getElementById("app").removeChild(shadow.host);
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
                newCard.style.display = "none";
                // addTaskContainer.style.display = "none";
                let newTask = new Task(taskName.value, taskCounter);
                this.parentNode.parentNode.parentNode.firstElementChild.insertBefore(
                    newTask,
                    this.parentNode.parentNode.parentNode.firstElementChild
                        .lastElementChild
                );
                taskCounter++;
                taskName.value = "";
            }
        });
        //close button
        closeBtn.innerHTML = "X";
        closeBtn.addEventListener("click", function() {
            addTaskBtn.style.display = "";
            newCard.style.display = "none";
            // addTaskContainer.style.display = "none";
            taskName.value = "";
            taskName.style.borderColor = "";
        });

        //style
        const style = document.createElement("style");
        style.textContent = `
        .addTaskContainer {
            display: none;
            flex-direction: column;
        }
        .parentContainer {
            background-color: #ebecf0;
            display: flex;
            flex-direction: column;
            border-radius: 3px;
            background-color: hsla(0, 0%, 100%, 0.24);
            padding: 5px;
            height: fit-content;
            margin: 5px;
        }
        .title {
            flex-grow: 1;
            overflow: hidden;
            word-wrap: break-word;
        }
        .list {
            /* background-color: #ebecf0; */
            display: flex;
            flex-direction: column;
            text-align: center;
            width: 100%;
            height: auto;
            list-style-type: none;
        }
        .headerContainer {
            display: flex;
            padding: 0% 2%;
            font-weight: bold;
            text-align: start;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2%;
        }
        .glyphicon {
            top: 0px;
            margin: 0% 2%;
        }
        .btn {
            padding: 2px 8px;
            border: 0;
            /* margin: 1% 0; */
        }
        .btnContainer {
            margin-top: 2%;
            padding: 0% 0% 1% 1%;
        }
        input {
            border-radius: 3px;
        }
        `;

        const bootstrapStyle = document.createElement("link");
        bootstrapStyle.setAttribute("rel", "stylesheet");
        bootstrapStyle.setAttribute(
            "href",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        );

        //card creation
        headerContainer.appendChild(title);
        headerContainer.appendChild(deleteListBtn);
        divWrapper.appendChild(headerContainer);
        divWrapper.appendChild(addTaskBtn);
        btnContainer.appendChild(createTaskBtn);
        btnContainer.appendChild(closeBtn);
        // addTaskContainer.appendChild(taskName);
        // addTaskContainer.appendChild(btnContainer);

        parentContainer.appendChild(divWrapper);
        parentContainer.appendChild(newCard);
        // parentContainer.appendChild(addTaskContainer);
        shadow.appendChild(bootstrapStyle);
        shadow.appendChild(style);
        shadow.appendChild(parentContainer);
    }
}
function createTask() {
    if (this.parentNode.parentNode.firstElementChild.value.trim() == "") {
        this.parentNode.parentNode.firstElementChild.style.borderColor = "red";
        this.parentNode.parentNode.firstElementChild.value = "";
        this.parentNode.parentNode.firstElementChild.focus();
    } else {
        this.parentNode.parentNode.parentNode.host.parentNode.firstElementChild.lastElementChild.style.display =
            "block";
            this.parentNode.parentNode.parentNode.host.style.display = "none";
        // addTaskContainer.style.display = "none";
        let newTask = new Task(
            this.parentNode.parentNode.firstElementChild.value,
            taskCounter
        );
        this.parentNode.parentNode.parentNode.host.parentNode.firstElementChild.insertBefore(
            newTask,
            this.parentNode.parentNode.parentNode.host.parentNode.firstElementChild
                .lastElementChild
        );
        taskCounter++;
        this.parentNode.parentNode.firstElementChild.value = "";
    }
}

function closeForm() {
    this.parentNode.parentNode.parentNode.host.parentNode.firstElementChild.lastElementChild.style.display =
        "block";
        this.parentNode.parentNode.parentNode.host.style.display = "none";
}
customElements.define("my-list", List);
export { List };
