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
  
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = !task.done;
      render();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
  
  });
}