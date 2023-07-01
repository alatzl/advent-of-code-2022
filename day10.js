import _ from 'lodash';
import utils from './utils.js';

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const solve = async () => {
  const input = await utils.loadInput('./inputs/day10.txt');
  // const input = testInput.split('\n');

  const cycles = getCycles(input);
  const keyCycles = [20, 60, 100, 140, 180, 220];
  const result1 = keyCycles.reduce((acc, current) => {
    return acc + current * cycles[current-1]; // -1 to account for array indexing
  }, 0);
  const result2 = drawPixels(cycles);

  return { result1, result2 };
};

const getCycles = (instructions) => {
  const addXCycles = 2;
  let currentCycle = 0;
  let register = 1;

  let cycles = [];

  for (let i = 0; i < instructions.length; i++) {
    const instr = instructions[i];

    if(instr.startsWith('noop')){
      cycles[currentCycle] = register;
      currentCycle += 1;     
    } else if (instr.startsWith('addx')) {
      const val = parseInt(instr.split(' ')[1]);

      cycles[currentCycle] = register;
      cycles[currentCycle+1] = register;
      cycles[currentCycle+2] = register + val;
      currentCycle += addXCycles;
      register += val;
    }
  }

  return cycles;
}

const drawPixels = (cycles) => {
  const width = 40;
  let drawing = '';

  for (let i = 0; i < cycles.length; i++) {
    const comparator = i > width - 1 ? i % width : i;
    // console.log(`The cycle is ${i} and the register is ${register} and the comparator is ${comparator}.`)
    if (cycles[i] - 1 === comparator || cycles[i] === comparator || cycles[i] + 1 === comparator) {
      drawing += '#';
    } else {
      drawing += '.';
    }

    if ((i+1) % width === 0) {
      // we are at the end of a row, add new line
      drawing += '\n';
    }
  }

  console.log(drawing);
  return drawing;
  
}

solve().then((res) => console.log(res));
