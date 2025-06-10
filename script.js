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
        let trashImg = document.createElement("img");

        buttonClose.classList.add("trash");
        newLiElement.classList.add("taskText")
        newLiElement.dataset.id = task.id;

        //Adicionando conteudo aos elementos
        trashImg.src = "./assets/trash.svg";
        trashImg.alt = "Delete";

        buttonClose.appendChild(trashImg);
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