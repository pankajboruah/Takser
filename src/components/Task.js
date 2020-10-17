import { allowDrop, drag, drop } from "../modules/drag";
class Task extends HTMLElement {
    constructor(taskName, divId) {
        super();
        let shadow = this.attachShadow({ mode: "open" });
        shadow.host.id = `sublist+${divId}`;
        shadow.host.setAttribute("type", "task");
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
        btnContainer.className = "btnContainer";
        saveBtn.className = "btn btn-success";
        saveBtn.style.display = "none";
        editBtn.className = "btn btn-default glyphicon glyphicon-pencil";
        closeBtn.className = "btn btn-danger";
        title.className = "title";

        //phase 1
        parentContainer.id = `task+${divId}`;

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
            let deleted = shadow.host.parentNode.removeChild(
                shadow.host
            );
        });

        //style
        const style = document.createElement("style");
        style.textContent = `
        .task {
            display: flex;
            align-items: center;
            padding: 5px;
            background: #fff;
            border-radius: 3px;
            margin-bottom: 2%;
        }
        .title {
            flex-grow: 1;
            overflow: hidden;
            word-wrap: break-word;
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
        `;

        const bootstrapStyle = document.createElement("link");
        bootstrapStyle.setAttribute("rel", "stylesheet");
        bootstrapStyle.setAttribute(
            "href",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        );
        //phase 2
        parentContainer.appendChild(title);
        parentContainer.appendChild(editBtn);
        parentContainer.appendChild(closeBtn);
        parentContainer.appendChild(saveBtn);
        shadow.appendChild(bootstrapStyle);
        shadow.appendChild(style);
        shadow.appendChild(parentContainer);
    }
}
customElements.define("my-task", Task);
export { Task };