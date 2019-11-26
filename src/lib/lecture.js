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

fetchJSONFile('../../lectures.json', (data) => {
  const pageLecture = document.querySelector('.lecture-page');
  const lectureNum = 0;
  const lectureData = data.lectures[lectureNum].content;
  for (let i = 0; i < lectureData.length; i++) {
    const {type} = lectureData[i];
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
    } else if (type === 'quote') {
      const quote = document.createTextNode(jData);
      const attribute = document.createTextNode(lectureData[i].attribute);
      const quoteEl = el('p', quote);
      const attributeEl = el('p', attribute);
      quoteEl.setAttribute('class', 'lecture__quote');
      attributeEl.setAttribute('class', 'lecture__quote-attribute');
      const quoteDiv = el('div', quoteEl, attributeEl);
      quoteDiv.setAttribute('class', 'lecture__quote-spot');
    } else if (type === 'video') {
      const sourceEl = el('source');
      sourceEl.setAttribute('src', jData);
      sourceEl.setAttribute('type', 'video/mp4');
      const videoEl = el('video', sourceEl);
      videoEl.setAttribute('width', '"320"');
      videoEl.setAttribute('height', '"240"');
      videoEl.setAttribute('controls');
      videoEl.setAttribute('class', 'lecture__video');
      const videoDiv = el('div', videoEl);
      videoDiv.setAttribute('class', 'lecture__video-spot');
    } else if (type === 'image') {
      const image = el('img');
      const {caption} = lectureData[i];
      image.setAttribute('src', jData);
      image.setAttribute('class', 'lecture__image');
      image.setAttribute('alt', caption);
      const imageCaption = el('figcaption', document.createTextNode(caption));
      imageCaption.setAttribute('class', 'lecture__image-caption');
      const imageEl = el('figure', image, imageCaption);
      imageEl.setAttribute('class', 'lecture__image-spot');
    } else if (type === 'list') {
      const ulEl = el('ul');
      ulEl.setAttribute('class', 'lecture__list');
      for (let j = 0; j < jData.length; j++) {
        const listEl = el('li');
        listEl.appendChild(document.createTextNode(jData[j]));
        ulEl.appendChild(listEl);
      }
    }
  }
});
