import {
  el,
  fetchJSONFile,
} from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture-page');
  }
}

/*  This function requests the JSON file and executes a callback
to list its contents on the homepage with the parsed result
once it is available. */
fetchJSONFile('./lectures.json', (data) => {
  const pageLecture = document.querySelector('.lecture');
  const url = window.location.search;
  const slug = url.substring(6);
  let lectureNum = 0;
  for (let i = 0; i < data.lectures.length; i += 1) {
    if (slug === data.lectures[i].slug) {
      lectureNum = i;
    }
  }
  const lectureData = data.lectures[lectureNum].content;
  for (let i = 0; i < lectureData.length; i += 1) {
    const {
      type,
    } = lectureData[i];
    const jData = lectureData[i].data;
    if (type === 'heading') {
      const heading = document.createTextNode(jData);
      const headingEl = el('h3', heading);
      headingEl.setAttribute('class', 'lecture__heading');
      pageLecture.appendChild(headingEl);
    } else if (type === 'text') {
      const textObj = jData.split('\n');
      const textElObj = {};
      for (let j = 0; j < textObj.length; j += 1) {
        textElObj[j] = el('p', textObj[j]);
      }
      const textDiv = el('div');
      textDiv.setAttribute('class', 'lecture__text');
      for (let j = 0; j < textObj.length; j += 1) {
        textDiv.appendChild(textElObj[j]);
      }
      pageLecture.appendChild(textDiv);
    } else if (type === 'code') {
      const codeObj = jData.split('\n');
      const codeElObj = {};
      for (let j = 0; j < codeObj.length; j += 1) {
        codeElObj[j] = el('code', codeObj[j]);
      }
      for (let j = 0; j < codeObj.length; j += 1) {
        const codeP = el('p', codeElObj[j]);
        codeP.setAttribute('class', 'lecture__code');
        pageLecture.appendChild(codeP);
      }

      const code = document.createTextNode(jData);
      const codeEl = el('code');
      codeEl.appendChild(code);
      const codeP = el('p', codeEl);
      codeP.setAttribute('class', 'lecture__code');
      pageLecture.appendChild(codeP);
    } else if (type === 'quote') {
      const quote = document.createTextNode(jData);
      const attribute = document.createTextNode(lectureData[i].attribute);
      const quoteEl = el('p', quote);
      const attributeEl = el('p', attribute);
      quoteEl.setAttribute('class', 'lecture__quote');
      attributeEl.setAttribute('class', 'lecture__quote--attribute');
      const quoteDiv = el('div', quoteEl, attributeEl);
      quoteDiv.setAttribute('class', 'lecture__quote--spot');
      pageLecture.appendChild(quoteDiv);
    } else if (type === 'youtube') {
      const iframeEl = el('iframe');
      iframeEl.setAttribute('class', 'lecture__video');
      iframeEl.setAttribute('src', jData);
      iframeEl.setAttribute('frameborder', '0');
      iframeEl.setAttribute('allowfullscreen', '0');
      const videoDiv = el('div', iframeEl);
      videoDiv.setAttribute('class', 'lecture__video--spot');
      pageLecture.appendChild(videoDiv);
    } else if (type === 'image') {
      const image = el('img');
      const {
        caption,
      } = lectureData[i];
      image.setAttribute('src', `./${jData}`);
      image.setAttribute('class', 'lecture__image');
      image.setAttribute('alt', caption);
      const imageCaption = el('figcaption', document.createTextNode(caption));
      imageCaption.setAttribute('class', 'lecture__image--caption');
      const imageEl = el('figure', image, imageCaption);
      imageEl.setAttribute('class', 'lecture__image--spot');
      pageLecture.appendChild(imageEl);
    } else if (type === 'list') {
      const ulEl = el('ul');
      ulEl.setAttribute('class', 'lecture__list');
      for (let j = 0; j < jData.length; j += 1) {
        const listEl = el('li');
        listEl.appendChild(document.createTextNode(jData[j]));
        ulEl.appendChild(listEl);
      }
      pageLecture.appendChild(ulEl);
    }
  }
  const headerCategory = document.querySelector('.header__category');
  headerCategory.appendChild(document.createTextNode(data.lectures[lectureNum].category));
  const headerTitle = document.querySelector('.header__title');
  headerTitle.appendChild(document.createTextNode(data.lectures[lectureNum].title));

  // Mynd á hverjum fyrirlestri fyrir background myndina
  let headerImage;
  if (!data.lectures[lectureNum].image) {
    const oldHeaderImage = document.querySelector('.header__img');
    oldHeaderImage.remove();
    headerImage = el('div');
    headerImage.setAttribute('class', 'header__img--placeholder');
    const parent = document.querySelector('.header__row');
    parent.appendChild(headerImage);
  } else {
    headerImage = document.querySelector('.header__img');
    const path = (data.lectures[lectureNum].image);
    headerImage.setAttribute('src', `./${path}`);
  }
  const bottom = el('div');
  bottom.setAttribute('class', 'bottom');
  const finishLine = el('p');
  let finLine;
  if (window.localStorage.getItem(lectureNum) === 'no') {
    finLine = 'Klára fyrirlestur';
    finishLine.setAttribute('class', 'bottom__link bottom__link--finish');
  } else if (window.localStorage.getItem(lectureNum) === 'yes') {
    finLine = '✓ Fyrirlestur kláraður';
    finishLine.setAttribute('class', 'bottom__link bottom__link--finished');
  }
  finishLine.appendChild(document.createTextNode(finLine));
  const backLine = el('p');
  backLine.setAttribute('class', 'bottom__link bottom__link--back');
  backLine.appendChild(document.createTextNode('Til baka'));
  bottom.appendChild(finishLine);
  bottom.appendChild(backLine);
  pageLecture.appendChild(bottom);

  const backwardsLink = pageLecture.querySelector('.bottom__link--back');
  backwardsLink.addEventListener('click', () => {
    window.location.replace('../index.html');
  });

  const toFinishLecture = pageLecture.querySelector('.bottom__link--finish');
  toFinishLecture.addEventListener('click', () => {
    window.localStorage.setItem(lectureNum, 'yes');
    window.location.replace(`../fyrirlestur.html?slug=${slug}`);
  });

  const finishedLecture = pageLecture.querySelector('.bottom__link--finished');
  finishedLecture.addEventListener('click', () => {
    window.localStorage.setItem(lectureNum, 'no');
    window.location.replace(`../fyrirlestur.html?slug=${slug}`);
  });
});
