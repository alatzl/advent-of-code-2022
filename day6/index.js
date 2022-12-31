import _ from 'lodash';
import utils from '../utils.js';

const solve = async (part) => {
  let input = await utils.loadInput('./input.txt');
  input = input.toString();

  let marker;
  let markerLength;
  if (part === 'part1') {
    markerLength = 4;
  } else {
    markerLength = 14;
  }
  const letters = [];
  for (let i = 0; i < input.length; i++) {
    if (letters.length === markerLength) {
      letters.shift()
    }
    letters.push(input[i])
    const unique = letters.filter((letter, idx, self) => {
      return self.indexOf(letter) === idx;
    });
    if (unique.length === markerLength) {
      marker = i + 1; // because array is 0-indexed
      break;
    }
  }

  return marker;
}

solve('part2').then(res => console.log(res));