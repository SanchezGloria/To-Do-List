'use strict';

import cards from './card.js';
import helpers from './helpers.js';

const render = (list) => {
  const boardEl = document.querySelector('.js-board');
  // para que al clicar, no te replique las mismas listas de nuevo con la acción que haya hecho el user
  boardEl.innerHTML = '';
  // bucle para replicarlo 4 veces

  list.forEach((list) => {
    console.log(list);
    renderList(boardEl, list);
  });
  // render new list button
  renderNewListButton(boardEl);
};

const renderList = (parent, list) => {
  // app-list and app-list inner
  const listEl = helpers.appendElement(parent, {
    tag: 'div',
    class: 'app-list',
  });
  const listInnerEl = helpers.appendElement(listEl, {
    tag: 'div',
    class: 'p-1 rounded-sm bg-primary shadow',
  });
  renderListHeader(listInnerEl, list);
  cards.renderCards(listInnerEl, list.cards);
  renderListFooter(listInnerEl, list);
};

const renderListHeader = (parent, list) => {
  // form
  const formEl = helpers.appendElement(parent, {
    tag: 'form',
    class: 'app-list-form align-middle p-1 position-relative',
  });
  renderInput(formEl, list);
  renderOptions(formEl, list);
};

const renderInput = (parent, list) => {
  helpers.appendElement(parent, {
    tag: 'input',
    class: 'js-change app-list-input form-control form-control-sm',
    attributes: {
      placeholder: 'Tareas importantes',
      type: 'text',
      value: list.title,
      title: 'Editar el título de la lista',
    },
    dataset: {
      action: 'modify-list-title',
      listId: list.id,
    },
  });
};

const renderOptions = (parent, list) => {
  const optionsEl = helpers.appendElement(parent, {
    tag: 'div',
    class: 'app-list-options',
  });
  helpers.appendElement(optionsEl, {
    tag: 'span',
    class: 'pl-2 pr-2 text-white-50 fas fa-ellipsis-v',
  });
  const buttonsEl = helpers.appendElement(optionsEl, {
    tag: 'div',
    class: 'app-list-btns btn-group btn-group-sm',
  });
  renderDeleteButton(buttonsEl, list);
  renderLeftButton(buttonsEl, list);
  renderRightButton(buttonsEl, list);
};

const renderDeleteButton = (parent, list) => {
  const deleteButtonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'js-click btn btn-light text-muted border shadow-sm',
    attributes: {
      type: 'button',
      title: 'Borrar esta tarjeta',
    },
    dataset: {
      action: 'delete-list',
      listId: list.id,
    },
  });
  helpers.appendElement(deleteButtonEl, {
    tag: 'span',
    class: 'fas fa-trash-alt',
  });
};

const renderLeftButton = (parent, list) => {
  const leftButtonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'js-click btn btn-light text-muted border shadow-sm app-list-left-button',
    attributes: {
      type: 'button',
      title: 'Mover esta lista hacia la izquierda',
    },
    dataset: {
      action: 'move-list-left',
      listId: list.id,
    },
  });
  helpers.appendElement(leftButtonEl, {
    tag: 'span',
    class: 'fas fa-arrow-left',
  });
};

const renderRightButton = (parent, list) => {
  const rightButtonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'js-click btn btn-light text-muted border shadow-sm app-list-right-button',
    attributes: {
      type: 'button',
      title: 'Mover esta lista hacia la derecha',
    },
    dataset: {
      action: 'move-list-right',
      listId: list.id,
    },
  });
  helpers.appendElement(rightButtonEl, {
    tag: 'span',
    class: 'fas fa-arrow-right',
  });
};

const renderListFooter = (parent, list) => {
  // add card button
  const buttonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'ml-1 btn btn-primary btn-sm mb-1 text-white-50',
    attributes: {
      type: 'button',
      title: 'Añadir una nueva tarjeta',
    },
  });
  helpers.appendElement(buttonEl, {
    tag: 'span',
    class: 'fas fa-plus',
    attributes: {
      type: 'button',
      title: 'Añadir una nueva tarjeta',
    },
  });
  const textElement = document.createTextNode(' Añadir otra tarjeta');
  buttonEl.appendChild(textElement);
};

const renderNewListButton = (parent) => {
  // new list button
  const divEl = helpers.appendElement(parent, {
    tag: 'div',
  });
  const buttonEl = helpers.appendElement(divEl, {
    tag: 'button',
    class: 'js-click btn btn-light btn-outline-primary btn-sm ml-2 mr-5 mshadow-sm',
    attributes: {
      type: 'button',
      title: 'Añadir una nueva lista',
    },
    dataset: {
      action: 'add-list',
    },
  });
  helpers.appendElement(buttonEl, {
    tag: 'span',
    class: 'fas fa-plus',
  });
  // 2o PASO
  // const appListEl = appedElement(boardEl, {
  //   tag: 'div',
  //   class: ['app-list'],
  // });

  // const appListInner = appedElement(appListEl, {
  //   tag: 'div',
  //   class: ['p-1', 'rounded-sm bg-primary', 'shadow'],
  // });

  // 1er PASO
  // const appListEl = document.createElement('div');
  // appListEl.classList.add('app-list');
  // boardEl.appendChild(appListEl);

  // const appListInnerEl = document.createElement('div');
  // appListInnerEl.classList.add('p-1', 'rounded-sm bg-primary', 'shadow');
  // appListEl.appendChild(appListInnerEl);

  console.log(buttonEl.dataset);
};

// ESTO LO PASAMOS A MAIN.JS
// const appedElement = (parent, data) => {
//   // tiene que recibir la madre, el tipo, la clase, los atributos y el texto
//   const element = document.createElement(data.tag);
//   // TE AÑADE COMAS PORQUE LO PASA A STRING. SOLUCIÓN
//   // element.classList.add(data.class);
//   // 1a FORMA
//   // for (const className of data.class) {
//   //   element.classList.add(className)
//   // }
//   // 2a FORMA
//   // data.class.forEach(className => element.classList.add(className))

//   // 3a FORMA, MÁS ELEGANTE
//   element.classList.add(...data.class);
//   parent.appendChild(element);
//   return element;
// };

export default {
  // si clave y valor son iguales se puede poner solo render
  render: render,
};
