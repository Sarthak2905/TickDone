//Stores references to your HTML elements.
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const list = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const progress = document.querySelector(".progress");


let tasks = [];

addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task) {
      tasks.push({ text: task, done: false }); 
      input.value = "";
      render();   //update the UI.
    }
});
  
function render() {
  list.innerHTML = "";
  let doneCount = 0;
  
}