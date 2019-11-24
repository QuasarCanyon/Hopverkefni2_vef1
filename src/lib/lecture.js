import {
  empty, el, fetchJSONFile,
} from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture-page');
  }
}

fetchJSONFile('../../lectures.json', (data) => {
  
});