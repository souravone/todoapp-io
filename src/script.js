"use strict";
const themeIcon = document.querySelector(".theme-icon");
const heroImage = document.querySelector(".hero-image");
const todoForm = document.querySelector(".form__input");
const submitButton = document.querySelector(".form__input__button");
const formInput = document.querySelector(".form__input__value");
const todoItems = document.querySelector(".todo__items");
const todoItem = document.querySelector(".todo__item");
const todoContainer = document.querySelector(".todo");
const todoItemCheckbox = document.querySelector(".todo__item__checkbox");
const todoItemText = document.querySelector(".todo__item__text");
const todoItemCross = document.querySelector(".todo__item__cross");
const totalItems = document.querySelector(".todo__below__left");
const itemPlural = document.querySelector(".only-s");
const allTasks = document.querySelector(".todo__below__list__item--all");
const activeTasks = document.querySelector(".todo__below__list__item--active");
const completedTasks = document.querySelector(
  ".todo__below__list__item----completed"
);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
if (localStorage.getItem("tasks")) {
  tasks.map((t) => createTask(t));
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputTask = formInput.value.trim();
  if (inputTask == "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputTask,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
  todoForm.reset();
});

function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.classList.add("todo__item");
  taskEl.setAttribute("id", task.id);
  taskEl.setAttribute("draggable", true);

  const taskElMarkup = `
  <input type="checkbox" class="todo__item__checkbox" ${
    task.isCompleted ? "checked" : " "
  }/>
    <p class="todo__item__text ${task.isCompleted ? "checked" : " "}" ${
    !task.isCompleted ? "contenteditable" : ""
  }>${task.name}</p>
    <img
    src="./images/icon-cross.svg"
    alt="Icon cross"
    class="todo__item__cross hidden"
    />
    `;

  taskEl.innerHTML = taskElMarkup;
  todoItems.appendChild(taskEl);
  updateCount();
}

todoItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo__item__checkbox")) {
    const todoItem = e.target.closest(".todo__item");
    const todoItemText = todoItem.querySelector(".todo__item__text");
    const todoItemId = e.target.closest("li").id;
    const task = tasks.find((task) => task.id === parseInt(todoItemId));

    if (e.target.checked) {
      task.isCompleted = true;
      todoItemText.classList.add("checked");
    }
    if (!e.target.checked) {
      todoItemText.setAttribute("contenteditable", true);
      task.isCompleted = false;
      todoItemText.classList.remove("checked");
    } else {
      todoItemText.removeAttribute("contenteditable");
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

todoItems.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    e.target.blur();
  }
});

todoItems.addEventListener("click", (e) => {
  const todoItemId = e.target.closest("li").id;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(todoItemId));
  if (e.target.classList.contains("todo__item__cross")) {
    const todoItemId = e.target.closest("li").id;
    document.getElementById(todoItemId).remove();
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCount();
  }
});

todoItems.addEventListener("input", (e) => {
  const todoItem = e.target.closest("li");
  const todoItemId = e.target.closest("li").id;
  const todoItemText = todoItem.querySelector(".todo__item__text").textContent;
  const task = tasks.find((task) => task.id === parseInt(todoItemId));
  task.name = todoItemText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

function updateTodoItem() {}

function updateCount() {
  const totalItems = document.querySelector(".todo__below__left");
  const itemPlural = document.querySelector(".only-s");

  totalItems.textContent = tasks.length;

  if (totalItems.textContent < 2) {
    itemPlural.classList.add("hidden");
  }
  if (totalItems.textContent > 1) {
    itemPlural.classList.remove("hidden");
  }
}

todoContainer.addEventListener("click", (e) => {
  const allTasks = document.querySelector(".todo__below__list__item--all");
  const activeTasks = document.querySelector(
    ".todo__below__list__item--active"
  );
  const completedTasks = document.querySelector(
    ".todo__below__list__item--completed"
  );
  const totalItems = document.querySelector(".todo__below__left");

  const allTasksArr = tasks.map((t) => t);

  if (e.target.classList.contains("todo__below__list__item--all")) {
    allTasks.classList.add("todo__below__list__item--clicked");
    activeTasks.classList.remove("todo__below__list__item--clicked");
    completedTasks.classList.remove("todo__below__list__item--clicked");
    todoItems.innerHTML = "";
    allTasksArr.map((t) => createTask(t));
    totalItems.textContent = allTasksArr.length;
  }
  const activeTasksArr = tasks.filter((t) => t.isCompleted == false);
  if (e.target.classList.contains("todo__below__list__item--active")) {
    activeTasks.classList.add("todo__below__list__item--clicked");
    allTasks.classList.remove("todo__below__list__item--clicked");
    completedTasks.classList.remove("todo__below__list__item--clicked");
    todoItems.innerHTML = "";
    activeTasksArr.map((t) => createTask(t));
    totalItems.textContent = activeTasksArr.length;
  }
  const completedTasksArr = tasks.filter((t) => t.isCompleted == true);
  if (e.target.classList.contains("todo__below__list__item--completed")) {
    completedTasks.classList.add("todo__below__list__item--clicked");
    activeTasks.classList.remove("todo__below__list__item--clicked");
    allTasks.classList.remove("todo__below__list__item--clicked");
    todoItems.innerHTML = "";
    completedTasksArr.map((t) => createTask(t));
    totalItems.textContent = completedTasksArr.length;
  }

  if (totalItems.textContent < 2) {
    itemPlural.classList.add("hidden");
  }
  if (totalItems.textContent > 1) {
    itemPlural.classList.remove("hidden");
  }

  if (e.target.classList.contains("todo__below__clear")) {
    tasks = tasks.filter((t) => t.isCompleted == false);
    console.log(tasks);
    todoItems.innerHTML = "";
    tasks.map((t) => createTask(t));

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

updateCount();

const dragArea = document.querySelector(".todo__items");
new Sortable(dragArea, {
  animation: 300,
});

themeIcon.onclick = function () {
  console.log("hi");
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.src = "./images/icon-sun.svg";
    heroImage.src = "./images/bg-desktop-dark.jpg";
  } else {
    themeIcon.src = "./images/icon-moon.svg";
    heroImage.src = "./images/bg-desktop-light.jpg";
  }
};
