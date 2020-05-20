// CÓDIGO DE LA TAREA

import helpers from './helpers.js';

const renderCards = (parent, cards) => {
  cards.forEach((card) => {
    renderCard(parent, card);
  });
};

const renderCard = (parent, card) => {
  const cardEl = helpers.appendElement(parent, {
    tag: 'article',
    class: 'js-open-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm',
    attributes: {
      title: 'Abrir la tarjeta',
    },
  });
  renderTags(cardEl, card.tags);
  renderTitle(cardEl, card.title);
  renderInfo(cardEl);
  renderButtons(cardEl, card);
};

const renderTags = (parent, tags) => {
  const div = helpers.appendElement(parent, {
    tag: 'div',
  });
  tags.forEach((tag) => {
    helpers.appendElement(div, {
      tag: 'span',
      class: 'badge badge-secondary bg-success mr-1',
      text: tag,
    });
  });
};

const renderTitle = (parent, title) => {
  const titleEl = helpers.appendElement(parent, {
    tag: 'div',
  });
  helpers.appendElement(titleEl, {
    tag: 'h3',
    class: 'h6',
    text: title,
  });
};

const renderInfo = (parent) => {
  const infoEl = helpers.appendElement(parent, {
    tag: 'div',
    class: 'text-black-50',
  });
  helpers.appendElement(infoEl, {
    tag: 'small',
    class: 'pr-2 fas fa-align-left',
  });
  helpers.appendElement(infoEl, {
    tag: 'small',
    class: 'far fa-check-square',
  });
  helpers.appendElement(infoEl, {
    tag: 'small',
    attributes: { title: 'Subtareas completadas: 3 de 5' },
    text: ' 3 / 5',
  });
};

const renderButtons = (parent, card) => {
  const buttonsEl = helpers.appendElement(parent, {
    tag: 'div',
    class: 'app-card-btns btn-group-vertical btn-group-sm',
  });
  renderUpButton(buttonsEl, card);
  renderDownButton(buttonsEl, card);
};

const renderUpButton = (parent, card) => {
  const upButtonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'btn btn-light text-muted border shadow-sm app-card-up-button',
    attributes: {
      type: 'button',
      title: 'Mover esta tarjeta hacia arriba',
    },
  });
  helpers.appendElement(upButtonEl, {
    tag: 'span',
    class: 'fas fa-arrow-up',
  });
};

const renderDownButton = (parent, card) => {
  const downButtonEl = helpers.appendElement(parent, {
    tag: 'button',
    class: 'btn btn-light text-muted border shadow-sm app-card-down-button',
    attributes: {
      type: 'button',
      title: 'Mover esta tarjeta hacia abajo',
    },
  });
  helpers.appendElement(downButtonEl, {
    tag: 'span',
    class: 'fas fa-arrow-down',
  });
};

export default {
  renderCards,
};
