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
  
    const edit = document.createElement("button");
    edit.innerHTML = "✏️";
    edit.addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null) {
        task.text = newText.trim();
        render();
      }
    });

    const del = document.createElement("button");
    del.innerHTML = "🗑️";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(del);

    list.appendChild(li);

    if (task.done) doneCount++;
 

  });
}