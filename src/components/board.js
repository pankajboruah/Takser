import { List } from "./List";
import { CardCreator } from "./cardCreator";
import { save, loadData, loadCounters } from "./storage";

// let newCard = new CardCreator({
//     attributes: {
//         class: "listAdderContainer",
//         description: "Main container of the list",
//     },
//     style: {
//         border: "1px solid",
//         padding: "1%"
//     },
//     buttons: [
//         {
//             attributes: { name: "save", class: "btn btn-success" },
//             innerHTML: "Done",
//             events: {
//                 click: createList
//             }
//         },
//         {
//             attributes: { name: "close", class: "btn btn-danger" },
//             innerHTML: "X",
//             events: {
//                 click: closeForm
//             }
//         }
//     ]
// });
// document.getElementById("app").appendChild(newCard);
// console.log("this is a new card", newCard);
let counter = loadCounters();
counter = counter.listCount ? counter.listCount : 0;
// import "../assets/board.css";
class Board extends HTMLElement {
	constructor() {
		super();
		// console.log("constructor");
		//functionality
		let shadow = this.attachShadow({ mode: "open" });
		shadow.host.className = "col-md-2";
		window.addEventListener("beforeunload", function () {
			save();
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
		parentContainer.className = "parentContainer";
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
		divWrapper.addEventListener("click", function () {
			divWrapper.style.display = "none";
			listAdder.style.display = "flex";
			title.focus();
		});

		//phase 2
		submitBtn.addEventListener("click", function () {
			if (title.value.trim() == "") {
				title.style.borderColor = "red";
				title.value = "";
				title.focus();
			} else {
				divWrapper.style.display = "flex";
				listAdder.style.display = "none";
				const list = new List(title.value, counter);

				//

				document.getElementById("app").appendChild(list);
				counter++;
				title.value = "";
			}
		});

		//close button
		closeBtn.innerHTML = "X";
		closeBtn.addEventListener("click", function () {
			divWrapper.style.display = "flex";
			listAdder.style.display = "none";
			title.style.borderColor = "";
			title.value = "";
		});

		// Apply external styles to the shadow dom
		// const linkElem = document.createElement("link");
		// linkElem.setAttribute("rel", "stylesheet");
		// linkElem.setAttribute("href", "../assets/board.css");
		// Create some CSS to apply to the shadow dom
		const style = document.createElement("style");
		// console.log(style.isConnected);

		style.textContent = `
        .createListContainer {
            display: flex;
            flex-direction: column;
            text-align: center;
        }
        .parentContainer {
            width: 100%;
            background-color: #ebecf0;
            display: flex;
            flex-direction: column;
            border-radius: 3px;
            background-color: hsla(0, 0%, 100%, 0.24);
            padding: 5px;
            height: fit-content;
            margin: 5px;
        }
        .listAdderContainer {
            display: none;
            flex-direction: column;
            height: auto;
        }
        .createListContainer:hover {
            background-color: rgb(0, 174, 204, 0.5);
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
		shadow.appendChild(bootstrapStyle);
		shadow.appendChild(style);
		shadow.appendChild(parentContainer);
		parentContainer.appendChild(divWrapper);
		parentContainer.appendChild(listAdder);
		listAdder.appendChild(title);
		listAdder.appendChild(btnContainer);
		btnContainer.appendChild(submitBtn);
		btnContainer.appendChild(closeBtn);
	}
}
function createList() {
	console.log("createList triggered");
}

function closeForm() {
	console.log("closeForm triggered");
}
customElements.define("my-board", Board);
export { Board };
