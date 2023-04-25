import _ from 'lodash';
import utils from './utils.js';

const testInput = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const solve = async (part) => {
  // const input = testInput.split('\n');
  const input = await utils.loadInput('./inputs/day5.txt');
  const breakPoint = input.findIndex(str => str.indexOf('move') > -1);
  const rows = input.slice(0, breakPoint);
  const steps = input.slice(breakPoint, input.length);

  rows.reverse();
  const stackNums = rows[0].split('   ').map(x => parseInt(x));

  const rowsArr = rows.map(row => {
    const fullRow = row;
    return fullRow.split('');
  }).slice(1); // get rid of initial stack number row

  const stacks = [];
  for (let i = 0; i < rowsArr.length; i++) {
    stacks[i] = [];
    for (let j = 0; j < stackNums.length; j+=1) {
      stacks[i][j] = rowsArr[i][j*4+1];
    }
  }

  const transposed = Object.keys(stacks[0]).map(col => {
    return stacks.map(row => {
      return row[col] ? row[col].trim() : null;
    });
  }).map(t => {
    return _.compact(t);
  }).filter(s => {
    return s.length;
  });

  const stepsArr = steps.map(step => {
    return {
      num: parseInt(step.substring(5, step.indexOf('from') - 1)),
      from: parseInt(step.substring(step.indexOf('from') + 5, step.indexOf('to') - 1)),
      to: parseInt(step.substring(step.indexOf('to') + 3, step.length))
    }
  });

  stepsArr.forEach(step => {
    const toMove = [];
    for (let i = 1; i <= step.num; i++) {
      toMove.push(transposed[step.from - 1].pop());
    }

    if (part === 'part1') {
      transposed[step.to - 1].push(...toMove);
    } else {
      transposed[step.to - 1].push(...toMove.reverse());
    }
  });

  const returnable = transposed.map(t => t[t.length - 1]).join('');
  return returnable;
}

solve().then(res => console.log(res));