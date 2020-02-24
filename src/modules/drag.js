function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    let counter = 0;
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let elType1 = ev.target.id.split("+")[0];
    let elType2 = data.split("+")[0];
    console.log(elType1, elType2);
    if (elType1 === elType2) {
        console.log(counter++);
        swapElements(document.getElementById(data), ev.target);
    }
}

function swapElements(obj1, obj2) {
    //   let counter = 0;
    //   console.log(counter++);
    let parent2 = obj2.parentNode;
    let next2 = obj2.nextSibling;
    console.log("parent", parent2);
    console.log("sibling", next2);
    if (next2 === obj1) {
        parent2.insertBefore(obj1, obj2);
    } else {
        obj1.parentNode.insertBefore(obj2, obj1);
        if (next2) {
            parent2.insertBefore(obj1, next2);
        } else {
            parent2.appendChild(obj1);
        }
    }
}

export { allowDrop, drag, drop };
