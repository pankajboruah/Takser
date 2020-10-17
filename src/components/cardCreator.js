import { createButtons, addAttributes } from "./helpers";
class CardCreator extends HTMLElement {
    constructor({ attributes, styles, buttons }) {
        super();

        let shadow = this.attachShadow({ mode: "open" });
        // shadow.host.className = "col-md-2";
        //containers
        let parentContainer = document.createElement("div");
        let buttonContainer = document.createElement("div");
        buttonContainer.className = "btnContainer";
        //elements
        let name = document.createElement("input");
        name.setAttribute("placeholder", "List Name");
        addAttributes(shadow.host, attributes);
        // addAttributes(parentContainer, styles);
        //create buttons
        buttons.forEach(btn => {
            buttonContainer.appendChild(createButtons(btn));
        });

        parentContainer.className = "parentContainer";


        //style
        const style = document.createElement("style");
        style.textContent = `
        .parentContainer {
            display: flex;
            flex-direction: column;
            height: auto;
            border: 1px solid;
            border-radius: 3px;
            padding: 1%;
        }
        .listAdderContainer {
            display: flex;
            flex-direction: column;
            height: auto;
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
        shadow.appendChild(parentContainer);
        parentContainer.appendChild(name);
        parentContainer.appendChild(buttonContainer);
        shadow.appendChild(bootstrapStyle);
        shadow.appendChild(style);
    }
}

customElements.define("my-card", CardCreator);
export { CardCreator };
