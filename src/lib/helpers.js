export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === 'string') {
      element.appendChild(document.createTextNode(children[i]));
    } else {
      element.appendChild(children[i]);
    }
  }
  return element;
}