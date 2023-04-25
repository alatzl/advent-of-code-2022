import _ from 'lodash';
import utils from './utils.js';
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const solve = async() => {
  // let input = testInput.split('\n');
  let input = await utils.loadInput('./inputs/day3.txt');

  let priorityTotal1 = 0;
  for (let i = 0; i < input.length; i++) {
    const str = input[i];
    let compartment1 = str.slice(0, str.length/2).split('');
    let compartment2 = str.slice(str.length/2).split('');
    // console.log(`1: ${compartment1}, 2: ${compartment2}`)

    const error = _.intersection(compartment1, compartment2);
    priorityTotal1 += chars.indexOf(error) + 1;
    // console.log(`error: ${error}, priority: ${chars.indexOf(error) + 1}`)
  }

  let priorityTotal2 = 0;
  for(let i = 0; i < input.length; i=i+3) {
    const commonItem = _.intersection(input[i].split(''), input[i+1].split(''), input[i+2].split(''));
    priorityTotal2 += chars.indexOf(commonItem) + 1;
  }
  return { result1: priorityTotal1, result2: priorityTotal2 }

}

solve().then(res => console.log(res));