import {
  empty,
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
fetchJSONFile('../../lectures.json', (data) => {
  const pageLecture = document.querySelector('.lecture');
  const lectureNum = window.localStorage.getItem('next');
  const lectureData = data.lectures[lectureNum].content;
  for (let i = 0; i < lectureData.length; i++) {
    const {
      type
    } = lectureData[i];
    const jData = lectureData[i].data;
    if (type === 'heading') {
      const heading = document.createTextNode(jData);
      const headingEl = el('h3', heading);
      headingEl.setAttribute('class', 'lecture__heading');
      pageLecture.appendChild(headingEl);
    } else if (type === 'text') {
      const text = document.createTextNode(jData);
      const textEl = el('p');
      textEl.appendChild(text);
      const textDiv = el('div', textEl);
      textDiv.setAttribute('class', 'lecture__text');
      pageLecture.appendChild(textDiv);
    } else if (type === 'code') {
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
      const videoDiv = el('div', iframeEl);
      videoDiv.setAttribute('class', 'lecture__video--spot');
      pageLecture.appendChild(videoDiv);
    } else if (type === 'image') {
      const image = el('img');
      const {
        caption,
      } = lectureData[i];
      image.setAttribute('src', jData);
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
      for (let j = 0; j < jData.length; j++) {
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
  const headerImage = document.querySelector('.header__img');
  headerImage.setAttribute('src', (data.lectures[lectureNum].image));

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
    window.location.replace('../fyrirlestur.html');
  });

  const finishedLecture = pageLecture.querySelector('.bottom__link--finished');
  finishedLecture.addEventListener('click', () => {
    window.localStorage.setItem(lectureNum, 'no');
    window.location.replace('../fyrirlestur.html');
  });
});
