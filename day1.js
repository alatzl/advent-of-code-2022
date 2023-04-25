import fs from 'fs/promises';
import _ from 'lodash';
import utils from './utils.js';

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

// Find elf with most snacks
const getHungriestElf = async() => {
  try {
    const parsed = await getData();
    const elfCalories =  _.map(parsed, (elfArr, idx) => {
      return  _.sum(elfArr);
    });
    return _.max(elfCalories);
  } catch (err) {
    console.log(`OOPS! ${err}`)
  }
}

const getData = async () => {
  // const data = testInput;
  const data = await fs.readFile("./inputs/day1.txt", "utf-8")

    const elfArrays = data.toString().split(`\n\n`).map(item => {
        return item.split(`\n`);
      });

    const parsed = elfArrays.map((arr) => {
      return _.compact(arr.map((item) => {
        return parseInt(item);
      }));
    });

    return parsed;
};

const getTopThreeElves = async() => {
  try {
    const parsed = await getData();
    const top3 = _(parsed)
      .map((calArr) => _.sum(calArr))
      .sort()
      .reverse()
      .slice(0, 3)
      .sum();

    return top3;
  } catch (err) {
    console.log(`OOPS! ${err}`)
  }
}

getHungriestElf().then(res => console.log(`Result 1: ${res}`));
getTopThreeElves().then(res => console.log(`Result 2: ${res}`));