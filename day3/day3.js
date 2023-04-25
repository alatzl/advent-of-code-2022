const fs = require('fs/promises');
const _ = require('lodash');
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const getPriorities = async () => {
  // let input = testInput.split('\n');
  let input = await fs.readFile('./input.txt');
  input = _.compact(input.toString().split('\n'));
  let priorityTotal = 0;

  for (let i = 0; i < input.length; i++) {
    const str = input[i];
    let compartment1 = str.slice(0, str.length/2).split('');
    let compartment2 = str.slice(str.length/2).split('');
    console.log(`1: ${compartment1}, 2: ${compartment2}`)

    const error = _.intersection(compartment1, compartment2);
    priorityTotal += chars.indexOf(error) + 1;
    console.log(`error: ${error}, priority: ${chars.indexOf(error) + 1}`)
  }
  console.log(priorityTotal);
}

const getPriorities2 = async () => {
  let input = await fs.readFile('./input.txt');
  input = _.compact(input.toString().split('\n'));
  let priorityTotal = 0;

  for(let i = 0; i < input.length; i=i+3) {
    const commonItem = _.intersection(input[i].split(''), input[i+1].split(''), input[i+2].split(''));
    // console.log(input[i], input[i+1], input[i+2]);
    priorityTotal += chars.indexOf(commonItem) + 1;
    // console.log(`commonItem: ${commonItem}, priorityTotal: ${priorityTotal}, i: ${i}`);
  }
  console.log(`priorityTotal: ${priorityTotal}`);
}

// getPriorities();
getPriorities2();