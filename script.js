let nameTask = document.getElementById("nameTask");
let buttonTask = document.getElementById("buttonTask");

let modalAdd = document.querySelector(".modal-add");
let modalEdit = document.querySelector(".modal-edit");
let openAdd = document.getElementById("openTask");
let closeAdd = document.querySelector(".close-add");
let closeEdit = document.querySelector(".close-edit");

let toggleButton = document.getElementById("toggleButton");
let sidebar = document.querySelector(".sidebar");
let header = document.querySelector(".header");
let taskContent = document.querySelector(".task-list");

let currentEditingId = null;

// Sidebar
toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    header.classList.toggle("shifted");
    taskContent.classList.toggle("shifted");
});

// Modal
openAdd.onclick = () => modalAdd.style.display = "block";
closeAdd.onclick = () => modalAdd.style.display = "none";
closeEdit.onclick = () => modalEdit.style.display = "none";

window.onclick = e => {
    if (e.target === modalAdd) modalAdd.style.display = "none";
    if (e.target === modalEdit) modalEdit.style.display = "none";
};

// Lógica
let taskList = [];

function colorPriority(task, element) {
    const priorityColor = {
        P1: "#e71223",
        P2: "#ff7b22",
        P3: "#368c09"
    };
    const color = priorityColor[task.prioridade];
    if (color) element.style.borderLeft = `2px solid ${color}`;
}

function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTasks() {
    const saved = localStorage.getItem("taskList");
    if (saved) {
        taskList = JSON.parse(saved);
        renderTasks();
    }
}

const saveEditBtn = document.getElementById("saveEdit");
    if (saveEditBtn) {
    saveEditBtn.addEventListener("click", () => {
        if (currentEditingId == null) return;

        const editTitle = document.getElementById("editTitle");
        const desc = document.getElementById("descricao");
        const newPriority = document.querySelector('input[name="editPriority"]:checked');

        // encontra a task
        const idx = taskList.findIndex(t => t.id === currentEditingId);
        if (idx !== -1) {
        if (editTitle) taskList[idx].nomeTask = editTitle.value.trim() || taskList[idx].nomeTask;
        if (desc) taskList[idx].descricao = desc.value.trim();
        if (newPriority) taskList[idx].prioridade = newPriority.value;

        saveTasks();
        renderTasks();
        }

        modalEdit.style.display = "none";
        currentEditingId = null;
    });
}

function renderTasks() {
  const taskView = document.getElementById("taskView");
  taskView.textContent = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("taskText");
    li.dataset.id = task.id;

    // título dentro de um span para facilitar update
    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.nomeTask;

    const editGroup = document.createElement("div");
    editGroup.classList.add("editGroup");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit", "editButton");
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("trash", "editButton");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    deleteBtn.addEventListener("click", () => {
      const id = Number(li.dataset.id);
      taskList = taskList.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    });

    editBtn.addEventListener("click", () => {
      // abre modal e preenche
      modalEdit.style.display = "block";
      currentEditingId = task.id;

      // título
      const editTitle = document.getElementById("editTitle");
      if (editTitle) editTitle.value = task.nomeTask || "";

      // descrição (opcional no objeto; pode vir undefined)
      const desc = document.getElementById("descricao");
      if (desc) desc.value = task.descricao || "";

      // prioridade: marcar o radio correspondente se existir
      const radio = document.querySelector(`input[name="editPriority"][value="${task.prioridade || ""}"]`);
      if (radio) radio.checked = true;
    });

    editGroup.append(editBtn, deleteBtn);
    li.append(titleSpan, editGroup);
    taskView.append(li);

    colorPriority(task, li);
  });
}

function addTask(task) {
    taskList.push(task);
    saveTasks();
    renderTasks();
}

function createTask() {
    const priority = document.querySelector('input[name="priority"]:checked');
    const task = {
        id: Date.now(),
        nomeTask: nameTask.value,
        prioridade: priority ? priority.value : ""
    };
    addTask(task);
    nameTask.value = "";
    if (priority) priority.checked = false;
    modalAdd.style.display = "none";
}

buttonTask.addEventListener("click", createTask);
loadTasks();