//  funcion que usaremos en los dos ficheros appendElement

const appendElement = (parent, data) => {
  const element = document.createElement(data.tag);

  if (data.class !== undefined) {
    element.classList.add(...data.class.split(' '));
  }
  parent.appendChild(element);
  Object.assign(element, data.attributes);
  if (data.text !== undefined) {
    const textEl = document.createTextNode(data.text);
    element.appendChild(textEl);
  }
  return element;
};

export default {
  appendElement,
};
