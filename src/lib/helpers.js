export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);
  for (let i = 0; i < children.length; i += 1) {
    if (typeof children[i] === 'string') {
      element.appendChild(document.createTextNode(children[i]));
    } else {
      element.appendChild(children[i]);
    }
  }
  return element;
}

export function fetchJSONFile(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function request() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        const data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}
