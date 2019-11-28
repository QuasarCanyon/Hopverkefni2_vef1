import {
  empty, el, fetchJSONFile,
} from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }
}

const htmlButton = document.querySelector('.buttons__HTML');
const cssButton = document.querySelector('.buttons__CSS');
const jsButton = document.querySelector('.buttons__JS');

htmlButton.addEventListener('click', () => {
  htmlButton.classList.toggle('buttons__HTML--active');
});

cssButton.addEventListener('click', () => {
  cssButton.classList.toggle('buttons__CSS--active');
});

jsButton.addEventListener('click', () => {
  jsButton.classList.toggle('buttons__JS--active');
});

// This function requests the JSON file and executes a callback to list its contents on the homepage with the parsed result once it is available.
fetchJSONFile('../../lectures.json', (data) => {
  const pageList = document.querySelector('.list');
  for (let i = 0; i < data.lectures.length; i++) {
    const {thumbnail} = data.lectures[i];
    const {category} = data.lectures[i];
    const {title} = data.lectures[i];
    const gridThumbnail = el('img');
    gridThumbnail.setAttribute('src', thumbnail);
    gridThumbnail.setAttribute('class', 'list__item--thumbnail');
    const gridCategory = el('p', category);
    gridCategory.setAttribute('class', 'list__item--category');
    const gridTitle = el('p', title);
    gridTitle.setAttribute('class', 'list__item--title');
    const gridItem = el('div', gridThumbnail, gridCategory, gridTitle);
    gridItem.setAttribute('class', 'list__item');
    pageList.appendChild(gridItem);
    gridItem.addEventListener('click', () => {
      window.localStorage.setItem('next', i);
      window.location.replace('../fyrirlestur.html');
    });
  }
});
