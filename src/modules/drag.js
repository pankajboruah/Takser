function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	let data = ev.dataTransfer.getData("text");
	let elType1 = ev.currentTarget.id.split("+")[0];
	let elType2 = data.split("+")[0];
	if (elType1 === elType2) {
		swapElements(document.getElementById(data), ev.currentTarget);
	}
}

function swapElements(obj1, obj2) {
	let parent2 = obj2.parentNode;
	let next2 = obj2.nextSibling;
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
