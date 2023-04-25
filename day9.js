import _ from 'lodash';
import utils from './utils.js';

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const solve = async () => {
  const input = testInput.split('\n');
  // const input = await utils.loadInput('./inputs/day9.txt');
  

  return { result1: null, result2: null };
};



solve().then((res) => console.log(res));
