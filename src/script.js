"use strict";

const form = document.querySelector(".form__input");
const submitButton = document.querySelector(".form__input__button");
const formInput = document.querySelector(".form__input__value");
const todoItems = document.querySelector(".todo__items");
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

console.log(form);
