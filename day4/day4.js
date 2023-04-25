import _ from 'lodash';
import utils from '../utils.js';

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const method1 = async () => {
  // const input = testInput.split('\n');
  const input = await utils.loadInput('./input.txt');
  let dupedPairs = 0;
  for(let i = 0; i < input.length; i++) {
    const [elfA, elfB] = input[i].split(',');
    const [firstNumA, secondNumA] = elfA.split('-').map((item) => parseInt(item));
    const [firstNumB, secondNumB] = elfB.split('-').map((item) => parseInt(item));

    if((firstNumA <= firstNumB && secondNumA >= secondNumB) || (firstNumB <= firstNumA && secondNumB >= secondNumA)) {
      dupedPairs++;
    }
  }

  return dupedPairs;
};

const range = (start, stop) => {
  return [...Array(stop+1).keys()].slice(start);
};

const method2 = async () => {
  const input = await utils.loadInput('./input.txt');
  let dupedPairs = 0;
  for(let i = 0; i < input.length; i++) {
    const [elfA, elfB] = input[i].split(',');
    const [firstNumA, secondNumA] = elfA.split('-').map((item) => parseInt(item));
    const [firstNumB, secondNumB] = elfB.split('-').map((item) => parseInt(item));

    const elfASections = range(firstNumA, secondNumA);
    const elfBSections = range(firstNumB, secondNumB);

    const dupes = _.intersection(elfASections, elfBSections);
    if (dupes.length > 0) {
      dupedPairs++;
    }
  }

  return dupedPairs;
};
method1().then(res => console.log(res));
method2().then(res => console.log(res));