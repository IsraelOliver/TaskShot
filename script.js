let nameTask = document.getElementById("nameTask");
let category = document.getElementById("categoryTask");
let priority = document.getElementById("priorityTask");
let buttonTask = document.getElementById("buttonTask");

//Criação do array
let taskList = [];

//Condições de prioridades por cores
function colorPriority(task, element) {
    if (task.prioridade == "Baixa") {
        element.style.backgroundColor = "#beff98";
    }

    if (task.prioridade == "Média") {
        element.style.backgroundColor = "#113242";
        element.style.color = "white";
        element.style.borderColor = "white";
    }

    if (task.prioridade == "Alta") {
        element.style.backgroundColor = "#6e0b0b";
    }
}

//Validação dos elementos "SELECT"
function taskValidation(task) {
    return (task.categoria !== "Selecionar" &&
        task.categoria !== "" &&
        task.prioridade !== "Selecionar" &&
        task.prioridade !== "")
}

function addTask() {
    let task = {
        id: Date.now(),
        nomeTask: nameTask.value,
        categoria: category.value,
        prioridade: priority.value
    }

    if (!taskValidation(task)) return;

    let taskView = document.getElementById("taskView");
    taskView.textContent = ""
    
    taskList.push(task);

    taskList.forEach(task => {
        //Criando elementos
        let newLiElement = document.createElement("li");
        let buttonClose = document.createElement("button");
        buttonClose.classList.add("closeButton");
        newLiElement.dataset.id = task.id;

        //Adicionando conteudo aos elementos
        buttonClose.textContent = "Excluir";
        newLiElement.textContent = task.nomeTask + " 🢒 " + task.categoria;

        buttonClose.addEventListener("click", () => {
            let searchId = Number(newLiElement.dataset.id); //
            let objRemove = taskList.findIndex(task => task.id === searchId);

            taskView.removeChild(newLiElement);
            taskList.splice(objRemove, 1);
        })

        newLiElement.appendChild(buttonClose); // adiciona o botão dentro da li
        taskView.appendChild(newLiElement); // desenha a li na tela

        colorPriority(task, newLiElement);
    });

    console.log(task);
    console.log(taskList);

    //Limpa os campos
    nameTask.value = "";
    category.value = "";
    priority.value = ""; 

}

buttonTask.addEventListener("click", addTask);