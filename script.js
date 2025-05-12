let nameTask = document.getElementById("nameTask");
let category = document.getElementById("categoryTask");
let priority = document.getElementById("priorityTask");

let buttonTask = document.getElementById("buttonTask");

let taskList = [];

function addTask() {
    let task = {
        nomeTask: nameTask.value,
        categoria: category.value,
        prioridade: priority.value
    }

    let taskView = document.getElementById("taskView");
    let newLiElement = document.createElement("li");

    newLiElement.textContent = task.nomeTask + " 🢒 " + task.categoria;

    taskView.appendChild(newLiElement);
    taskList.push(task);

    console.log(taskList);
}

buttonTask.addEventListener("click", addTask);