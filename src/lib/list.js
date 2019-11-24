import {
  empty, el,
} from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }
}

//  Búa til lista fyrir fyrirlestrana
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

// this requests the file and executes a callback with the parsed result once it is available
fetchJSONFile('../../lectures.json', (data) => {
  // do something with your data
  console.log(data);
});
