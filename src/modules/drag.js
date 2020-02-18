function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if(ev.target.id && data)
    swapElements(document.getElementById(data), ev.target)
  }
  
  function swapElements(obj1, obj2) {
      let parent2 = obj2.parentNode;
      let next2 = obj2.nextSibling;
      console.log(obj1)
      console.log(obj2)
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

  export {allowDrop, drag, drop}