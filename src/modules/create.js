import { save, loadData, loadCounters } from "./retainData";
import { createList } from "./createList";

let counter = loadCounters();
counter = counter.listCount ? counter.listCount : 0;

function initiator() {
    //add save and load
    window.addEventListener("beforeunload", function() {
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
    parentContainer.className = "parentContainer col-sm-2";
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
    divWrapper.addEventListener("click", function() {
        document.querySelector(".createListContainer").style.display = "none";
        document.querySelector(".listAdderContainer").style.display = "flex";
    });

    //phase 2
    submitBtn.addEventListener("click", function() {
        if (title.value.trim() == "") {
            title.style.borderColor = "red";
            title.value = "";
            title.focus();
        } else {
            document.querySelector(".createListContainer").style.display =
                "flex";
            document.querySelector(".listAdderContainer").style.display =
                "none";
            document
                .getElementById("app")
                .appendChild(createList(title.value, counter));
            counter++;
            title.value = "";
        }
    });

    //close button
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", function() {
        document.querySelector(".createListContainer").style.display = "flex";
        document.querySelector(".listAdderContainer").style.display = "none";
        title.style.borderColor = "";
        title.value = "";
    });

    //card creation
    btnContainer.appendChild(submitBtn);
    btnContainer.appendChild(closeBtn);
    listAdder.appendChild(title);
    listAdder.appendChild(btnContainer);
    parentContainer.appendChild(divWrapper);
    parentContainer.appendChild(listAdder);
    document.getElementById("app").appendChild(parentContainer);

    return;
}

export { initiator, counter };
