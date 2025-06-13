//Adicionar tarefa
let nameTask = document.getElementById("nameTask");
let priority = document.getElementById("priorityTask");
let buttonTask = document.getElementById("buttonTask");

//Modal
let modal = document.querySelector(".modal");
let openTask = document.getElementById("openTask");
let closeTask = document.querySelector(".close");

//Sidebar
let toggleButton = document.getElementById("toggleButton");
let sidebar = document.querySelector(".sidebar");
let header = document.querySelector(".header");
let taskContent = document.querySelector(".task-list")

// Abrir sidebar e empurrar o conteúdo da página!
toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    header.classList.toggle('shifted');
    taskContent.classList.toggle('shifted');
});

// Model para adicionar tarefa
openTask.onclick = () => {
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

// ---- DIVISÃO ---- //
// ---- DIVISÃO ---- //

//Condições de prioridades por cores
function colorPriority(task, element) {
    let priorityColor = {
        P1: "#e71223",
        P2: "#ff7b22",
        P3: "#368c09"
    }

    let color = priorityColor[task.prioridade];
    if (color) {
        element.style.borderLeft = `2px solid ${color}`;
    }
}

//Criação de um array vazio
let taskList = [];

// ---- DIVISÃO ---- //
// ---- DIVISÃO ---- //

function loadTasks() {
    let saved = localStorage.getItem("taskList");
    if (saved) {
        taskList = JSON.parse(saved);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function renderTasks() {
    let taskView = document.getElementById("taskView");
    taskView.textContent = ""

    taskList.forEach(task => {
        // Criando elementos
        let newLiElement = document.createElement("li");
        let buttonClose = document.createElement("button");

        // Adicionando Classes
        newLiElement.classList.add("taskText")
        buttonClose.classList.add("trash");

        newLiElement.dataset.id = task.id;
        
        //Adicionando conteudo aos elementos
        newLiElement.textContent = task.nomeTask;
        buttonClose.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        //Botão de excluir uma tarefa
        buttonClose.addEventListener("click", () => {
            let searchId = Number(newLiElement.dataset.id); //
            let objRemove = taskList.findIndex(task => task.id === searchId);

            if (objRemove !== -1) {
                taskList.splice(objRemove, 1);
                saveTasks();
                renderTasks();
            }

            taskView.removeChild(newLiElement);
        })

        newLiElement.appendChild(buttonClose); // adiciona o botão dentro da li
        taskView.appendChild(newLiElement); // Desenha o novo item da lista (nova tarefa)

        colorPriority(task, newLiElement);
    });
}

function addTask(task) {
    taskList.push(task);
    saveTasks();
    renderTasks();
}

//Criação da tarefa
function createTask() {
    let task = {
        id: Date.now(),
        nomeTask: nameTask.value,
        prioridade: priority.value
    }

    addTask(task);

    //Limpa os campos e fecha o modal de tarefa
    nameTask.value = "";
    priority.value = "";
    modal.style.display = "none";
}

buttonTask.addEventListener("click", createTask);
loadTasks();

//depuração     console.log(task);
//              console.log(taskList);