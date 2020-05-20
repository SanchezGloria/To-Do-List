'use strict';

// edit
// FUNCIÓN PARA ABRIR MODAL
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

// FETCH DEL EJEMPLO

let list = [];
// el no hace como objeto y se lo lleva a un modulo
// let list = {};

// const getApiData = () => {
//   fetch('./api/board.json')
//   // 'http//localhost:3000/api/board.json'
//     .then((response) => response.json())
//     .then((data) => {
//       list = data.board.list;
//       createNewListExample();
//       // console.log(list[0].title);
//     });

//   return list;
// };

const newList = document.querySelector('.js-list-new');
const main = document.querySelector('.js-main');
const columnTemplate = document.querySelector('.column-template');
const newTask = document.querySelector('.card-template');
// const btnAddTask = column.querySelector('.js-btn-new-task');

// FUNCIÓN PARA CREAR NUEVA LISTA
function createNewList() {
  debugger;
  const column = columnTemplate.cloneNode(true);
  column.classList.remove('column-template');
  column.classList.remove('hidden');
  main.appendChild(column);
  list.push(column);
  console.log(list);

  const btnAddTask = column.querySelector('.js-btn-new-task');
  btnAddTask.addEventListener('click', createNewTask);
  const deleteListBtn = column.querySelector('.js-delete-list');
  deleteListBtn.addEventListener('click', deleteList);
}

// FUNCIÓN PARA CREAR NUEVA TAREA

function createNewTask(e) {
  const task = newTask.cloneNode(true);
  task.classList.remove('card-template');
  task.classList.remove('hidden');
  const containerList = e.target.parentElement;
  // console.log(containerList);
  containerList.insertBefore(task, e.currentTarget);
  task.addEventListener('click', toggleEdit);
}

// FUNCION PARA BORRAR LISTAS

function deleteList() {
  console.log('borrar lista');

  // main.removeChild(columnTemplate);
}

// LISTENERS

newList.addEventListener('click', createNewList);

// MANERA PRIMITIVA DE CREAR LISTA

function createNewListExample() {
  for (const card of list) {
    console.log(card);

    let containerList = document.createElement('div');
    containerList.setAttribute('class', 'app-list');
    let div = document.createElement('div');
    let formList = document.createElement('form');
    formList.setAttribute('class', 'app-list-form align-middle p-1 position-relative');
    let input = document.createElement('input');
    div.setAttribute('class', 'js-container-list p-1 rounded-sm bg-primary shadow');
    input.setAttribute('class', 'app-list-input form-control form-control-sm list__input--title');
    // input.setAttribute('placeholder', 'Title');
    input.setAttribute('type', 'text');
    input.setAttribute('value', 'EJEMPLO');
    input.setAttribute('title', 'Editar título de la lista');
    const newTitle = document.createTextNode(card.title);

    input.appendChild(newTitle);
    console.log(input);

    let tresPuntos = document.createElement('div');
    tresPuntos.setAttribute('class', 'app-list-options');
    let spanTresPuntos = document.createElement('span');
    spanTresPuntos.setAttribute('class', 'pl-2 pr-2 text-white-50 fas fa-ellipsis-v');
    let containerButtons = document.createElement('div');
    containerButtons.setAttribute('class', 'app-list-btns btn-group btn-group-sm');
    let button1 = document.createElement('button');
    button1.setAttribute('class', 'btn btn-light text-muted border shadow-sm');
    button1.setAttribute('title', 'Borrar esta tarjeta');
    let trash = document.createElement('span');
    trash.setAttribute('class', 'fas fa-trash-alt');
    let button2 = document.createElement('button');
    button2.setAttribute('type', 'button');
    button2.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-left');
    button2.setAttribute('title', 'Mover esta lista hacia la izquierda');
    let leftArrow = document.createElement('span');
    leftArrow.setAttribute('class', 'fas fa-arrow-left');
    let button3 = document.createElement('button');
    button3.setAttribute('type', 'button');
    button3.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-right');
    button3.setAttribute('title', 'Mover esta lista hacia la derecha');
    let rightArrow = document.createElement('span');
    rightArrow.setAttribute('class', 'fas fa-arrow-right');
    let btnAddTask = document.createElement('button');
    btnAddTask.setAttribute('type', 'button');
    btnAddTask.setAttribute('class', 'js-btn-new-task ml-1 btn btn-primary btn-sm text-white-50');
    btnAddTask.setAttribute('title', 'Añadir una nueva tarjeta');
    const btnAddTaskText = document.createTextNode('  Añadir otra tarjeta');
    let spanBtnAddTask = document.createElement('span');
    spanBtnAddTask.setAttribute('class', 'fas fa-plus');

    main.appendChild(containerList);
    containerList.appendChild(div);
    div.appendChild(formList);
    formList.appendChild(input);
    formList.appendChild(tresPuntos);
    tresPuntos.appendChild(spanTresPuntos);
    tresPuntos.appendChild(containerButtons);
    containerButtons.appendChild(button1);
    containerButtons.appendChild(button2);
    containerButtons.appendChild(button3);
    button1.appendChild(trash);
    button2.appendChild(leftArrow);
    button3.appendChild(rightArrow);
    div.appendChild(btnAddTask);
    btnAddTask.appendChild(spanBtnAddTask);
    btnAddTask.appendChild(btnAddTaskText);

    // LISTENER PARA LA TAREA

    btnAddTask.addEventListener('click', createNewTask);

    // TAREA

    for (const task of card.cards) {
      const taskContainer = document.createElement('article');
      taskContainer.setAttribute('class', 'js-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm');
      taskContainer.setAttribute('title', 'Abrir la tarjeta');
      div.insertBefore(taskContainer, btnAddTask);
      const containerTagsTaks = document.createElement('div');
      taskContainer.appendChild(containerTagsTaks);

      // TÍTULO

      const containerTaskTitle = document.createElement('div');
      taskContainer.appendChild(containerTaskTitle);
      const taskTitle = document.createElement('h6');
      const titleText = document.createTextNode(task.title);
      taskTitle.appendChild(titleText);
      containerTaskTitle.appendChild(taskTitle);
      console.log(task.id);

      // DESCRIPCION

      const containerTaskDescription = document.createElement('div');
      taskContainer.appendChild(containerTaskDescription);
      const taskDescription = document.createElement('p');
      const descriptionText = document.createTextNode(task.description);
      taskContainer.appendChild(taskDescription);
      taskDescription.appendChild(descriptionText);

      // BOTONES DE DRAG

      const containerButtonsTasks = document.createElement('div');
      containerButtonsTasks.setAttribute('class', 'app-card-btns btn-group-vertical btn-group-sm');
      taskContainer.appendChild(containerButtonsTasks);

      for (const tag of task.tags) {
        const tagTasks = document.createElement('span');
        tagTasks.setAttribute('class', 'badge badge-secondary bg-success');
        const tagText = document.createTextNode(tag);
        tagTasks.appendChild(tagText);
        containerTagsTaks.appendChild(tagTasks);
      }
    }
  }
}

getApiData();
