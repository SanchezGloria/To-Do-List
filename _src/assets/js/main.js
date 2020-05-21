'use strict';
// estos import no estaban en su explicación
// import './edit.js';
// import './menu.js';
// import './searchInput.js';

import api from './services/api.js';
import ls from './services/local-storage.js';
import board from './dom/board.js';
import edit from './dom/edit.js';

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
  debugger;
  const dataset = ev.currentTarget.dataset;
  if (dataset.action === 'add-list') {
    data.board.list.push({
      id: 'list-' + getNewId(),
      title: '',
      cards: [],
    });
  } else if (dataset.action === 'delete-list') {
    // el código este lo centra
    const id = ev.currentTarget.dataset.listId;
    const listIndex = data.board.list.findIndex((list) => list.id === id);
    data.board.list.splice(listIndex, 1);
  } else if (dataset.action === 'move-list-right') {
    const listIndex = getListIndex(dataset.listId);
    const currentList = data.board.list.splice(listIndex, 1);
    data.board.list.splice(listIndex + 1, 0, currentList[0]);
  } else if (dataset.action === 'move-list-left') {
    const listIndex = getListIndex(dataset.listId);
    const currentList = data.board.list.splice(listIndex, 1);
    data.board.list.splice(listIndex - 1, 0, currentList[0]);
  } else if (dataset.action === 'modify-list-title') {
    const listIndex = getListIndex(dataset.listId);
    console.log(ev.currentTarget.value);

    data.board.list[listIndex].title = ev.currentTarget.value;
  } else if (dataset.action === 'add-card') {
    const listIndex = getListIndex(dataset.listId);
    data.board.list[listIndex].cards.push({
      id: 'card-' + getNewId(),
      title: 'Nueva tarjeta',
      description: '',
      tags: [],
    });
  } else if (dataset.action === 'move-card-up') {
    const listIndex = getCardListIndex(dataset.cardId);
    const cardIndex = getCardIndex(dataset.cardId);
    const currentCard = data.board.list[listIndex].cards.splice(cardIndex, 1);
    data.board.list[listIndex].cards.splice(cardIndex - 1, 0, currentCard[0]);
  } else if (dataset.action === 'move-card-down') {
    const listIndex = getCardListIndex(dataset.cardId);
    const cardIndex = getCardIndex(dataset.cardId);
    const currentCard = data.board.list[listIndex].cards.splice(cardIndex, 1);
    data.board.list[listIndex].cards.splice(cardIndex + 1, 0, currentCard[0]);
  }
  // guardo en ls
  ls.set(data);
  // pinto
  render();
  console.log('manejando', ev.currentTarget.id, ev.currentTarget.dataset);
};

const handleDeleteCard = () => {
  const listIndex = getCardListIndex(cardId);
  const cardIndex = getCardIndex(cardId);
  data.board.list[listIndex].cards.splice(cardIndex, 1);
  edit.close();
  ls.set(data);
  render();
};

// getters

const getListIndex = (id) => {
  return data.board.list.findIndex((list) => list.id === id);
};

const getCardListIndex = (id) => {
  for (let index = 0; index < data.board.list.length; index += 1) {
    const list = data.board.list[index];
    const cardFound = list.cards.find((card) => card.id === id);
    if (cardFound) {
      return index;
    }
  }
};

const getCardIndex = (id) => {
  for (let index = 0; index < data.board.list.length; index += 1) {
    const list = data.board.list[index];
    const cardIndex = list.cards.findIndex((card) => card.id === id);
    if (cardIndex >= 0) {
      return cardIndex;
    }
  }
};

const getCard = (id) => {
  for (const list of data.board.list) {
    for (const card of list.cards) {
      if (card.id === id) {
        return card;
      }
    }
  }
};

const getNewId = () => {
  return Date.now();
};

// PARA NO REPETIR CÓDIGO REFACTORIZO USANDO LA FUNCIÓN DE ARRIBA

// const moveListLeft = (ev) => {
//   console.log('moviendo a la izquierda', ev.currentTarget.id);
// };
// const moveListRight = (ev) => {
//   console.log('moviendo a la izquierda', ev.currentTarget.id);
// };
// const moveListDelete = (ev) => {
//   console.log('moviendo a la izquierda', ev.currentTarget.id);
// };
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

const openCard = (ev) => {
  cardId = ev.currentTarget.dataset.cardId;
  const card = getCard(cardId);

  // const list = state.getListOfCard(data, cardId);
  const list = data.board.list[getCardListIndex(cardId)];
  edit.open(card, list);
};

const render = () => {
  // const filteredList = state.filter(data.board.list, filterText);
  board.render(data.board.list);
  listenEvents('.js-click', 'click', handleBoardEvent);
  listenEvents('.js-change', 'change', handleBoardEvent);
  listenEvents('.js-open-card', 'click', openCard);
  listenEvents('.js-edit-delete', 'click', handleDeleteCard);
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
