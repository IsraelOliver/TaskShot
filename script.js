let nameTask = document.getElementById("nameTask");
let category = document.getElementById("categoryTask");
let priority = document.getElementById("priorityTask");
let buttonTask = document.getElementById("buttonTask");

//Criação do array
let taskList = [];

function addTask() {
    let task = {
        nomeTask: nameTask.value,
        categoria: category.value,
        prioridade: priority.value
    }

    if (task.categoria == "Selecionar" || task.categoria == "" || task.prioridade == "Selecionar" || task.categoria == "" ) {
        return
    }

    let taskView = document.getElementById("taskView");
    taskView.textContent = ""
    
    taskList.push(task);

    taskList.forEach(task => {
        //Criando elementos
        let newLiElement = document.createElement("li");
        let buttonClose = document.createElement("button.closeButton");

        //Adicionando conteudo aos elementos
        buttonClose.textContent = "Excluir";
        newLiElement.textContent = task.nomeTask + " 🢒 " + task.categoria;

        buttonClose.addEventListener("click", () => {
            taskView.removeChild(newLiElement);
        })

        newLiElement.appendChild(buttonClose); // adiciona o botão dentro da li
        taskView.appendChild(newLiElement); // desenha a li na tela


        //Condições de prioridades por cores
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

    //Limpa os campos
    nameTask.value = "";
    category.value = "";
    priority.value = ""; 

}

buttonTask.addEventListener("click", addTask);