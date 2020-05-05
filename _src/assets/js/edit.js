'use strict';

// edit

const toggleEdit = (ev) => {
  ev.stopPropagation();
  document.querySelector('.js-edit').classList.toggle('show');
  document.querySelector('.js-edit').classList.remove('d-none');
};

document.querySelectorAll('.js-card, .js-edit-close').forEach((card) => {
  card.addEventListener('click', toggleEdit);
});

const preventEditClosing = (ev) => {
  ev.stopPropagation();
};

document.querySelector('.js-edit-modal').addEventListener('click', preventEditClosing);

// AQUÍ EMPIEZO YO

const newList = document.querySelector('.js-list-new');
const box = document.querySelector('.js-main');
const columnTemplate = document.querySelector('.column-template');
const newTask = document.querySelector('.card-template');
const btnNewTask = document.querySelector('.js-btn-new-task');

// const containerList = document.querySelector('.js-container-list');

// FUNCIÓN PARA CREAR NUEVA LISTA

function createNewList() {
  const column = columnTemplate.cloneNode(true);
  column.classList.remove('column-template');
  column.classList.remove('hidden');
  box.appendChild(column);
  btnNewTask.addEventListener('click', createNewTask);
}

// FUNCIÓN PARA CREAR NUEVA TAREA

function createNewTask() {
  console.log('adios');

  const task = newTask.cloneNode(true);
  task.classList.remove('card-template');
  task.classList.remove('hidden');
  const containerList = document.querySelector('.js-container-list');
  console.log(containerList);
  containerList.insertBefore(task, btnNewTask);
  // insertBefore antes de lo azul
}

newList.addEventListener('click', createNewList);

// MANERA PRIMITIVA DE CREAR LISTA

// function createNewList2() {
//   let div = document.createElement('div');
//   let formList = document.createElement('form');
//   formList.setAttribute('class', 'app-list-form align-middle p-1 position-relative');
//   let input = document.createElement('input');
//   div.setAttribute('class', 'js-container-list p-1 rounded-sm bg-primary shadow');
//   input.setAttribute('class', 'app-list-input form-control form-control-sm list__input--title');
//   input.setAttribute('placeholder', 'Title');
//   input.setAttribute('type', 'text');
//   input.setAttribute('value', '');
//   input.setAttribute('title', 'Editar título de la lista');
//   let tresPuntos = document.createElement('div');
//   tresPuntos.setAttribute('class', 'app-list-options');
//   let spanTresPuntos = document.createElement('span');
//   spanTresPuntos.setAttribute('class', 'pl-2 pr-2 text-white-50 fas fa-ellipsis-v');
//   let containerButtons = document.createElement('div');
//   containerButtons.setAttribute('class', 'app-list-btns btn-group btn-group-sm');
//   let button1 = document.createElement('button');
//   button1.setAttribute('class', 'btn btn-light text-muted border shadow-sm');
//   button1.setAttribute('title', 'Borrar esta tarjeta');
//   let trash = document.createElement('span');
//   trash.setAttribute('class', 'fas fa-trash-alt');
//   let button2 = document.createElement('button');
//   button2.setAttribute('type', 'button');
//   button2.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-left');
//   button2.setAttribute('title', 'Mover esta lista hacia la izquierda');
//   let leftArrow = document.createElement('span');
//   leftArrow.setAttribute('class', 'fas fa-arrow-left');
//   let button3 = document.createElement('button');
//   button3.setAttribute('type', 'button');
//   button3.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-right');
//   button3.setAttribute('title', 'Mover esta lista hacia la derecha');
//   let rightArrow = document.createElement('span');
//   rightArrow.setAttribute('class', 'fas fa-arrow-right');
//   let btnAddTask = document.createElement('button');
//   btnAddTask.setAttribute('type', 'button');
//   btnAddTask.setAttribute('class', 'js-btn-new-task ml-1 btn btn-primary btn-sm text-white-50');
//   btnAddTask.setAttribute('title', 'Añadir una nueva tarjeta');
//   const btnAddTaskText = document.createTextNode('  Añadir otra tarjeta');
//   let spanBtnAddTask = document.createElement('span');
//   spanBtnAddTask.setAttribute('class', 'fas fa-plus');

//   box.appendChild(div);
//   div.appendChild(formList);
//   formList.appendChild(input);
//   formList.appendChild(tresPuntos);
//   formList.appendChild(button1);
//   formList.appendChild(button2);
//   formList.appendChild(button3);
//   tresPuntos.appendChild(spanTresPuntos);
//   tresPuntos.appendChild(containerButtons);
//   button1.appendChild(trash);
//   button2.appendChild(leftArrow);
//   button3.appendChild(rightArrow);
//   div.appendChild(btnAddTask);
//   btnAddTask.appendChild(spanBtnAddTask);
//   btnAddTask.appendChild(btnAddTaskText);
// }
