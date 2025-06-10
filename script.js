//Adicionar tarefa
let nameTask = document.getElementById("nameTask");
let category = document.getElementById("categoryTask");
let priority = document.getElementById("priorityTask");
let buttonTask = document.getElementById("buttonTask");

//Modal
let modal = document.getElementById("myModal");
let addTask = document.getElementById("addTask");
let closeTask = document.querySelector(".close");

//Sidebar
let toggleButton = document.getElementById("toggleButton");
let sidebar = document.querySelector(".sidebar");
let header = document.querySelector(".header");
let taskContent = document.querySelector(".task-list")

// Gerenciador de Icones
const IconManager = {
    trash: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - 
        https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96
        0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8
        0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
    `
}

// Abrir sidebar e empurrar o conteúdo da página!
toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    header.classList.toggle('shifted');
    taskContent.classList.toggle('shifted');
});

// Model para adicionar tarefa
addTask.onclick = () => {
    modal.style.display = "block";
}

closeTask.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (evento) => {
  if (evento.target === modal) {
    modal.style.display = "none";
  }
};

//Criação da tarefa
let taskList = [];

//Condições de prioridades por cores
function colorPriority(task, element) {
    if (task.prioridade == "Baixa") {
        element.style.backgroundColor = "#beff98";
    }

    if (task.prioridade == "Média") {
        element.style.backgroundColor = "#113242";
        element.style.color = "white";
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

//Criação da tarefa
function createTask() {
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

        buttonClose.classList.add("trash");
        newLiElement.classList.add("taskText")
        newLiElement.dataset.id = task.id;

        //Adicionando conteudo aos elementos
        buttonClose.innerHTML = IconManager.trash
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

    modal.style.display = "none";

    //Limpa os campos
    nameTask.value = "";
    category.value = "";
    priority.value = ""; 

}

buttonTask.addEventListener("click", createTask);