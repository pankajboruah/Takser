function createButtons(btn) {
    let button = document.createElement("div");
    if (btn.attributes) addAttributes(button, btn.attributes);

    if (btn.events) addEvents(button, btn.events);

    button.innerHTML = btn.innerHTML ? btn.innerHTML : "";
    // console.log('this is a new button', button)
    return button;
}
function addAttributes(el, attributes) {
    Object.keys(attributes).forEach((attr, i) => {
        // console.log(attr, Object.values(attributes)[i]);
        el.setAttribute(attr, Object.values(attributes)[i]);
    });
    return;
}
// function addStyles(el, styles) {
//     Object.keys(styles).forEach((attr, i) => {
//         // console.log(attr, Object.values(attributes)[i]);
//         el.setAttribute(attr, Object.values(styles)[i]);
//     });
//     return;
// }
function addEvents(el, events) {
    Object.keys(events).forEach((event, i) => {
        el.addEventListener(event, Object.values(events)[i]);
    });
    return;
}
export { createButtons, addAttributes };
