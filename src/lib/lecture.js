import {
  empty,
  el,
  fetchJSONFile,
} from './helpers';

export default class Lecture {
  constructor(a) {
    this.container = document.querySelector('.lecture-page');
    const lectureNum = a;
  }
}

fetchJSONFile('../../lectures.json', (data) => {

});
