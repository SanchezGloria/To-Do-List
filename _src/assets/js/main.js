'use strict';
// estos import no estaban en su explicación
// import './edit.js';
// import './menu.js';
// import './searchInput.js';

import api from './services/api.js';
import ls from './services/local-storage.js';
import board from './dom/board.js';

let data = {};
let cardId = '';
let filterText = '';

const startApp = () => {
  // const localStorageData = localStorage.getItem('boardData');
  // al refrescar pinta un null. Indicador del null
  // console.log(localStorageData);
  debugger;
  if (ls.isValid()) {
    data = ls.get();
    render();
  } else {
    api.getApiData().then((apiData) => {
      data = apiData;
      ls.set(data);
      render();
    });
  }
};

const handleBoardEvent = (ev) => {
  const action = ev.currentTarget.dataset.action;
  if (action === 'delete-list') {
    // aquí borro
    const id = ev.currentTarget.dataset.listId;
    const listIndex = data.board.list.findIndex((list) => list.id === id);
    data.board.list.splice(listIndex, 1);
    // guardo en ls
    ls.set(data);
    // pinto
    render();
  }
  console.log('manejando', ev.currentTarget.id, ev.currentTarget.dataset);
};

// PARA NO REPETIR CÓDIGO REFACTORIZO USANDO LA FUNCIÓN DE ARRIBA

const moveListLeft = (ev) => {
  console.log('moviendo a la izquierda', ev.currentTarget.id);
};
const moveListRight = (ev) => {
  console.log('moviendo a la izquierda', ev.currentTarget.id);
};
const moveListDelete = (ev) => {
  console.log('moviendo a la izquierda', ev.currentTarget.id);
};

// const handleBoardEvent = ev => {
//   const dataset = ev.currentTarget.dataset;
// }

const openCard = (ev) => {
  cardId = ev.currentTarget.dataset.cardId;
};

// const render = () => {
//   board.render(data.board.list);
//   listenEvents('.js-move-left', 'click', moveListLeft);
//   listenEvents('.js-move-right', 'click', moveListRight);
//   listenEvents('.js-move-delete', 'click', moveListDelete);
//   const leftBtns = document.querySelectorAll('.js-move-left');
//   for (const btn of leftBtns) {
//     btn.addEventListener('click', moveListLeft);
//   }
// };
const render = () => {
  // const filteredList = state.filter(data.board.list, filterText);
  debugger;
  board.render(data.board.list);
  // board.render(filteredList);
};

const handleFilter = (ev) => {
  filterText = ev.currentTarget.value;
  render();
};

const listenInitialEvents = () => {
  listenEvents('.js-filter', 'keyup', handleFilter);
};

const listenEvents = (selector, eventType, eventHandler) => {
  // clase, evento, tipo
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    element.addEventListener(eventType, eventHandler);
  }
};

startApp();

console.log('hola');
