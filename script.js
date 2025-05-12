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
    taskView.textContent = ""
    
    taskList.push(task);

    taskList.forEach(task => {
        let newLiElement = document.createElement("li");
        newLiElement.textContent = task.nomeTask + " 🢒 " + task.categoria;
        taskView.appendChild(newLiElement);

            if (task.prioridade == "Baixa") {
        newLiElement.style.backgroundColor = "#beff98";
        }

        if (task.prioridade == "Média") {
            newLiElement.style.backgroundColor = "#113242";
            newLiElement.style.color = "white";
            newLiElement.style.borderColor = "white";
        }

        if (task.prioridade == "Alta") {
            newLiElement.style.backgroundColor = "#6e0b0b";
        }
    });

    console.log(task);
    console.log(taskList);
    nameTask.value = "";
    category.value = "";
    priority.value = ""; 

}

buttonTask.addEventListener("click", addTask);