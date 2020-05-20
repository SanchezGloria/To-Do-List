import helpers from './helpers.js';

const editEl = document.querySelector('.js-edit');

// open

const open = (card, list) => {
  // title
  const titleEl = document.querySelector('.js-edit-title');
  titleEl.value = card.title;
  // description
  const descriptionEl = document.querySelector('.js-edit-description');
  descriptionEl.value = card.description;
  // list
  const listEl = document.querySelector('.js-edit-list');
  listEl.innerHTML = list.title;
  // tags
  renderTags(card.tags);
  // modal
  editEl.classList.add('show');
  editEl.classList.remove('d-none');
};

const renderTags = (tags) => {
  const tagsEl = document.querySelector('.js-edit-tags');
  tagsEl.innerHTML = '';
  tags.forEach((tag) => {
    helpers.appendElement(tagsEl, {
      tag: 'span',
      class: 'badge badge-secondary bg-success mr-1',
      text: tag,
    });
  });
};

// close button

const close = (ev) => {
  if (ev) {
    ev.stopPropagation();
  }
  editEl.classList.remove('show');
};

document.querySelector('.js-edit-close').addEventListener('click', close);
document.querySelector('.js-edit-overlay').addEventListener('click', close);

// modal

const preventEditClosing = (ev) => {
  ev.stopPropagation();
};

document.querySelector('.js-edit-modal').addEventListener('click', preventEditClosing);

export default {
  open,
  close,
};
